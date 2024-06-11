import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 error를 초기화하는 액션 디스패치
        dispatch(userActions.clearError());
    }, [dispatch]);

    const loginWithEmail = (event) => {
        event.preventDefault();
        //이메일,패스워드를 가지고 백엔드로 보내기

        dispatch(userActions.loginWithEmail({ email, password }));
    };

    const handleGoogleLogin = async (googleData) => {
        // Google 인증 정보 처리
        // 이미 로그인한적이 있는 유저 -> 로그인 시키고 토큰 값 주기
        // 로그인한적이 없는 유저 -> 유저정보 먼저 새로 생성 -> 토큰 값 주기
        dispatch(userActions.loginWithGoogle(googleData.credential))
    };

    // 유저가 있다면?
    if (user) {
        navigate("/");
    }

    return (
        <section className="user-page">
            <div className="form-container">
                <Form className="form-box user-form" onSubmit={loginWithEmail}>
                    <h1>로그인</h1>
                    {error && (
                        <div className="error-message">
                            <Alert variant="danger">{error}</Alert>
                        </div>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>
                    <div className="button-wrap">
                        <button variant="danger" type="submit" className="btn btn-submit">
                            로그인
                        </button>
                        <p className="notice">
                            아직 계정이 없으세요?
                            <Link to="/register" className="link">
                                회원가입 하기
                            </Link>
                        </p>
                        <p>-외부 계정으로 로그인하기-</p>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => {
                                console.log('구글 로그인 실패');
                            }}
                        />
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Login;
