CREATE TABLE upload_files (
    id SERIAL PRIMARY KEY,
    file_path VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);