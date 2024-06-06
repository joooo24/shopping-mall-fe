import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = () => {

    // 스토어에서 toastMessage 상태 선택
    const { toastMessage } = useSelector((state) => state.ui);

    useEffect(() => {
        if (toastMessage) {
            const { message, status } = toastMessage;
            if (message !== "" && status !== "") {
                
                // react-toastify를 사용하여 메시지를 토스트로 표시
                toast[status](message, { theme: "colored" });
            }
        }
    }, [toastMessage]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false} // 새로운 토스트 메시지가 이전 토스트 메시지 위에 표시될지 여부
            closeOnClick // 토스트 클릭 시 닫히도록 설정
            rtl={false} // 토스트 메시지가 RTL(우측에서 왼쪽) 언어인지 여부
            pauseOnFocusLoss // 포커스를 잃었을 때 토스트 메시지가 자동으로 일시 중지
            draggable // 사용자가 토스트 메시지를 드래그하여 이동
            pauseOnHover // 마우스를 토스트 메시지 위에 올렸을 때 일시 중지
            theme="light" // 토스트 메시지의 테마를 설정
        />
    );
};

export default ToastMessage;
