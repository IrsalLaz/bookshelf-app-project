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
		document.getElementById("bookForm").reset();

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

	// load data from local storage
	if (isStorageExist) {
		loadBookList();
	}

	// cancel edit button
	const cancelBtn = document.getElementById("cancelBtn");
	cancelBtn.addEventListener("click", function () {
		document.getElementById("bookForm").reset();
		showEditBtnGroup(false);
	});

	// search event
	const searchBook = document.getElementById("searchBook");
	searchBook.addEventListener("submit", function (event) {
		event.preventDefault();
		renderFindingBook();
	});

	// reset view
	const resetViewBtn = document.getElementById("resetViewBtn");
	resetViewBtn.addEventListener("click", function (event) {
		event.preventDefault();
		document.dispatchEvent(new Event(RENDER_EVENT));
		resetViewBtn.setAttribute("hidden", "");
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

function isStorageExist() {
	if (typeof Storage === undefined) {
		alert("Browser anda tidak mendukung Web Storage");
		return false;
	}
	return true;
}

function saveData() {
	if (isStorageExist) {
		document.dispatchEvent(new Event(RENDER_EVENT));

		const parsed = JSON.stringify(books);
		localStorage.setItem(BOOKS_KEY, parsed);

		document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

function makeBook(book) {
	const bookElement = document.createElement("div");
	bookElement.setAttribute("data-bookid", book.id);
	bookElement.setAttribute("data-testid", "bookItem");

	const title = document.createElement("h3");
	title.setAttribute("data-testid", "bookItemTitle");
	title.innerText = book.title;

	const author = document.createElement("p");
	author.setAttribute("data-testid", "bookItemAuthor");
	author.innerText = `Penulis: ${book.author}`;

	const year = document.createElement("p");
	year.setAttribute("data-testid", "bookItemYear");
	year.innerText = `Tahun: ${book.year}`;

	bookElement.append(title, author, year);

	const isCompleteBtn = document.createElement("button");
	isCompleteBtn.setAttribute("data-testid", "bookItemIsCompleteButton");
	isCompleteBtn.innerText = "Selesai dibaca";

	const deleteBtn = document.createElement("button");
	deleteBtn.setAttribute("data-testid", "bookItemDeleteButton");
	deleteBtn.innerText = "Hapus Buku";

	const editBtn = document.createElement("button");
	editBtn.setAttribute("data-testid", "bookItemEditButton");
	editBtn.innerText = "Perbarui Buku";

	// setup status changes event
	isCompleteBtn.addEventListener("click", function () {
		changeCompleteStatus(book.id);
	});

	// setup delete book event
	deleteBtn.addEventListener("click", function () {
		deleteBook(book.id);
	});

	// setup edit event
	editBtn.addEventListener("click", function () {
		editBook(book.id);
		showEditBtnGroup(true);
	});

	if (book.isComplete) {
		isCompleteBtn.innerText = "Belum Selesai Membaca";
		bookElement.append(title, author, year, isCompleteBtn, deleteBtn, editBtn);
	} else {
		bookElement.append(title, author, year, isCompleteBtn, deleteBtn, editBtn);
	}

	return bookElement;
}

function loadBookList() {
	const bookData = localStorage.getItem(BOOKS_KEY);
	const bookList = JSON.parse(bookData);

	if (bookList !== null) {
		for (const book of bookList) {
			books.push(book);
		}
	}

	document.dispatchEvent(new Event(RENDER_EVENT));
}

function changeCompleteStatus(bookId) {
	const targetBook = findBook(bookId);

	if (targetBook == null) {
		return;
	} else if (targetBook.isComplete == false) {
		targetBook.isComplete = true;
	} else {
		targetBook.isComplete = false;
	}

	saveData();
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
	for (const bookItem of books) {
		if (bookItem.id == bookId) {
			return bookItem;
		}
	}
	return null;
}

function deleteBook(bookId) {
	const targetBook = findBook(bookId);

	if (targetBook == null) {
		return;
	}

	// delete from array
	books.splice(targetBook, 1);

	// save and render new data
	saveData();
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(bookId) {
	const targetBook = findBook(bookId);

	if (targetBook == null) {
		return;
	}

	// get element and append books data to input field
	const titleInput = document.getElementById("bookFormTitle");
	const authorInput = document.getElementById("bookFormAuthor");
	const yearInput = document.getElementById("bookFormYear");
	const isComplete = document.getElementById("bookFormIsComplete");

	titleInput.value = targetBook.title;
	authorInput.value = targetBook.author;
	yearInput.value = targetBook.year;

	if (targetBook.isComplete) {
		isComplete.setAttribute("checked", "");
	}

	const bookFormEdit = document.getElementById("bookFormEdit");
	bookFormEdit.addEventListener("click", function () {
		const newTitle = document.getElementById("bookFormTitle").value;
		const newAuthor = document.getElementById("bookFormAuthor").value;
		const newYear = document.getElementById("bookFormYear").value;
		const newIsComplete = document.getElementById("bookFormIsComplete").checked;

		const indexBook = books.indexOf(targetBook);
		if (indexBook !== -1) {
			books[indexBook] = generateBookObject(
				targetBook.id,
				newTitle,
				newAuthor,
				newYear,
				newIsComplete
			);
		}

		showEditBtnGroup(false);
		saveData();
	});
}

function showEditBtnGroup(isEdit) {
	if (isEdit) {
		document.getElementById("bookFormSubmit").setAttribute("hidden", "");
		document.getElementById("bookFormEdit").removeAttribute("hidden");
		document.getElementById("cancelBtn").removeAttribute("hidden");
	} else {
		document.getElementById("bookFormSubmit").removeAttribute("hidden");
		document.getElementById("bookFormEdit").setAttribute("hidden", "");
		document.getElementById("cancelBtn").setAttribute("hidden", "");
	}
}

function renderFindingBook() {
	const keyword = document
		.getElementById("searchBookTitle")
		.value.toLowerCase();

	if (keyword != "") {
		const incompleteBookList = document.getElementById("incompleteBookList");
		incompleteBookList.innerHTML = "";
		const completeBookList = document.getElementById("completeBookList");
		completeBookList.innerHTML = "";

		for (const book of books) {
			if (book.title.toLowerCase().includes(keyword)) {
				// render list book
				const bookElement = makeBook(book);

				if (!book.isComplete) {
					incompleteBookList.append(bookElement);
				} else {
					completeBookList.append(bookElement);
				}
			}
		}
		document.getElementById("resetViewBtn").removeAttribute("hidden");
	}
}
