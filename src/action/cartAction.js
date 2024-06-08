import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

// 장바구니 아이템 추가
const addToCart =
    ({ id, size, qty }) =>
    async (dispatch) => {
        try {
            // 장바구니에 아이템 추가 요청
            dispatch({ type: types.ADD_TO_CART_REQUEST });

            // 서버에 장바구니에 아이템 추가 요청
            const response = await api.post("/cart", { productId: id, size, qty });
            if (response.status !== 200) {
                throw new Error(response.error);
            }

            // 장바구니에 아이템 추가 요청 성공
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
const deleteCartItem = (id) => async (dispatch) => {};

// 장바구니 아이템 수량 수정
const updateQty = (id, value) => async (dispatch) => {};

// 장바구니 아이템 수량 가져오기
const getCartQty = () => async (dispatch) => {};

export const cartActions = {
    addToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};
