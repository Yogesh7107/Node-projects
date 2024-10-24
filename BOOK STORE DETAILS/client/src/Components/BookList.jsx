// BookList.js
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for a more modern look
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
  backgroundColor: '#f5f5f5',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(( {theme} ) => ({
  backgroundColor: '#1976d2',
  color: '#ffffff',
  boxShadow: theme.shadows[3],

  '&:hover': {
    backgroundColor: '#115293',
  },
  borderRadius: '8px',
}));

const StyledDeleteButton = styled(Button)(( {theme} ) => ({
  borderColor: '#f44336',
  boxShadow: theme.shadows[3],

  color: '#f44336',
  borderRadius: '8px',
}));

const BookList = ( data, onDelete, onEdit, loading ) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {data.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book._id}>
          <StyledCard>
            <CardMedia
              component="img"
              height="200"
              image={book.image}
              alt={book.name}
              style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} // Match card border radius
            />
            <CardContent>
              <Typography variant="h6" component="div">{book.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{book.author}</Typography>
              <Typography variant="body2" color="textSecondary">Price: ${book.price}</Typography>
              <Typography variant="body2" color="textSecondary" paragraph>{book.description}</Typography>
              <Box mt={2}>
                <StyledDeleteButton
                  variant="outlined"
                  onClick={() => onDelete(book._id)}
                  fullWidth
                  style={{ marginBottom: '10px' }}
                >
                  Delete
                </StyledDeleteButton>
                <StyledButton
                  variant="contained"
                  onClick={() => onEdit(book)}
                  fullWidth
                >
                  Edit
                </StyledButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
