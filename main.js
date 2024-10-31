const books = [];
const RENDER_EVENT = "render_books";
const SAVED_EVENT = "saved_books";
const BOOKS_KEY = "books_list";

document.addEventListener("DOMContentLoaded", function () {
	const submitBooksForm = document.getElementById("bookForm");
	submitBooksForm.addEventListener("submit", function (event) {
		event.preventDefault();
		addTodo();
	});

	// setup customize render event
	document.addEventListener(RENDER_EVENT, function () {
		const incompleteBookList = document.getElementById("incompleteBookList");
		incompleteBookList.innerHTML = "";
		const completeBookList = document.getElementById("completeBookList");
		completeBookList.innerHTML = "";

		for (const bookObject of books) {
			const bookElement = makeBook(bookObject);

			if (!bookObject.isComplete) {
				incompleteBookList.append(bookElement);
			} else {
				completeBookList.append(bookElement);
			}
		}
	});

	// setup customize saved event
	document.addEventListener(SAVED_EVENT, function () {
		console.log("Books are saved");
	});
});

function addTodo() {
	const title = document.getElementById("bookFormTitle").value;
	const author = document.getElementById("bookFormAuthor").value;
	const year = document.getElementById("bookFormYear").value;
	const isComplete = document.getElementById("bookFormIsComplete").checked;
	const generateID = generateId();

	const bookObject = generateBookObject(
		generateID,
		title,
		author,
		year,
		isComplete
	);

	books.push(bookObject);

	saveData();
}

function generateId() {
	return Number(new Date());
}

function generateBookObject(id, title, author, year, isComplete) {
	return {
		id,
		title,
		author,
		year,
		isComplete,
	};
}

function saveData() {
	document.dispatchEvent(new Event(RENDER_EVENT));

	const parsed = JSON.stringify(books);
	localStorage.setItem(BOOKS_KEY, parsed);

	document.dispatchEvent(new Event(SAVED_EVENT));
}

function makeBook(book) {
	const bookElement = document.createElement("div");
	bookElement.setAttribute("data-bookid", book.id);
	bookElement.setAttribute("data-testid", "bookItem");

	bookElement.innerHTML = `
			<h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
              <button data-testid="bookItemIsCompleteButton">Selesai dibaca</button>
              <button data-testid="bookItemDeleteButton">Hapus Buku</button>
              <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>	
	`;
	return bookElement;
}
