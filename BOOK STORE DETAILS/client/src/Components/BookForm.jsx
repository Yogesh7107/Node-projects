import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for a modern look
const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#3f51b5', // Primary color for the header
    color: '#ffffff', // White text
  },
  '& .MuiDialogContent-root': {
    backgroundColor: '#f5f5f5', // Light background for the content
  },
  '& .MuiDialogActions-root': {
    backgroundColor: '#e3f2fd', // Light blue for actions
  },
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#3f51b5', // Primary button color
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#303f9f', // Darker shade on hover
  },
}));

const StyledCancelButton = styled(Button)(() => ({
  color: '#f44336', // Red color for cancel
}));

const BookForm = ({ open, onClose, book, onSubmit, isEdit, handleInputChange }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevents default form submission behavior
    onSubmit();  // Call the onSubmit passed as a prop
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</DialogTitle>
      <DialogContent>
        {/* Use form for better structure */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Book Name"
            name="name"
            fullWidth
            margin="normal"
            value={book.name || ''} // Ensure value is not undefined
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Author"
            name="author"
            fullWidth
            margin="normal"
            value={book.author || ''} // Ensure value is not undefined
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            value={book.image || ''} // Ensure value is not undefined
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={book.price || ''} // Ensure value is not undefined
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={book.description || ''} // Ensure value is not undefined
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <StyledCancelButton onClick={onClose}>
          Cancel
        </StyledCancelButton>
        <StyledButton onClick={handleSubmit} variant="contained">
          {isEdit ? 'Update Book' : 'Add Book'}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default BookForm;
