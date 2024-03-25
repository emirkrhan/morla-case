import React from 'react'
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProductInCart from './ProductInCart';
import { increaseQuantity, decreaseQuantity, updateQuantity, removeProduct } from '../redux/actions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import AppContext from './context/AppContext';

function ShoppingCart() {

    const {
        sepet,
        totalAmount
    } = useContext(AppContext);

    const dispatch = useDispatch();

    const handleIncrease = (index) => {
        dispatch(increaseQuantity(index));
    };

    const handleDecrease = (prd, index) => {
        let newQuantity = parseInt(prd.quantity, 10);
        if (newQuantity > 1) {
            dispatch(decreaseQuantity(index));
        }
    };

    const handleChange = (event, index) => {
        let newQuantity = parseInt(event.target.value, 10);
        if (newQuantity < 1) {
            newQuantity = 1;
        }
        dispatch(updateQuantity(index, newQuantity));
    };


    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    return (
        <Grid item xs={12} md={3}>
            <Card sx={{ mx: 2, mb: 2 }}>
                <CardContent>
                    {sepet.length > 0 ? (
                        sepet.map((prd, index) => (
                            <ProductInCart
                                key={index}
                                prd={prd}
                                index={index}
                                handleChange={handleChange}
                                handleIncrease={handleIncrease}
                                handleDecrease={handleDecrease}
                                handleRemove={handleRemove} />
                        ))
                    ) : (
                        <Typography variant="subtitle1" align="center">
                            SEPET BOŞ
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Card sx={{ mx: 2 }}>
                <CardContent>
                    <Typography sx={{ mb: 1, fontSize: '14px' }} component="div">
                        Total Amount: <span color='primary' style={{ color: '#2a86ff', fontWeight: 'bold' }}>{totalAmount} ₺</span>
                    </Typography>
                    <Button variant='contained' color='primary' sx={{ fontSize: '14px' }} disableElevation fullWidth>
                        Checkout
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ShoppingCart