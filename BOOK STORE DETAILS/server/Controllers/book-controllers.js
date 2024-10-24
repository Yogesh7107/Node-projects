const bookModal = require("../Modal/book");


const getBook = async (req, res) => {
  try {
    let data = await bookModal.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send('Error retrieving books');
  }
};


const postBook = async (req, res) => {
  try {
    const book = new bookModal(req.body);
    await book.save()
    res.send("Book added successfully");
  } catch (error) {
    console.log(error);
    res.send("Book add failed");
  }
};


const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await bookModal.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.send("Book not found");
    }
    res.send("Book deleted successfully");
  } catch (error) {
    console.log(error);
    res.send("Book delete failed");
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await bookModal.findByIdAndUpdate(id, { $set: req.body });
    if (!updatedBook) {
      return res.send("Book not found");
    }
    res.send("Book updated successfully");
  } catch (error) {
    console.log(error);
    res.send("Book update failed");
  }
};

exports.getBook = getBook;
exports.postBook = postBook;
exports.editBook = editBook;
exports.deleteBook = deleteBook;
