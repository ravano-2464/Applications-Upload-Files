So Here The Instructions To Run My Application  

```md
# File Upload Application with Express and PostgreSQL

This project is a simple file upload application built using Node.js and Express, with PostgreSQL as the database. The application allows users to upload various types of files and store metadata (title and description) in the database.

## Prerequisites

Before running the application, ensure you have the following installed:

- Download Node.js : (https://nodejs.org/)
- Download PostgreSQL : (https://www.postgresql.org/)

## Project Structure

The basic folder structure of this project is as follows:

```
your-project/
│
├── public/
│   ├── views/
│   │   ├── Home.html
│   │   └── Files.html
│
├── Uploads_Files/ (This folder is automatically created when the app runs)
│
├── app.js (Main application file)
│
└── package.json (Project metadata and dependencies)
```

## Getting Started

### 1. Clone the Repository

If you haven't already, clone the repository to your local machine:

```
git clone <https://github.com/ravano-2464/Applications-Upload-Files.git>
cd your-project
```

### 2. Install Dependencies

Navigate to your project folder and install the required dependencies:

```
npm install
```

The dependencies required are:

- **express** : Web framework for Node.js
- **multer** : Middleware for handling file uploads
- **pg** : PostgreSQL client for Node.js

### 3. PostgreSQL Setup

Ensure PostgreSQL is running and create a database named `Aplication_Upload_Files`. After that, create the `upload_files` table by running the following SQL command:

```sql
CREATE TABLE upload_files (
    id SERIAL PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
```

Update your PostgreSQL configuration in the code if needed:

```js
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Aplication_Upload_Files',
    password: 'FerariF12',
    port: 5432,
});
```

### 4. Run the Application

To start the server, use the following command:

```
node app.js

The application will start running on `http://localhost:3000`.

### 5. Access the Application

- **Home Page**: Open your browser and go to `http://localhost:3000/`. You will see the file upload form.
- **Files Page**: After uploading files, you can view them by navigating to `http://localhost:3000/files`.

### 6. HTML Views

The project includes the following HTML files for the user interface:

- **Home.html**: The upload form.
  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Upload File</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="text" name="title" placeholder="Title" required>
        <textarea name="description" placeholder="Description" required></textarea>
        <input type="file" name="Files" required>
        <button type="submit">Upload</button>
    </form>
    <a href="/files">View Uploaded Files</a>
</body>
</html>

- **Uploaded-Files.html**: Displays a list of uploaded files.
  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Files</title>
</head>
<body>
    <h1>Uploaded Files</h1>
    <div id="files-list"></div>
    <script>
        async function fetchFiles() {
            const response = await fetch('/api/files');
            const files = await response.json();
            const filesList = document.getElementById('files-list');

            files.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.innerHTML = `<p>${file.title}: <a href="/Uploads_Files/${file.file_path}">${file.file_path}</a></p>`;
                filesList.appendChild(fileItem);
            });
        }

        fetchFiles();
    </script>
</body>
</html>
```

### 7. API Endpoints

The application includes the following routes:

- `GET /` – Serves the upload form from `Home.html`.
- `GET /files` – Serves the file listing page from `Files.html`.
- `POST /upload` – Handles file uploads and saves metadata to the database.
- `GET /api/files` – Fetches the list of uploaded files from the database in JSON format.

### 8. File Upload & Storage

- Uploaded files are saved to the `Uploads_Files` directory.
- Multer is used to handle file uploads and ensures only supported file types (PDF, Word documents, ZIP, RAR, PowerPoint, Excel, etc.) are allowed.

### 9. Using Git for Version Control

Here’s a quick guide to using Git for this project:

1. **Initialize a Git repository** (if not already done):

   ```bash
   git init
   ```

2. **Add files to staging**:

   ```bash
   git add .
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Initial commit"
   ```

4. **Create a new branch** (optional):

   ```bash
   git checkout -b feature-branch
   ```

5. **Merge changes into the main branch**:

   ```bash
   git checkout main
   git merge feature-branch
   ```

6. **Push changes to a remote repository** (if applicable):

   ```bash
   git remote add origin <repository-url>
   git push -u origin main
   ```

### 10. Troubleshooting

- **Database connection error**: Ensure PostgreSQL is running and the database credentials are correct in the `app.js` file.
- **Multer error**: If the file type is not supported, you’ll see an error. Ensure the file type is in the allowed list.

## License

This project is licensed under the MIT License.
```

It explains everything from setting up the environment, running the app, using Git, and troubleshooting common issues. You can modify the details according to your specific project setup.