import { Typography, Rating, Box } from "@mui/material";
import { ProductType } from '../assets/types/sliceTypes';
import "../css/ProductCard.css"
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id,title, price, image, rating } = product;
  const navigate = useNavigate()
  return (
    <div className="product-card" key={id}>
    <div className="product-image-wrapper">
      <img src={image} alt={title} className="product-image" />
    </div>
    <div className="product-details">
      <h3 className="product-title">{title}</h3>
      {/* <p className="product-description">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p> */}
      <p className="product-price">${price.toFixed(2)}</p>
      
      {/* Rating and Review Count */}
      <Box display="flex" alignItems="center">
        <Rating value={rating.rate} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
          ({rating.count} reviews)
        </Typography>
      </Box>

      <button className="details-button" onClick={()=> navigate("/product-details/" + id)}>
        View Details
      </button>
    </div>
  </div>
  );
};

export default ProductCard;
