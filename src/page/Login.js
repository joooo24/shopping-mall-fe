import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import "../style/users.style.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const error = useSelector((state) => state.user.error);

    const loginWithEmail = (event) => {
        event.preventDefault();
        //이메일,패스워드를 가지고 백엔드로 보내기

        dispatch(userActions.loginWithEmail({ email, password }))
    };

    const handleGoogleLogin = async (googleData) => {
        // 구글로 로그인 하기
    };

    // 유저가 있다면?
    if (user) {
        navigate("/");
    }

    return (
        <div className="form-container">
            {error && (
                <div className="error-message">
                    <Alert variant="danger">{error}</Alert>
                </div>
            )}
            <Form className="form-box" onSubmit={loginWithEmail}>
                <h1>로그인</h1>
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
                        아직 계정이 없으세요?<Link to="/register" className="link">회원가입 하기</Link>
                    </p>
                    <p>-외부 계정으로 로그인하기-</p>
                    <p className="display-center"></p>
                </div>
            </Form>
        </div>
    );
};

export default Login;
