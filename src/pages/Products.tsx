import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { getAllProducts } from '../redux/actions/productAction'
import { ProductType } from '../assets/types/sliceTypes'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { setLoading } from '../redux/reducers/productSlice'
import Category from '../components/Category'
import { Box } from '@mui/material'

function Products() {
    const {products} = useAppSelector((state) => state.product)
    const dispatch = useAppDispatch()
    const fetchProducts = async () => {
      try {
          dispatch(setLoading(true)); 
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
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // Ensure the container takes at least 100% of the viewport height
    }}
  >
    <Header />

    <Box
      sx={{
        flex: '1', // Ensure this section takes up the remaining space
        display: 'flex',
        flexDirection: {
          xs: 'column', // Column for mobile/tablet
          lg: 'row', // Row for larger than 1040px
        },
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Categories Section */}
      <Box
        sx={{
          flex: { xs: 'none', lg: '1' },
          maxWidth: { lg: '300px' },
          marginBottom: { xs: '20px', lg: '0' },
          marginRight: { lg: '20px' },
        }}
      >
        <Category />
      </Box>

      {/* Products Section */}
      <Box
        sx={{
          flex: '3',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {products &&
          products.map((product: ProductType, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
      </Box>
    </Box>

    <Footer />
  </Box>
  )
}

export default Products