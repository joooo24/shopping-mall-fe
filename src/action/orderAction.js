import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

// 주문 생성
const createOrder = (payload) => async (dispatch) => {
    try {
        dispatch({ type: types.CREATE_ORDER_REQUEST });

        const response = await api.post("/order", payload);
        if (response.status !== 200) throw new Error(response.error);

        dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response.data.orderNum });
       console.log("payloadpayloadpayload", payload)

        // order 생성 -> 카트 초기화 -> 장바구니 총 개수 업데이트
        dispatch(cartActions.getCartQty());

        // 주문 완료 페이지
        // navigate("/payment/success");
    } catch (err) {
        dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
        dispatch(commonUiActions.showToastMessage(err.error, "error"));
    }
};

// 내 주문 조회
const getOrder = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ORDER_REQUEST });

        const response = await api.get("/me");
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        dispatch({ type: types.GET_ORDER_SUCCESS, payload: response.data.orderNum });
    } catch (err) {
        dispatch({ type: types.GET_ORDER_FAIL, payload: err.error });
    }
};

// 모든 주문 조회
const getOrderList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_ORDER_LIST_REQUEST });

        const response = await api.get("/");
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data.orderNum });
    } catch (err) {
        dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: err.error });
    }
};

// 주문 상태 업데이트
const updateOrder = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_ORDER_REQUEST });

        const response = await api.put(`/order/${id}`, { status });
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: response.data.order });
        // 토스트 알림
        dispatch(commonUiActions.showToastMessage(`주문 번호 ${id}의 주문 상태가 변경되었습니다.`, "success"));
    } catch (err) {
        dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err.error });
        // 토스트 알림
        dispatch(commonUiActions.showToastMessage(err.message, "error"));
    }
};

export const orderActions = {
    createOrder,
    getOrder,
    getOrderList,
    updateOrder,
};
