import * as types from "../constants/order.constants";

const initialState = {
    orderNum: "",
    // myOrder: [], // 내 주문
    orderList: [], // 주문 리스트
    selectedOrder: {}, // 선택된 주문
    totalPageNum: 1, // 페이지
    loading: false,
    error: null,
};

function orderReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.CREATE_ORDER_REQUEST:
        case types.GET_ORDER_REQUEST:
        case types.GET_ORDER_LIST_REQUEST:
        case types.UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        // 주문 생성
        case types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderNum: payload
            };
        // 주문 리스트 가져오기 (사용자)
        case types.GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: payload.data
            };
        // 주문 리스트 가져오기 (관리자)
        case types.GET_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: payload,
            };
        // 주문 업데이트
        case types.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: payload,
            };

        // 모달: 선택 된 주문
        case types.SET_SELECTED_ORDER:
            return {
                ...state, selectedOrder: payload
            };
        case types.CREATE_ORDER_FAIL:
        case types.GET_ORDER_FAIL:
        case types.GET_ORDER_LIST_FAIL:
        case types.UPDATE_ORDER_FAIL:

            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}

export default orderReducer;
