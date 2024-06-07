import * as types from "../constants/product.constants";
const initialState = {
    loading: true, // 로딩 상태
    formData: null, // 상품 정보
    productList: null, // 상품리스트
    totalPageNum: 1, // 총 페이지 수
    totalItemNum: 1, // 총 데이터 수
    error: "", // 에러 메시지
    selectedProduct: null,
    productDetail: null,
};

function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // 상품 생성/조회/수정/삭제/상세 요청
        case types.PRODUCT_CREATE_REQUEST:
        case types.PRODUCT_GET_REQUEST:
        case types.PRODUCT_EDIT_REQUEST:
        case types.PRODUCT_DELETE_REQUEST:
        case types.GET_PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true };

        // 상품 생성/수정/삭제 성공
        case types.PRODUCT_CREATE_SUCCESS:
        case types.PRODUCT_EDIT_SUCCESS:
        case types.PRODUCT_DELETE_SUCCESS:
            return { ...state, loading: false };

        // 상품 조회 성공
        case types.PRODUCT_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                productList: payload.data,
                totalPageNum: payload.totalPageNum,
                totalItemNum: payload.totalItemNum
            };

        // 상품 상세 조회 성공
        case types.GET_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetail: payload.data,
            };

        // 상품 생성/조회/수정/삭제/상세 실패
        case types.PRODUCT_CREATE_FAIL:
        case types.PRODUCT_GET_FAIL:
        case types.PRODUCT_EDIT_FAIL:
        case types.PRODUCT_DELETE_FAIL:
        case types.GET_PRODUCT_DETAIL_FAIL:
            return { ...state, loading: false, error: payload.message };

        // 선택된 상품
        case types.SET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: payload }

        // 상품 정보 초기화
        case types.CLEAR_DATA:
            return { ...state, formData: null };

        default:
            return state;
    }
}
export default productReducer;
