import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getProductById } from '../redux/actions/productAction';
import { setLoading } from '../redux/reducers/appSlice';
import "../css/ProductDetails.css";
import Footer from './Footer';
import Header from './Header';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { product } = useAppSelector((state) => state.product); // Get loading state too
    const [count, setCount] = useState<number>(1); // Default to 1 for quantity

    const fetchProduct = async (id: number) => {
        dispatch(setLoading(true)); // Set loading true before fetching
        try {
            await dispatch(getProductById(id)); // Fetch product by ID
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            dispatch(setLoading(false)); // Set loading false after fetching
        }
    };

    useEffect(() => {
        // Ensure ID is valid and fetch the product
        if (id) {
            fetchProduct(Number(id));
        }
    }, [dispatch, id]); // Fetch product whenever ID changes

    useEffect(() => {
        // Show error if the product is not found
        if (product === null) {
            toast.error("Məhsul tapılmadı");
            const timer = setTimeout(() => {
                navigate('/products');
            }, 2000);
            return () => clearTimeout(timer); // Clear timeout on unmount
        }
    }, [product, navigate]); // Check product state

    const increaseCount = () => setCount(count + 1);
    const decreaseCount = () => setCount(count > 1 ? count - 1 : 1);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />
            { product ? (
                <div className="productdetails">
                    <div style={{ display: 'flex', alignSelf: 'center' }}>
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="content">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p className="price">${product.price}</p>
                        <div className="quantity-control">
                            <button className="quantity-button" onClick={decreaseCount}>−</button>
                            <span className="quantity-count">{count}</span>
                            <button className="quantity-button" onClick={increaseCount}>+</button>
                        </div>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            ) : (
                <Navigate to="/products" />
            )}
            <Footer />
        </Box>
    );
}

export default ProductDetails;
