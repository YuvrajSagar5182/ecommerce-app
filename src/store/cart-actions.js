//action creators

import { cartActions } from './cart-slice';
import { checkOut, fetchCartData, updateCartData } from '../utils/FetchData';

const mainUrl = 'https://ecommerce-backend-yuvi.vercel.app'; //The Deployed Backend URL


export const fetchForCartData = (id) => {
    return async (dispatch) => {

        const fetchData = async (ID) => {
            const response = await fetchCartData(ID);
            return response;
        };

        try {
            if (!id) {
                const onceVisited = localStorage.getItem("new_user");
                const cartData = await fetchData(onceVisited);
                // console.log("CartData", cartData);

                if (!cartData.status) {
                    console.log("Cart not found \n", cartData.message);
                    return;
                }
                dispatch(
                    cartActions.replaceCart(
                        {
                            // Adding Item into the Cart if we find any , else setting it to empty [rather than undefined]
                            _id: cartData.cart._id,
                            items: cartData.cart.items || [{}],
                            totalQuantity: cartData?.cart.totalQuantity,
                        })
                );
                return;
            }
            const cartData = await fetchData(id);
            // console.log("CartData", cartData);

            if (!cartData.status) {
                console.log("Cart not found \n", cartData.message);
                return;
            }
            dispatch(
                cartActions.replaceCart(
                    {
                        // Adding Item into the Cart if we find any , else setting it to empty [rather than undefined]
                        _id: cartData.cart._id,
                        items: cartData.cart?.items || [{}],
                        totalQuantity: cartData?.cart.totalQuantity,
                    })
            );

        } catch (error) {
            console.log(error.message);
        }
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {

        const sendRequest = async () => {
            await updateCartData(cart)

        };

        try {
            await sendRequest();
            // console.log("Sent the Cart Data Succeesfully");

        } catch (error) {
            console.log(error);
        }
    };
};

export const registerUser = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${mainUrl}/register`);

            const data = await response.json();

            if (!data.status) {
                console.log("Cart not found \n", data.message);
                return;
            }
            // console.log('Data from Register', data)

            dispatch(
                cartActions.replaceCart(
                    {
                        // Adding Item into the Cart if we find any , else setting it to empty [rather than undefined]
                        _id: data.cart._id,
                        items: data.cart.items,
                        totalQuantity: data.cart.totalQuantity,
                        changed: false
                    })
            )
            return { user: data.user };
        } catch (error) {
            console.log(error.message);
        }
    }
}


export const checkoutUser = (formData, userID) => {
    return async (dispatch) => {

        const response = (await checkOut(formData, userID));
        // console.log(response);
        if (response) {
            dispatch(
                cartActions.replaceCart(
                    {
                        // Adding Item into the Cart if we find any , else setting it to empty [rather than undefined]
                        _id: response.cart._id,
                        items: response.cart.items,
                        totalQuantity: response.cart.totalQuantity,
                        changed: false
                    })
            )
        }
        return response
    }
}