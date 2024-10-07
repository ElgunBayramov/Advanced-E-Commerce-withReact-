import { Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { calculateBasket, removeProductFromBasket, setDrawer } from '../redux/reducers/basketSlice';
import { MdDelete } from 'react-icons/md';
import "../css/BasketDetails.css";
import { ProductType } from '../assets/types/sliceTypes';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function BasketDetails() {
    const { drawer, baskets,totalAmount } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();

    // Get current user from localStorage
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    // Access the current user's specific basket
    const userBasket = currentUser ? baskets[currentUser.id] || [] : [];

    const closeDrawer = () => {
        dispatch(setDrawer(false));
    };
    
    const handleDelete = (product:ProductType) => {
        if (currentUser) {
            dispatch(removeProductFromBasket({ userId: currentUser.id, productId: product.id }));
            toast.success("Məhsul silindi!")
          }
    }

    useEffect(() => {
        if (currentUser) {
          dispatch(calculateBasket({ userId: currentUser.id }));
        }
      }, [currentUser,baskets, dispatch]);

    return (
        <Drawer open={drawer} anchor="right" onClose={closeDrawer}>
            <div className="drawer-content">
                {userBasket && userBasket.length > 0 ? (
                    <>
                        {userBasket.map((basketItem: { product: ProductType, count?: number }) => {
                            // Log the product details
                            console.log("Basket Item:", basketItem);
                            console.log("userbasket:", userBasket);
                            console.log("Basket Item product image:", basketItem.product.image);
                            
                            return (
                                <div className="drawer-item" key={basketItem.product.id}>
                                    <img src={basketItem.product.image} alt={basketItem.product.title} />
                                    <div className="drawer-item-details">
                                        <p>{basketItem.product.title}</p>
                                        <p>Quantity: {basketItem.count}</p>
                                        <p>${basketItem.product.price}</p>
                                    </div>
                                    <button className="delete-button">
                                        <MdDelete onClick={() => handleDelete(basketItem.product)}/>
                                    </button>
                                </div>
                            );
                        })}
                        <div className="total-amount">
                            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                        </div>
                    </>
                ) : (
                    <p>Your basket is empty.</p>
                )}
            </div>
        </Drawer>
    );
}

export default BasketDetails;
