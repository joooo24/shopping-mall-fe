import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from './commonUiAction';

// 토큰사용 로그인 액션
const loginWithToken = () => async (dispatch) => {
    try {
        // 토큰 로그인 요청 (-> 로딩 상태 표시)
        dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });


        // 서버에 토큰 로그인 요청
        const response = await api.get("/user/me");
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        // 토근 로그인 성공
        dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });

    } catch (err) {
        dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    }
};

// 이메일 로그인 액션
const loginWithEmail = ({ email, password }) => async (dispatch) => {
    try {
        // 로그인 요청 (-> 로딩 상태 표시)
        dispatch({ type: types.LOGIN_REQUEST })

        // 서버에 로그인 요청
        const response = await api.post("/auth/login", { email, password });
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        // 세션 스토리지에 토큰을 저장
        sessionStorage.setItem("token", response.data.token);

        // 헤더에 토큰 값 저장
        // api.defaults.headers["Authorization"] = "Bearer " + response.data.token;

        // 로그인 성공
        dispatch({ type: types.LOGIN_SUCCESS, payload: response.data })

    } catch (err) {
        // 로그인 실패
        dispatch({ type: types.LOGIN_FAIL, payload: err });
        dispatch(logout())
    }
};

// 로그아웃 액션
const logout = () => async (dispatch) => { };

// Google 토큰 로그인 액션
const loginWithGoogle = (token) => async (dispatch) => { };

// 회원가입 액션
const registerUser = ({ email, name, password }, navigate) => async (dispatch) => {
    try {
        // 회원가입 시작 (-> 로딩 상태 표시)
        dispatch({ type: types.REGISTER_USER_REQUEST });

        // 서버에 회원가입 요청
        const response = await api.post("/user", { email, name, password });
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        // 회원가입 성공
        dispatch({ type: types.REGISTER_USER_SUCCESS });

        // 토스트 띄우고 리다이렉트
        dispatch(commonUiActions.showToastMessage("회원가입을 완료했습니다!", "success"));
        navigate("/login")

    } catch (err) {
        // 회원가입 실패
        dispatch({ type: types.REGISTER_USER_FAIL, payload: err });
    }
};

// 사용자 관련 액션 모음
export const userActions = {
    loginWithToken,
    loginWithEmail,
    logout,
    loginWithGoogle,
    registerUser,
};