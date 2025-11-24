import React, { useEffect, useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setLoading } from '../redux/reducers/appSlice';
import { getAllCategories, getAllProducts, getProductsByCategoryName } from '../redux/actions/productAction';
import { toast } from 'react-toastify';

function Category() {
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector((state) => state.product)
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const fetchCategories = async () => {
    try {
      dispatch(setLoading(true)); 
        await dispatch(getAllCategories()); 
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        
    } finally {
        dispatch(setLoading(false)); 
    }
};
  useEffect(() => {
    fetchCategories()
  }, [])
   
  const handleCategory = async (e:React.ChangeEvent<HTMLInputElement>,categoryName:string) => {
try {
  if (e.target.checked) {
    setSelectedCategory(categoryName)
    dispatch(setLoading(true)); 
   await dispatch(getProductsByCategoryName(categoryName));
  }
  else{
    setSelectedCategory(null)
  await dispatch(getAllProducts())
  }
} catch (error) {
 toast.error("Failed to fetch products for the selected category.");
  
}
finally {
  dispatch(setLoading(false)); 
}
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '300px' }, 
        padding: { xs: '10px', sm: '20px' }, 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        margin: 'auto', 
        marginBottom: '20px', 
        backgroundColor: 'background.paper',
      }}
    >
      {/* Category Heading */}
      <Typography 
        variant="h6" 
        sx={{ textAlign: 'center', marginBottom: '16px', color: 'text.primary' }} 
      >
        All Categories
      </Typography>

      {/* Category Checkboxes */}
      <FormGroup>
        {
          categories && categories.map((category:string,index:number) => (
            <FormControlLabel
            key={index}
            control={<Checkbox sx={{ color: 'primary.main' }} onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleCategory(e,category)}
            checked={selectedCategory === category} 
            />}
            label={category}
            sx={{ color: 'text.primary' }}
          />
          ))
        }
       
      </FormGroup>
    </Box>
  );
}

export default Category;
