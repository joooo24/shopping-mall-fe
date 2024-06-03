import * as types from "../constants/product.constants";
const initialState = {
    loading: true, // 로딩 상태
    formData: null, // 상품 정보
    error: "", // 에러 메시지
};

function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // 상품 생성 요청
        case types.PRODUCT_CREATE_REQUEST:
            return { ...state, loading: true };

        // 상품 생성 성공
        case types.PRODUCT_CREATE_SUCCESS:
            return { ...state, loading: false, formData: payload.formData };

        // 상품 생성 실패
        case types.PRODUCT_CREATE_FAIL:
            return { ...state, loading: false, error: payload.message };

        // 상품 정보 초기화
        case types.CLEAR_DATA:
            return { ...state, formData: null };

        default:
            return state;
    }
}
export default productReducer;
