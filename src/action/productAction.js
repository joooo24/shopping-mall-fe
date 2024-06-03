import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

// 상품 리스트
const getProductList = (query) => async (dispatch) => { };

// 상품 상세
const getProductDetail = (id) => async (dispatch) => { };

// 상품 등록
const createProduct = (formData) => async (dispatch) => {
    try {
        // 상품 등록 요청
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });

        // 서버에 상품 등록 요청
        const response = await api.post("/product", { formData });
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        // 상품 등록 성공
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });

    } catch (err) {
        // 상품 등록 실패
        dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err });
    }
};

// 상품 삭제
const deleteProduct = (id) => async (dispatch) => { };

// 상품 수정
const editProduct = (formData, id) => async (dispatch) => { };

export const productActions = {
    getProductList,
    createProduct,
    deleteProduct,
    editProduct,
    getProductDetail,
};
