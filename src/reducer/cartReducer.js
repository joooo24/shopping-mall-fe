import * as types from "../constants/cart.constants";
import { LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGOUT } from "../constants/user.constants";

const initialState = {
    loading: true, // 로딩 상태
    user: null, // 사용자 정보
    error: "", // 에러 메시지
    cart: null, // 장바구니
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
        case types.GET_CART_LIST_SUCCESS:
            return { ...state, loading: false, cart: payload.data };

        // 장바구니 담기 실패
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
            return { ...state, loading: false, error: payload.message };

        default:
            return state;
    }
}
export default cartReducer;
