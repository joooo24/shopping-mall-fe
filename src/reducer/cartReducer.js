import * as types from "../constants/cart.constants";
import { LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGOUT } from "../constants/user.constants";

const initialState = {
    loading: true, // 로딩 상태
    error: "", // 에러 메시지
    cartId: "", // 장바구니 아이디
    cartList: [], // 장바구니 리스트
    cartItemQty: 0, // 장바구니에 담긴 수량
    totalPrice: 0, // 총 합계
};

function cartReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGOUT: {
            return { ...state, cartItemCount: 0 };
        }
        // 요청 시도
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
        case types.DELETE_CART_ITEM_REQUEST:
        case types.UPDATE_CART_ITEM_REQUEST:
        case types.GET_CART_QTY_REQUEST:
        case types.EMPTY_CART_REQUEST:
            return { ...state, loading: true };

        // 장바구니 아이템 추가/삭제 성공
        case types.ADD_TO_CART_SUCCESS:
        case types.DELETE_CART_ITEM_SUCCESS:
            return { ...state, loading: false, cartItemQty: payload };

        // 장바구니 목록 가져오기 성공
        case types.GET_CART_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                cartId: payload.data._id,
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

        // 장바구니 아이템 수량 변경 성공
        case types.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: payload,
                totalPrice: payload.reduce(
                    (total, item) => (total += item.productId.price * item.qty),
                    0
                ),
            };

        // 장바구니 총 수량 가져오기
        case types.GET_CART_QTY_SUCCESS:
            return {
                ...state,
                cartItemQty: action.payload,
                loading: false,
            };

        // 요청 실패
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
        case types.DELETE_CART_ITEM_FAIL:
        case types.UPDATE_CART_ITEM_FAIL:
        case types.GET_CART_QTY_FAIL:
        case types.EMPTY_CART_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}
export default cartReducer;
