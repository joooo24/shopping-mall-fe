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
        case LOGOUT: {
            return { ...state, cartItemQty: 0 };
        }
        // 요청 시도
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
        case types.DELETE_CART_ITEM_REQUEST:
        case types.UPDATE_CART_ITEM_REQUEST:
        case types.GET_CART_QTY_REQUEST:
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
                cartList: payload.data.items,
                totalPrice: payload.data.items.reduce((total, item) => (total += item.productId.price * item.qty), 0),
            };

        // 장바구니 아이템 수량 변경 성공
        case types.UPDATE_CART_ITEM_SUCCESS:
            const { id, qty } = payload; // payload에서 id와 qty를 추출

            // 기존 아이템에서 qty를 업데이트한 새로운 아이템을 생성
            const updatedCartList = state.cartList.map(item =>
                item._id === id ? { ...item, qty } : item
            );

            return {
                ...state,
                loading: false,
                cartList: updatedCartList, // 장바구니 아이템 리스트를 업데이트한 리스트로 교체
                totalPrice: updatedCartList.reduce(
                    (total, item) => (total += item.productId.price * item.qty),
                    0
                ), // 총 가격 재계산
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
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}
export default cartReducer;