import * as types from "../constants/cart.constants";
import { LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGOUT } from "../constants/user.constants";

const initialState = {
    loading: true, // 로딩 상태
    error: "", // 에러 메시지
    cartList: [], // 장바구니 리스트
    cartItemQty: 0, // 장바구니에 담긴 수량
    totalPrice: 0, // 총 합계
};

function cartReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // 장바구니 담기 요청
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
            return { ...state, loading: true };

        // 장바구니 담기 성공
        case types.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItemQty: state.cartItemQty + 1,
            };

        case types.GET_CART_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: payload.data.items,
                totalPrice: payload.data.items.reduce((total, item) => (total += item.productId.price * item.qty), 0),
            };

        // 장바구니 담기 실패
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}
export default cartReducer;
