import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import commonUiReducer from "./commonUIReducer";
import orderReducer from "./orderReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        ui: commonUiReducer, // 토스트 리듀서
        order: orderReducer,
    },
});
export default store;
