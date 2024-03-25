import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Box, CardContent, InputAdornment, TextField, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import AppContext from './context/AppContext';
import { SearchRounded } from '@mui/icons-material';

function Filtering() {

    const {
        value,
        products,
        setValue,
        selectedCategories,
        setSelectedCategories,
        selectedModels,
        setSelectedModels,
        setSortValue
    } = useContext(AppContext);

    const [categories, setCategories] = useState([]);
    const [model, setModel] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchModel, setSearchModel] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        setSortValue(e.target.value);
    };

    useEffect(() => {
        const categorySet = new Set(products.map(product => product.brand));
        const modelSet = new Set(products.map(product => product.model));
        setCategories([...categorySet]);
        setModel([...modelSet]);
    }, [products]);

    const handleCategoryChange = (e) => {
        const category = e.target.name;
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleModelChange = (e) => {
        const model = e.target.name;
        setSelectedModels(prev => {
            const newSet = new Set(prev);
            if (newSet.has(model)) {
                newSet.delete(model);
            } else {
                newSet.add(model);
            }
            return newSet;
        });
    };

    return (
        <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ minWidth: '70%', width: '70%' }}>
                <Typography sx={{ fontSize: '14px' }} gutterBottom>
                    Sort By
                </Typography>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <RadioGroup
                            name="sorting"
                            value={value}
                            onChange={handleChange}
                            sx={{
                                '& .MuiFormControlLabel-root': {
                                    margin: 0,
                                },
                                '& .MuiRadio-root': {
                                    padding: '8px',
                                }
                            }}>
                            <FormControlLabel value="oldtonew" control={<Radio sx={{ color: '#2a59fe' }} />} label="Old to new" />
                            <FormControlLabel value="newtoold" control={<Radio sx={{ color: '#2a59fe' }} />} label="New to old" />
                            <FormControlLabel value="hightolow" control={<Radio sx={{ color: '#2a59fe' }} />} label="Price high to low" />
                            <FormControlLabel value="lowtohigh" control={<Radio sx={{ color: '#2a59fe' }} />} label="Price low to high" />
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Typography sx={{ fontSize: '14px' }} gutterBottom>
                    Brands
                </Typography>
                <Card sx={{ maxHeight: '190px', overflow: 'auto', mb: 3 }}>
                    <CardContent>
                        <FormGroup>

                            <TextField
                                value={searchCategory}
                                placeholder='Ara...'
                                onChange={(e) => setSearchCategory(e.target.value)}
                                id="searchCategory"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        },
                                    },
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '3px'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRounded />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {categories.filter(category => category.toLowerCase().includes(searchCategory.toLowerCase())).map((category, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedCategories.has(category)}
                                            onChange={handleCategoryChange}
                                            name={category}
                                            sx={{
                                                color: '#2a59fe',

                                            }}
                                        />
                                    }
                                    label={category}
                                />
                            ))}
                        </FormGroup>
                    </CardContent>
                </Card>

                <Typography sx={{ fontSize: '14px' }} gutterBottom>
                    Model
                </Typography>
                <Card sx={{ maxHeight: '190px', overflow: 'auto' }}>
                    <CardContent>
                        <FormGroup>

                            <TextField
                                value={searchModel}
                                placeholder='Ara...'
                                onChange={(e) => setSearchModel(e.target.value)}
                                id="searchModel"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',
                                        },
                                        '&:hover fieldset': {
                                            border: 'none',
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none',
                                        },
                                    },
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '3px'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRounded />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {model.filter(model => model.toLowerCase().includes(searchModel.toLowerCase())).map((model, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedModels.has(model)}
                                            onChange={handleModelChange}
                                            name={model}
                                            sx={{
                                                color: '#2a59fe',

                                            }}
                                        />
                                    }
                                    label={model}
                                />
                            ))}
                        </FormGroup>
                    </CardContent>
                </Card>


            </Box>
        </Grid>
    );
}

export default Filtering;