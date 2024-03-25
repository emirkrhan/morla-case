import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../service/ProductService';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ShoppingCart from './ShoppingCart';
import AppContext from './context/AppContext';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function ProductDetail() {

    const {
        addProducts,
        handleClick
    } = useContext(AppContext);

    let { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getOneProduct(id)
            .then(data => setProduct(data))
            .catch(error => console.error("Ürün detaylarını alırken bir hata oluştu!", error));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <PrimarySearchAppBar />
            <Grid container spacing={0} sx={{ mt: 15 }}>
                <Grid item xs={12} md={9} spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ mx: 2, width: '90%' }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        sx={{
                                            minWidth: '100%',
                                            minHeight: '100%',
                                            objectFit: 'cover'
                                        }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" component="div">
                                        {product.brand + ' ' + product.model}
                                    </Typography>
                                    <Typography color='primary' variant="h6" component="div">
                                        {product.price} ₺
                                    </Typography>
                                    <Button sx={{ my: 3 }} onClick={() => { addProducts(product); handleClick() }}
                                        variant='contained' color='primary' disableElevation fullWidth>
                                        <ShoppingCartOutlinedIcon fontSize='small' />
                                    </Button>
                                    <Typography variant="body2">
                                        {product.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>

                    </Card>
                </Grid>
                <ShoppingCart />
            </Grid>
        </div>
    );
}

export default ProductDetail;
