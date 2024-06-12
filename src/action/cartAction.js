import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

// 장바구니 아이템 추가
const addToCart =
    ({ id, option, qty }) =>
        async (dispatch) => {
            try {
                // 장바구니에 아이템 추가 요청
                dispatch({ type: types.ADD_TO_CART_REQUEST });

                // 서버에 장바구니에 아이템 추가 요청
                const response = await api.post("/cart", { productId: id, option, qty });
                if (response.status !== 200) {
                    throw new Error(response.error);
                }

                // 장바구니에 아이템 추가 요청 성공
                dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });

                // 장바구니 총 수량
                dispatch(cartActions.getCartQty())

                // 토스트 알림
                dispatch(commonUiActions.showToastMessage("상품을 장바구니에 담았습니다", "success"));
            } catch (err) {
                dispatch({ type: types.ADD_TO_CART_FAIL, payload: err.error });

                // 토스트 알림
                dispatch(commonUiActions.showToastMessage(err.message, "error"));
            }
        };

// 장바구니 아이템 가져오기
const getCartList = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CART_LIST_REQUEST });

        const response = await api.get("/cart");
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data });
    } catch (err) {
        dispatch({ type: types.GET_CART_LIST_FAIL, payload: err.error });
    }
};

// 장바구니 아이템 삭제
const deleteCartItem = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
        const response = await api.delete(`/cart/${id}`);
        if (response.status !== 200) throw new Error(response.error);

        dispatch({
            type: types.DELETE_CART_ITEM_SUCCESS,
            payload: response.data.cartItemQty,
        });
        dispatch(commonUiActions.showToastMessage("장바구니 아이템을 삭제했습니다", "success"));
        dispatch(getCartList());
    } catch (error) {
        dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
        dispatch(commonUiActions.showToastMessage(error, "error"));
    }
};

// 장바구니 아이템 수량 수정
const updateQty = (id, qty) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
        const response = await api.put(`/cart/${id}`, { qty });
        if (response.status !== 200) {
            throw new Error(response.error);
        }
        dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: { id, qty } });
        dispatch(commonUiActions.showToastMessage("장바구니 아이템 수량을 수정했습니다", "success"));
    } catch (err) {
        dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err.error });
        dispatch(commonUiActions.showToastMessage(err.message, "error"));
    }
};

// 장바구니 아이템 총 수량 가져오기
const getCartQty = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CART_QTY_REQUEST });
        const response = await api.get("/cart/qty");
        if (response.status !== 200) {
            throw new Error(response.error);
        }
        dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
    } catch (err) {
        dispatch({ type: types.GET_CART_QTY_FAIL, payload: err.message });
        // 로그인 안했을 때 에러메시지 떠서 주석
        // dispatch(commonUiActions.showToastMessage(err.message, "error"));
    }
};

export const cartActions = {
    addToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};