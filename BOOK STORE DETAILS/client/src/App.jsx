import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookForm from './Components/BookForm';

const App = () => {
  const [data, setData] = useState([]);
  const [book, setBook] = useState({
    name: "",
    author: "",
    image: "",
    price: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8080/')
      .then((response) => setData(response.data))
      .catch((err) => console.error('Error fetching books:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = isEdit
      ? axios.put(`http://localhost:8080/${book._id}`, book)
      : axios.post('http://localhost:8080/', book);

    apiCall
      .then(() => {
        fetchBooks();
        resetForm();
        handleClose();
        showSnackbar(isEdit ? 'Book updated successfully!' : 'Book added successfully!', 'success');
      })
      .catch((err) => {
        console.error('Error saving book:', err);
        showSnackbar('Error saving book!', 'error');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/${id}`)
      .then(() => {
        fetchBooks();
        showSnackbar('Book deleted successfully!', 'success');
      })
      .catch((err) => {
        console.error('Error deleting book:', err);
        showSnackbar('Error deleting book!', 'error');
      });
  };

  const handleEdit = (book) => {
    setBook(book);
    setIsEdit(true);
    handleClickOpen();
  };

  const resetForm = () => {
    setBook({
      name: "",
      author: "",
      image: "",
      price: "",
      description: "",
    });
    setIsEdit(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#1976d2' }}>
          Book Store
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#ff5722', color: '#fff', mb: 4 }}
          onClick={handleClickOpen}
          fullWidth
        >
          Add New Book
        </Button>

        {/* Book Form Modal */}
        <BookForm
          open={open}
          onClose={handleClose}
          book={book}
          onSubmit={handleSubmit}
          isEdit={isEdit}
          handleInputChange={handleInputChange}
        />

        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#555', mt: 4 }}>
          Available Books
        </Typography>

        <Grid container spacing={2}>
          {data.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <img
                  src={book.image}
                  alt={book.name}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <Typography variant="h6" gutterBottom>
                  {book.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Typography variant="body1" color="primary" gutterBottom>
                  ${book.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {book.description}
                </Typography>
                <Box mt={2}>
                  <IconButton color="primary" onClick={() => handleEdit(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(book._id)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%', fontSize: '1.2rem' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
