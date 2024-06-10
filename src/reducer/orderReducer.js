import * as types from "../constants/order.constants";

const initialState = {
    loading: false,
    order: null,
    orderNum: "",
    myOrderList: [],
    orderList: [],
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
                orderNum: payload,
            };
        case types.GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                myOrderList: payload,
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
