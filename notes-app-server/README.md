# App-Notes Server

This is a simple Node.js server powered by Express and Prisma to manage notes. Users can perform CRUD (Create, Read, Update, Delete) operations on notes, making it a handy API for note management applications.

## Features

- **Create Note**: Add a new note with a title and content.
- **List All Notes**: Fetch a list of all notes from the database.
- **Get Note by ID**: Retrieve a specific note using its ID.
- **Update Note**: Modify the title and content of a note based on its ID.
- **Delete Note**: Remove a note from the database using its ID.

## Getting Started

1. **Prerequisites**:
    - Node.js
    - PostgreSQL

2. **Setup**:
    - Clone this repository.
    - Run `npm install` to install all dependencies.
    - Ensure you have a PostgreSQL database setup and have the connection string ready.

3. **Environment Configuration**:
    - Create a `.env` file at the root of the project.
    - Add your database connection string as `DATABASE_URL`.
    ```
    DATABASE_URL="your_postgresql_connection_string"
    ```

4. **Running the Server**:
    - Run `npm start` to start the server. By default, the server will run on port 5000.

## API Endpoints

- **Create a New Note**:
    - `POST /api/notes`
    - Body: `{ "title": "Note Title", "content": "Note Content" }`

- **Get All Notes**:
    - `GET /api/notes`

- **Get Note by ID**:
    - `GET /api/notes/:id`

- **Update Note**:
    - `PUT /api/notes/:id`
    - Body: `{ "title": "New Title", "content": "Updated Content" }`

- **Delete Note**:
    - `DELETE /api/notes/:id`

## Database Schema

The server uses Prisma with PostgreSQL as the database. The database has a single `Note` model:

\```
model Note {
id        Int      @default(autoincrement()) @id
title     String
content   String
}
\```

Each note has a unique `id`, a `title`, and `content`.

