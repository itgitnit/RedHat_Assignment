const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function displayFiles() {
    try {
        const response = await axios.get('http://localhost:8000/files');
        const files = response.data;

        if (files.length > 0) {
            console.log('Files in the store:');
            console.log(files);
        } else {
            console.log('No files in the store.');
        }
    } catch (error) {
        console.error(`Error retrieving files: ${error.message}`);
    }
}

async function addFiles(filenames) {
    const formData = new FormData();
    filenames.forEach(filename => {
        formData.append('files', fs.createReadStream(filename));
    });

    try {
        const response = await axios.post('http://localhost:8000/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(`Error uploading files: ${error.message}`);
    }
}

async function removeFile(filename) {
    try {
        await axios.delete(`http://localhost:8000/files/${filename}`);
        console.log(`File ${filename} deleted successfully.`);
    } catch (error) {
        console.error(`Error removing file: ${error.message}`);
    }
}

async function updateFile(existingFilename, newFilename) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(newFilename));

    try {
        const response = await axios.put(`http://localhost:8000/files/${existingFilename}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(`Error updating file: ${error.message}`);
    }
}

async function getWordCount() {
    try {
        const response = await axios.get('http://localhost:8000/wordcount');
        console.log(response.data);
    } catch (error) {
        console.error(`Error getting word count: ${error.message}`);
    }
}

async function getFrequentWords(limit, order) {
    const queryParams = `?limit=${limit}&order=${order}`;

    try {
        const response = await axios.get(`http://localhost:8000/freqwords${queryParams}`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error getting frequent words: ${error.message}`);
    }
}

async function runService() {
    await displayFiles(); // List files in the store

    await addFiles(['file1.txt', 'file2.txt']); // Add files to the store
    await displayFiles();
    await getWordCount(); // Get the word count of all files
    await getFrequentWords(10, 'desc'); // Get the most frequent words

    await updateFile('file2.txt', 'file1.txt'); // Update a file in the store
    await displayFiles();
    await getWordCount();
    await getFrequentWords(10, 'desc');

    await removeFile('file1.txt'); // Remove a file from the store
    await displayFiles();
    await getWordCount();
    await getFrequentWords(10, 'desc');
}

runService();
