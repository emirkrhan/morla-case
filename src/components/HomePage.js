import React, { useContext } from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AppContext from './context/AppContext';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import Filtering from './Filtering';

function HomePage() {
    const {
        addProducts,
        handleClick,
        pageCount,
        currentPage,
        handleChangePage,
        currentProducts,
        open,
        handleClose
    } = useContext(AppContext);

    return (
        <div>
            <PrimarySearchAppBar />
            <Grid container spacing={2} sx={{ mt: 10 }}>
                <Filtering />
                <Grid container item xs={12} md={6} spacing={2}>
                    {currentProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ padding: '7px', width: '100%', aspectRatio: 1 / 1 }}>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        sx={{
                                            minWidth: '100%',
                                            minHeight: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                                <CardContent sx={{ flexGrow: 1, height: '60px' }}>
                                    <Typography variant="body1" color="primary" component="div">
                                        {product.price} ₺
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        <Link className='link-no-style' to={`/product/${product.id}`}>{product.brand + ' ' + product.model}</Link>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => { addProducts(product); handleClick() }}
                                        variant='contained' color='primary' disableElevation fullWidth>
                                        <ShoppingCartOutlinedIcon fontSize='small' />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handleChangePage}
                            variant="text"
                            color="primary"
                            boundaryCount={1}
                            siblingCount={1}
                        />
                    </Grid>
                </Grid>
                <ShoppingCart />
            </Grid>
            <div style={{ width: '100%', height: '20rem' }}></div>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Ürün sepete eklendi."
            />
        </div>
    );
}

export default HomePage;
