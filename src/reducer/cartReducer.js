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
        // 장바구니 관련 요청
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
        case types.EMPTY_CART_REQUEST:
        case types.DELETE_CART_ITEM_REQUEST:
        case types.UPDATE_CART_ITEM_REQUEST:
            return { ...state, loading: true };

        // 장바구니 담기 성공
        case types.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItemQty: payload, // TODO
                // cartItemQty: state.cartItemQty + payload.qty,
            };

        // 장바구니 목록 가져오기 성공
        case types.GET_CART_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: payload.data.items,
                totalPrice: payload.data.items.reduce((total, item) => (total += item.productId.price * item.qty), 0),
            };
            
        // 장바구니 모두 비우기 성공
        case types.EMPTY_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: [], // 장바구니 비우기
                cartItemQty: 0,
                totalPrice: 0,
            };

        // 장바구니 아이템 삭제 성공
        case types.DELETE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: state.cartList.filter((item) => item._id !== payload), // 삭제된 아이템 제외
                totalPrice: state.cartList.reduce((total, item) => total + item.productId.price * item.qty, 0),
            };

        // 장바구니 수량 업데이트 성공
        case types.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: state.cartList.map((item) => {
                    if (item._id === payload.id) {
                        // 수정된 아이템의 수량만 변경
                        return { ...item, qty: payload.qty };
                    }
                    return item;
                }),
                totalPrice: state.cartList.reduce((total, item) => total + item.productId.price * item.qty, 0),
            };

        // 장바구니 관련 요청 실패
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
        case types.EMPTY_CART_FAIL:
        case types.DELETE_CART_ITEM_FAIL:
        case types.UPDATE_CART_ITEM_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}
export default cartReducer;
