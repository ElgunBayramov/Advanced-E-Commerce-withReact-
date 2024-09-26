import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { getAllProducts } from '../redux/actions/productAction'
import { ProductType } from '../assets/types/sliceTypes'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { setLoading } from '../redux/reducers/appSlice'

function Products() {
    const {products} = useAppSelector((state) => state.product)
    const dispatch = useAppDispatch()
    const fetchProducts = async () => {
        dispatch(setLoading(true)); 
        try {
            await dispatch(getAllProducts()); 
        } catch (error) {
            console.error("Failed to fetch products:", error);
            
        } finally {
            dispatch(setLoading(false)); 
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []); 
    
  return (
    <div>
        <Header/>
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        {products && products.map((product:ProductType,index:number) => (
         <ProductCard key={index} product={product}/>
        ))}
    </div>
    <Footer/>
    </div>
  )
}

export default Products