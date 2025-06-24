const express = require("express");

const app = express();

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the bookstore API",
  });
});

app.get("/get", (req, res) => {
  res.json(books);
});

app.get("/get/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book Not found",
    });
  }
});

// add a book :
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "Book added successfully",
  });
});

// update  a book :

app.put("/update/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const findCurrentBook = books.find((book) => book.id === bookId);
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      message: `Book with id : ${bookId} updated successfully`,
      data: findCurrentBook,
    });
  } else {
    res.status(404).json({
      message: "Book Not Found",
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const findIndex = books.findIndex((book) => book.id === bookId);
  console.log(findIndex);
  if (findIndex !== -1) {
    const deletedBook = books.splice(findIndex, 1);
    res.status(200).json({
      message: "Book deleted successfully",
      data: deletedBook[0],
    });
  } else {
    res.status(404).json({
      message: "Book not Found",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running  at PORT : ${PORT}`);
});
