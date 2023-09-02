
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        _id: "",
        items: [],
        totalQuantity: 0,
        changed: false
    },

    reducers: {
        replaceCart(state, action) {
            state._id = action.payload._id;
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;

        },

        addItemToCart(state, action) {
            const newItem = action.payload; //An object containing the PayLoad keys and values
            const existingItem = state.items.find((item) => item._id === newItem.id);
            state.totalQuantity++; //As the item will be added whether it is already in the cart or NOT
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    _id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                    image: newItem.image,
                });
            } else {
                // If item EXISTS, just make its qunatity increased by 1, rather than adding a wole new Item
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            // console.log(id)
            const existingItem = state.items.find((item) => item._id === id);
            state.totalQuantity--; //Always Decrease the total quantity as one item is Gonna be removed
            state.changed = true;
            if (existingItem.quantity === 1) {
                //Very Good Logic for removing some itme from the Array
                state.items = state.items.filter((item) => item._id !== id);
            } else {
                //If we find the Item with more than one quantity, just decrease its quantity.
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
