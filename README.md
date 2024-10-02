So Here The Instructions To Run My Application  

# Upload File And Data Applications with Express and PostgreSQL

This project is a simple file upload application built using Node.js and Express, with PostgreSQL as the database. The application allows users to upload various types of files and store metadata (title and description) in the database.

## Prerequisites

Before running the application, ensure you have the following installed:

- Download Node.js : (https://nodejs.org/)
- Download PostgreSQL : (https://www.postgresql.org/)

## Project Structure

The basic folder structure of this project is as follows :
```
your-project/
│
├── public/
│   ├── icons/
│   │   └── Upload-File.ico
│   ├── migrations/
│   │   └── migrations_Application_Upload_Files.sql
│   ├── styles/
│   │   ├── Home-Style.css
│   │   └── Uploaded-Files-Style.css
│   ├── views/
│   │   ├── Home.html
│   │   └── Uploaded-Files.html
│
├── Uploads_Files/ (This folder is automatically created when the app runs)
│
├── server.js (Main application file)
│
└── package.json (Project metadata and dependencies)
```

### Getting Started

### 1. Clone the Repository

If you haven't already, clone the repository to your local machine :

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

- express : Web framework for Node.js
- multer : Middleware for handling file uploads
- pg : PostgreSQL client for Node.js

### 3. PostgreSQL Setup

Ensure PostgreSQL is running and create a database named `Aplication_Upload_Files`. After that, create the `upload_files` table by running the following SQL command:

CREATE TABLE upload_files (
    id SERIAL PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

Update your PostgreSQL configuration in the code if needed :

```
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Aplication_Upload_Files',
    password: 'FerariF12',
    port: 5432,
});
```

### 4. Run the Application

To start the server, use the following command :

```
node app.js
```
The application will start running on `http://localhost:3000`.

### 5. Access the Application

- Home Page : Open your browser and go to `http://localhost:3000/`. You will see the file upload form.
- Files Page : After uploading files, you can view them by navigating to `http://localhost:3000/files`.

### 6. HTML Views

The project includes the following HTML files for the user interface:

- Home.html : The upload form.

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Upload File</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="../icons/Upload-File.ico">
    <link rel="stylesheet" href="../styles/Home-Style.css"> 
</head>

<body>
    <div class="container">
        <h1><i class="fa-brands fa-app-store-ios"></i> Application Upload File</h1>
        <h2><i class="fa-solid fa-user"></i> By Ravano Akbar Widodo</h2>
        <br>
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <label for="title"><i class="fa-solid fa-clapperboard"></i> Title :</label>
            <input type="text" id="title" name="title" class="form-input" placeholder="Enter file title" required><br><br>

            <label for="description"><i class="fa-solid fa-circle-info"></i> Description :</label>
            <input type="text" id="description" name="description" class="form-input" placeholder="Enter file description" required><br><br>

            <label for="file"><i class="fa-solid fa-file-import"></i> Choose A File :</label>
            <input type="file" id="file" name="Files" class="form-input" required><br><br>

            <button type="submit" class="btn-upload"><i class="fa-solid fa-upload"></i> Upload Data And Files</button>
            <br>
            <a href="/files" class="btn-go-to-uploaded-page"><i class="fa-solid fa-arrow-right"></i> Go To Uploaded Pages</a>
        </form>
        <br>
        <div id="success-message"></div>
    </div>
</body>
</html>
```

- Uploaded-Files.html : Displays a list of uploaded files.

```  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uploaded Files</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="../icons/Upload-File.ico">
    <link rel="stylesheet" href="../styles/Uploaded-Files-Style.css"> 
</head>
<body>
    <div id="success-message" style="display: none; color: green; width: 50%; border-radius: 10px;" class="message-box">
        <i class="fa-solid fa-check"></i> File And Data Uploaded Successfully! This Massage Will Be Closed Automaticly In <span id="success-countdown"></span>
    </div>

    <div id="error-message" style="display: none; color: red; width: 42%; border-radius: 10px;" class="message-box">
        <i class="fa-solid fa-xmark"></i> No files uploaded yet. This Massage Will Be Closed Automaticly In <span id="error-countdown"></span>
    </div>

    <div class="container">
        <h1><i class="fa-solid fa-cloud-arrow-up"></i> Uploaded Files</h1>

        <div style="display: flex; justify-content: center; width: 100%; max-width: 1100px;">
            <table border="1" style="text-align: center;"> 
                <thead>
                    <tr>
                        <th><i class="fa-solid fa-clapperboard"></i> Title</th>
                        <th><i class="fa-solid fa-circle-info"></i> Description</th>
                        <th><i class="fa-solid fa-file"></i> File Path</th>
                    </tr>
                </thead>
                <tbody id="file-list">
                </tbody>
            </table>
        </div>
        <br>
        <a href="/" class="btn-back-upload-page"><i class="fa-solid fa-arrow-left"></i> Go back to upload page</a>
    </div>

    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
    
        if (success) {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: newUrl }, '', newUrl);
        }
    
        if (success === 'true') {
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block'; 
    
            let countdown = 5; 
            const successCountdown = document.getElementById('success-countdown');
            successCountdown.textContent = `${countdown} seconds`;
    
            const successInterval = setInterval(() => {
                countdown--;
                successCountdown.textContent = `${countdown} seconds`;
                if (countdown <= 0) {
                    clearInterval(successInterval);
                    successMessage.style.display = 'none'; 
                }
            }, 1000); 
        }
    
        // Handle file fetching and error message
        async function fetchFiles() {
            const response = await fetch('/api/files'); 
            const files = await response.json();
            const fileList = document.getElementById('file-list');
            const errorMessage = document.getElementById('error-message');
    
            if (files.length > 0) {
                files.forEach(file => {
                    const row = document.createElement('tr');
    
                    const titleCell = document.createElement('td');
                    titleCell.textContent = file.title;
                    row.appendChild(titleCell);
    
                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = file.description;
                    row.appendChild(descriptionCell);
    
                    const filePathCell = document.createElement('td');
                    filePathCell.textContent = file.file_path;
                    row.appendChild(filePathCell);
    
                    fileList.appendChild(row);
                });
            } else {
                const errorCountdown = document.getElementById('error-countdown');
                errorMessage.style.display = 'block'; 
    
                let countdown = 5;
                errorCountdown.textContent = `${countdown} seconds`;
    
                const errorInterval = setInterval(() => {
                    countdown--;
                    errorCountdown.textContent = `${countdown} seconds`;
                    if (countdown <= 0) {
                        clearInterval(errorInterval);
                        errorMessage.style.display = 'none'; 
                    }
                }, 1000); 
            }
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

   ```
   git init
   ```

2. **Add files to staging**:

   ```
   git add .
   ```

3. **Commit your changes**:

   ```
   git commit -m "Initial commit"
   ```

4. **Create a new branch** (optional):

   ```
   git checkout -b feature-branch
   ```

5. **Merge changes into the main branch**:

   ```
   git checkout main
   git merge feature-branch
   ```

6. **Push changes to a remote repository** (if applicable):

   ```
   git remote add origin <repository-url>
   git push -u origin main
   ```

### 10. Troubleshooting

- Database connection error : Ensure PostgreSQL is running and the database credentials are correct in the `app.js` file.
- Multer error : If the file type is not supported, you’ll see an error. Ensure the file type is in the allowed list.

## License

This project is licensed under the MIT License.

```
It explains everything from setting up the environment, running the app, using Git, and troubleshooting common issues. You can modify the details according to your specific project setup.
```
