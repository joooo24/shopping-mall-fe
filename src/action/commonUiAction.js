import * as types from "../constants/commonUI.constants";

// message, status값을 받는 토스트 action
const showToastMessage = (message, status) => async (dispatch) => {
    dispatch({ type: types.SET_TOAST_MESSAGE, payload: { message, status } }); 
};

export const commonUiActions = {
    showToastMessage,
};