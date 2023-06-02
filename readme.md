# File Store Service

The File Store Service is a simple HTTP server and command line client that allows users to store, update, delete, and perform operations on plain-text files. The server provides endpoints for managing files, while the client interacts with the server to perform various operations.

## Features

The File Store Service supports the following operations:

1. Add files to the store.

   - The server can accept multiple files for upload simultaneously.
   - If a file with the same name already exists in the store, the upload will fail.
   - Files are stored as plain text.

2. List files in the store.

   - Retrieves a list of all files currently stored in the server.

3. Remove a file.

   - Deletes a specified file from the store.

4. Update contents of a file in the store.

   - Updates the contents of an existing file in the store.
   - If the file does not exist, a new file will be created.

5. Operations on files:
   - Word count: Retrieves the total number of words in all files stored in the server.
   - Most frequent words: Retrieves a list of the most frequent words in all files combined.

## Prerequisites

- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:

   ```bash
   cd folder_name
   npm install   # or yarn install
   ```

## Usage

1.  Start the server:

```bash
node server.js
```

    The server will start listening on port 8000.

2.  Open a new terminal window and run the client:

    ```bash
    node client.js
    ```

    The client will execute a series of example operations, showcasing the functionality of the file store service.

    Alternatively, you can run each function individually to see the results more clearly. Comment out the functions you don't want to run in the `runService` function inside `client.js`. Then, in the terminal, run:

    ```bash
    node client.js
    ```

>> This will execute only the selected functions and display their results.

Here are the individual functions you can run:

1. `displayFiles()`: List files in the store.
2. `addFiles(['file1.txt', 'file2.txt'])`: Add files `file1.txt` and `file2.txt` to the store.
3. `displayFiles()`: Display the list of files in the store.
4. `getWordCount()`: Get the word count of all files in the store.
5. `getFrequentWords(10, 'desc')`: Get the 10 most frequent words in the store.
6. `updateFile('file2.txt', 'file1.txt')`: Update `file2.txt` with the contents of `file1.txt`.
7. `displayFiles()`: Display the updated list of files in the store.
8. `getWordCount()`: Get the updated word count of all files in the store.
9. `getFrequentWords(10, 'desc')`: Get the 10 most frequent words in the store.
10. `removeFile('file1.txt')`: Remove `file1.txt` from the store.
11. `displayFiles()`: Display the final list of files in the store.
12. `getWordCount()`: Get the final word count of all files in the store.
13. `getFrequentWords(10, 'desc')`: Get the final 10 most frequent words in the store.

Uncomment and modify these functions as needed to perform your desired operations on the server.

## API Endpoints

The File Store Service provides the following API endpoints:

1. `GET /files`: Retrieves a list of files in the store.
2. `POST /files`: Uploads one or more files to the store.
3. `DELETE /files/:filename`: Removes the specified file from the store.
4. `PUT /files/:filename`: Updates the specified file in the store.
5. `GET /wordcount`: Retrieves the total word count of all files in the store.
6. `GET /freqwords`: Retrieves the most frequent words in the files.

Refer to the server.js file for more details.

>> I hope this provides the clarity you were looking for! Let me know if there's anything else I can assist you with.
