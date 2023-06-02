const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());

const uploadPath = path.join(__dirname, 'uploads');

app.get('/', (req, res) => {
    res.send('Welcome to the file store server!');
});

app.get('/files', (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving files.');
        } else {
            res.send(files);
        }
    });
});

app.post('/files', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFiles = req.files.files;

    if (!Array.isArray(uploadedFiles)) {
        uploadedFiles = [uploadedFiles];
    }

    const fileNames = uploadedFiles.map(file => file.name);
    const existingFiles = fs.readdirSync(uploadPath);

    const newFiles = fileNames.filter(name => !existingFiles.includes(name));

    if (newFiles.length === 0) {
        return res.status(409).send('All files already exist.');
    }

    uploadedFiles.forEach(file => {
        if (newFiles.includes(file.name)) {
            file.mv(path.join(uploadPath, file.name), err => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });

    res.send('Files uploaded successfully.');
});

app.delete('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadPath, filename);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting the file.');
            } else {
                res.send('File deleted successfully.');
            }
        });
    } else {
        res.send('File does not exist.');
    }
});

app.put('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadPath, filename);

    if (req.files && req.files.file) {
        const file = req.files.file;
        file.mv(filePath, err => {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating the file.');
            } else {
                res.send('File updated successfully.');
            }
        });
    } else {
        // New file, create it
        if (req.files && req.files.file) {
            const file = req.files.file;
            file.mv(filePath, err => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error creating the file.');
                } else {
                    res.send('File created successfully.');
                }
            });
        } else {
            res.status(400).send('No file provided.');
        }
    }
});

app.get('/wordcount', (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving files.');
        } else {
            let totalCount = 0;

            files.forEach(file => {
                const contents = fs.readFileSync(path.join(uploadPath, file), 'utf8');
                const wordCount = contents.split(' ').filter(word => word !== '').length;
                totalCount += wordCount;
            });

            res.send(`Total word count: ${totalCount}`);
        }
    });
});

app.get('/freqwords', (req, res) => {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving files.');
        } else {
            let wordCountMap = new Map();

            files.forEach(file => {
                const contents = fs.readFileSync(path.join(uploadPath, file), 'utf8');
                const words = contents.split(' ').filter(word => word !== '');

                words.forEach(word => {
                    if (wordCountMap.has(word)) {
                        wordCountMap.set(word, wordCountMap.get(word) + 1);
                    } else {
                        wordCountMap.set(word, 1);
                    }
                });
            });

            const sortedWords = [...wordCountMap.entries()].sort((a, b) => b[1] - a[1]);

            let limit = req.query.limit ? parseInt(req.query.limit) : 10;
            if (limit > sortedWords.length) {
                limit = sortedWords.length;
            }

            let order = req.query.order === 'asc' ? 'asc' : 'desc';

            if (order === 'asc') {
                sortedWords.splice(limit);
            } else {
                sortedWords.reverse().splice(limit);
            }

            const result = sortedWords.map(entry => `${entry[1]} ${entry[0]}`).join('\n');
            res.send(result);
        }
    });
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});
