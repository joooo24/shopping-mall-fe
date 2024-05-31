import * as types from "../constants/user.constants";

const initialState = {
	loading: true, // 로딩 상태
	user: null, // 사용자 정보
	error: "" // 에러 메시지
};

function userReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		// 로그인, 회원가입 요청 
		case types.REGISTER_USER_REQUEST:
		case types.LOGIN_REQUEST:
		case types.LOGIN_WITH_TOKEN_REQUEST:
			return { ...state, loading: true };

		// 로그인(이메일/토큰) 성공 
		case types.LOGIN_SUCCESS:
		case types.LOGIN_WITH_TOKEN_SUCCESS:
			return { ...state, loading: false, user: payload.user };

		// 로그인, 회원가입 실패 
		case types.LOGIN_FAIL:
		case types.REGISTER_USER_FAIL:
			return { ...state, loading: false, error: payload.message };

		// 토큰 로그인 실패
		case types.LOGIN_WITH_TOKEN_FAIL:
			return { ...state, loading: false };

		default:
			return state;
	}
}

export default userReducer;
