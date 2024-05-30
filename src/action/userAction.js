import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

// 토큰사용 로그인 액션
const loginWithToken = () => async (dispatch) => { };

// 이메일/비밀번호 로그인 액션
const loginWithEmail = (payload) => async (dispatch) => { };

// 로그아웃 액션
const logout = () => async (dispatch) => { };

// Google 토큰 로그인 액션
const loginWithGoogle = (token) => async (dispatch) => { };

// 회원가입 액션
const registerUser = ({ email, name, password }) => async (dispatch) => {
    try {
        // 회원가입 요청
        dispatch({ type: types.REGISTER_USER_REQUEST });

        // 서버에 회원가입 요청
        const response = await api.post("/users", { email, name, password });

        // 실패한다면?
        if (response.status !== 200) {
            throw new Error(response.error);
        }

        // 회원가입 성공
        dispatch({ type: types.REGISTER_USER_SUCCESS });

    } catch (err) {
        // 회원가입 성공
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
