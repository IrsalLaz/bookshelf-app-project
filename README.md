# Bookshelf App

The Bookshelf App is a simple web application designed to help users manage a collection of books. Users can add, edit, delete, search, and categorize books as "Belum selesai dibaca" (Not Finished Reading) or "Selesai dibaca" (Finished Reading).

## Features

- **Add Books**: Users can add new books with details including title, author, year of release, and completion status.
- **Edit Books**: Users can edit the details of existing books.
- **Delete Books**: Users can remove books from their collection.
- **Search Books**: Users can search for books by title.
- **Categorization**: Books can be marked as "Selesai dibaca" or "Belum selesai dibaca".

## Application Structure

- **HTML**: The main structure of the app, including forms and sections for displaying books.
- **CSS**: Styling for the application.
- **JavaScript**: Handles the logic for adding, editing, deleting, searching, and categorizing books. It also manages data persistence using the browser's local storage.

## Data Attributes

To ensure the application functions correctly, certain data attributes are used:
- `data-bookid`: Stores the unique ID of each book.
- `data-testid`: Used for identifying specific elements in the application, such as book items and buttons.

## Usage

1. **Adding a Book**: Fill in the book details in the provided form and click the "Masukkan Buku ke rak" button.
2. **Editing a Book**: Click the "Perbarui Buku" button next to a book to edit its details.
3. **Deleting a Book**: Click the "Hapus Buku" button next to a book to remove it from the list.
4. **Searching for a Book**: Use the search form to find books by title.
5. **Changing Book Status**: Use the "Selesai dibaca" button to toggle a book's completion status.

## Local Storage

The application uses local storage to persist book data across sessions. Ensure that your browser supports Web Storage for optimal functionality.

## Getting Started

1. Clone the repository.
2. Open `index.html` in your browser to start using the app.

Enjoy managing your bookshelf with ease!
