import { createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, addProductToCart } from '../../redux/actions'
import ProductService from "../../service/ProductService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedModels, setSelectedModels] = useState(new Set());
    const [value, setValue] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const productsPerPage = 12;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [searchTerm, setSearchTerm] = useState('');

    const getFilteredAndSortedProducts = () => {
        const filtered = products.filter(product =>
            (selectedCategories.size === 0 || selectedCategories.has(product.brand)) &&
            (selectedModels.size === 0 || selectedModels.has(product.model))
        );

        const sorted = sortProducts(filtered, sortValue);
        return sorted;
    };

    const sortProducts = (products, sortValue) => {
        switch (sortValue) {
            case "oldtonew":
                return [...products].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case "newtoold":
                return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case "hightolow":
                return [...products].sort((a, b) => b.price - a.price);
            case "lowtohigh":
                return [...products].sort((a, b) => a.price - b.price);
            default:
                return products;
        }
    };

    const filteredAndSortedProducts = getFilteredAndSortedProducts();

    const searchedProducts = filteredAndSortedProducts.filter(product => {
        const productString = `${product.brand.toLowerCase()} ${product.model.toLowerCase()}`;
        return searchTerm === '' || productString.includes(searchTerm.toLowerCase());
    });
    

    const currentProducts = searchedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageCount = Math.ceil(searchedProducts.length / productsPerPage);
    const sepet = useSelector((state) => state.sepet.sepet);
    const totalAmount = sepet.reduce((toplam, urun) => toplam + urun.price * urun.quantity, 0).toFixed(2);


    const addProducts = (prs) => {
        dispatch(addProductToCart(prs));
    }

    useEffect(() => {
        const productService = new ProductService();
        productService.getAllProducts().then((data) => {
            dispatch(setProducts(data));
        });
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const values = {
        sepet,
        totalAmount,
        addProducts,
        handleClick,
        pageCount,
        currentPage,
        handleChangePage,
        open,
        handleClose,
        searchTerm,
        setSearchTerm,
        value,
        setValue,
        currentProducts,
        products,
        sortedProducts,
        setSortedProducts,
        selectedCategories,
        selectedModels,
        setSelectedCategories,
        setSelectedModels,
        sortProducts,
        sortValue,
        setSortValue
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContext;