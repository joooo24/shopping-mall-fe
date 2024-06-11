import * as types from "../constants/order.constants";

const initialState = {
    loading: false,
    orderNum: "",
    myOrder: [], // 내 주문
    orderList: [], // 주문 리스트
    selectedOrder: null,
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
        case types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderNum: payload
            };
        case types.GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                myOrder: payload
            };
        case types.GET_ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: payload,
            };
        case types.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: payload,
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
