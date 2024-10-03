import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getProductById } from '../redux/actions/productAction';
import { setLoading } from '../redux/reducers/productSlice';
import "../css/ProductDetails.css";
import Footer from './Footer';
import Header from './Header';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { ProductType } from '../assets/types/sliceTypes';
import { addToBasket } from '../redux/reducers/basketSlice';

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {product} = useAppSelector((state) => state.product); 
    const [count, setCount] = useState<number>(1);

    const fetchProduct = async (id: number) => {
        dispatch(setLoading(true));
        try {
            await dispatch(getProductById(id));
            console.log("Product fetched successfully");
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    useEffect(() => {
 
        if (!product) {
            const timer = setTimeout(() => {
                toast.error("Məhsul tapılmadı");
                navigate('/products');
            }, 1000);
            return () => clearTimeout(timer); // Clear timeout on unmount
        }
    }, [product, navigate]);
    useEffect(() => {
        // Ensure ID is valid and fetch the product
        if (id) {
            fetchProduct(Number(id));
        }
    }, [dispatch, id]);


    const addBasket = () => {
      if(product){
        const payload:ProductType = {
            ...product,
            count
        }
        if(count>=1){
          dispatch(addToBasket(payload))
          toast.success(`${product.title} added to the basket!`);
        }
        setCount(0)
      }
    };

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
            { product && (
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
                    <button className="add-to-cart" onClick={addBasket}>Add to Cart</button>
                </div>
            </div>
            
            )}
            <Footer />
        </Box>
    );
}

export default ProductDetails;
