const book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of Books fetched Successfully",
        data: allBooks,
      });
    } else {
      res.staus(404).json({
        success: false,
        message: "No Books found in collection",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong !! Please Try Again",
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const bookDetailsByID = await book.findById(getCurrentBookID);

    if (!bookDetailsByID) {
      return res.status(404).json({
        success: false,
        message: "Book with current ID is not available",
      });
    }

    res.status(200).json({
      success: true,
      data: bookDetailsByID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong !! Please Try Again",
    });
  }
};

const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await book.create(newBookFormData);

    if (newBookFormData) {
      res.status(200).json({
        success: true,
        message: "Book Added Successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong !! Please Try Again",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBookFormData = req.body;
    const getCurrentBookID = req.params.id;
    const updatedBook = await book.findByIdAndUpdate(
      getCurrentBookID,
      updatedBookFormData,
      {
        new: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book with this ID not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBook,
      message: "Book updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong !! Please Try Again",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const deletedBook = await book.findByIdAndDelete(getCurrentBookID);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book with this ID not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something Went wrong !! Please Try Again",
    });
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addBook,
  updateBook,
  deleteBook,
};
