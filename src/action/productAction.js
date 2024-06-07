import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

// 상품 리스트
const getProductList = (query) => async (dispatch) => {
    try {
        // 상품 리스트 요청
        dispatch({ type: types.PRODUCT_GET_REQUEST });

        // 서버에 상품 리스트 요청
        const response = await api.get("/product",
            { params: { ...query } }
        );
        
        if (response.status !== 200) {
            throw new Error(response.data.error);
        }

        // 상품 리스트 요청 성공
        dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });

    } catch (err) {
        // 상품 리스트 요청 실패
        dispatch({ type: types.PRODUCT_GET_FAIL, payload: err });
    }
};

// 상품 상세
const getProductDetail = (id) => async (dispatch) => { };

// 상품 등록
const createProduct = (formData) => async (dispatch) => {
    try {
        // 상품 등록 요청
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });

        // 서버에 상품 등록 요청
        const response = await api.post("/product", formData);

        if (response.status !== 200) {
            throw new Error(response.data.error);
        }

        // 상품 등록 성공
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품 등록이 완료되었습니다", "success"));

    } catch (err) {
        // 상품 등록 실패
        dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품 등록이 실패했습니다", "error"));
    }
};

// 상품 수정
const editProduct = (formData, id) => async (dispatch) => {
    try {
        // 상품 수정 요청
        dispatch({ type: types.PRODUCT_EDIT_REQUEST });

        // 서버에 상품 수정 요청
        const response = await api.put(`/product/${id}`, formData);

        if (response.status !== 200) {
            throw new Error(response.data.error);
        }

        // 상품 수정 성공
        dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: response.data.data });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품이 수정되었습니다", "success"));

        // (업데이트 된) 상품 리스트 불러오기
        dispatch(getProductList({ page: 1, name: "" }))

    } catch (err) {
        // 상품 수정 실패
        dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: err });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품 수정 중 오류가 발생했습니다", "error"));
    }
};

// 상품 삭제 (논리 삭제)
const deleteProduct = (id) => async (dispatch) => {

    try {
        // 상품 삭제 요청
        dispatch({ type: types.PRODUCT_DELETE_REQUEST });

        // 서버에 상품 삭제 요청
        const response = await api.delete(`/product/${id}`);

        if (response.status !== 200) {
            throw new Error(response.data.error);
        }

        // 상품 삭제 성공
        dispatch({ type: types.PRODUCT_DELETE_SUCCESS });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품이 삭제되었습니다", "success"));

    } catch (err) {
        // 상품 삭제 실패
        dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: err });

        // 토스트 알림
        dispatch(commonUiActions.showToastMessage("상품 삭제 중 오류가 발생했습니다", "error"));
    }
};
export const productActions = {
    getProductList,
    createProduct,
    deleteProduct,
    editProduct,
    getProductDetail,
};
