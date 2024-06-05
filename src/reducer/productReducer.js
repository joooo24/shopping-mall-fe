import * as types from "../constants/product.constants";
const initialState = {
    loading: true, // 로딩 상태
    formData: null, // 상품 정보
    productList: null, // 상품리스트
    totalPageNum: 1, // 총 페이지 수
    totalItemNum: 1, // 총 데이터 수
    error: "", // 에러 메시지
};

function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // 상품 생성/조회 요청
        case types.PRODUCT_CREATE_REQUEST:
        case types.PRODUCT_GET_REQUEST:
            return { ...state, loading: true };

        // 상품 생성 성공
        case types.PRODUCT_CREATE_SUCCESS:
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

        // 상품 생성/조회 실패
        case types.PRODUCT_CREATE_FAIL:
        case types.PRODUCT_GET_FAIL:
            return { ...state, loading: false, error: payload.message };

        // 상품 정보 초기화
        case types.CLEAR_DATA:
            return { ...state, formData: null };

        default:
            return state;
    }
}
export default productReducer;
