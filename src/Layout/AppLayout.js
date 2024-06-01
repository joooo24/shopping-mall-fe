import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { commonUiActions } from "../action/commonUiAction";

const AppLayout = ({ children }) => {
    // 현재 URL의 정보
    const location = useLocation();
    const dispatch = useDispatch();

    // 사용자 정보 (Redux 스토어로부터 user 상태를 선택)
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        // 토근으로 자동 로그인
        dispatch(userActions.loginWithToken());
    }, []);

    return (
        <div>
            <ToastMessage />
            {location.pathname.includes("admin") ? (
                <Row className="vh-100">
                    <Col xs={12} md={3} className="sidebar mobile-sidebar">
                        <Sidebar />
                    </Col>
                    <Col xs={12} md={9}>
                        {children}
                    </Col>
                </Row>
            ) : (
                <>
                    <Navbar user={user} />
                    {children}
                </>
            )}
        </div>
    );
};

export default AppLayout;
