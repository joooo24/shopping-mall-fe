import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
const addToCart =
    ({ id, size }) =>
    async (dispatch) => {
        try {
            // 장바구니에 아이템 담기 요청
            dispatch({ type: types.ADD_TO_CART_REQUEST });

            // 서버에 장바구니에 아이템 담기 요청
            const response = await api.post("/cart", { id, size, qty: 1 });
            if (response.status !== 200) {
                throw new Error(response.error);
            }
            // console.log("### cart response", response)

            // 장바구니에 아이템 담기 요청 성공
            dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
        } catch (err) {
            dispatch({ type: types.ADD_TO_CART_FAIL });
        }
    };

const getCartList = () => async (dispatch) => {};
const deleteCartItem = (id) => async (dispatch) => {};

const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};
export const cartActions = {
    addToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};
