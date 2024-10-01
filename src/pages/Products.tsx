import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { getAllProducts } from '../redux/actions/productAction'
import { ProductType } from '../assets/types/sliceTypes'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { setLoading } from '../redux/reducers/appSlice'
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
    <div>
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column', // Column for mobile/tablet
            lg: 'row', // Row for larger than 1040px
          },
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Categories Section - On top in mobile/tablet, on the left on desktop */}
        <Box
          sx={{
            flex: { xs: 'none', lg: '1' }, // No flex on mobile/tablet, flex on desktop
            maxWidth: { lg: '300px' }, // Max width for categories in desktop view
            marginBottom: { xs: '20px', lg: '0' }, // Margin at the bottom on mobile/tablet
            marginRight: { lg: '20px' }, // Margin on the right for desktop view
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
    </div>
  )
}

export default Products