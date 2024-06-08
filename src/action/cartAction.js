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
            const response = await api.post("/cart", { productId: id, size, qty: 1 });
            if (response.status !== 200) {
                throw new Error(response.error);
            }

            // 장바구니에 아이템 담기 요청 성공
            dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });

            // 토스트 알림
            dispatch(commonUiActions.showToastMessage("상품을 장바구니에 담았습니다", "success"));
        } catch (err) {
            dispatch({ type: types.ADD_TO_CART_FAIL, payload: err.error });

            // 토스트 알림
            dispatch(
                commonUiActions.showToastMessage(
                    `일시적인 문제로 상품이 장바구니에 담기지 않았습니다.
                    다시 시도해주시기 바랍니다.`,
                    "error"
                )
            );
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
