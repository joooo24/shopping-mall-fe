import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import { Link } from "react-router-dom";
import "../style/users.style.css";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        policy: false,
    });
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");
    const [policyError, setPolicyError] = useState(false);
    const error = useSelector((state) => state.user.error);

    const register = (event) => {

        event.preventDefault();

        const { email, name, password, confirmPassword, policy } = formData;

        // 비번 중복확인 일치하는지 확인
        if (password !== confirmPassword) {
            setPasswordError("비밀번호가 일치하지 않습니다");
            return;
        }
        // 이용약관에 체크했는지 확인
        if (!policy) {
            setPolicyError(true); // 이용약관 동의 에러를 표시
            return;
        }

        // 에러 초기화
        setPasswordError("");
        setPolicyError(false);

        // FormData에 있는 값을 가지고 백엔드로 넘겨주기
        dispatch(userActions.registerUser({ email, name, password }))

        // 성공 후 로그인 페이지로 넘어가기
        navigate('/login');
    };

    const handleChange = (event) => {
        event.preventDefault();

        // 값을 읽어서 FormData에 넣어주기
        const { id, value, checked } = event.target;
        if (id === "policy") {
            setFormData({ ...formData, [id]: checked });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    return (
        <div className="form-container">
            {error && (
                <div>
                    <Alert variant="danger" className="error-message">
                        {error}
                    </Alert>
                </div>
            )}
            <Form onSubmit={register} className="form-box">
                <h1>회원가입</h1>
                <Form.Group className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        isInvalid={passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="이용약관에 동의합니다"
                        id="policy"
                        onChange={handleChange}
                        isInvalid={policyError}
                        checked={formData.policy}
                    />
                    {policyError && (
                        <Form.Text className="text-danger">
                            이용약관에 동의해주세요
                        </Form.Text>
                    )}
                </Form.Group>
                <button variant="danger" type="submit" className="btn btn-submit">
                    회원가입
                </button>
            </Form>
            <div className="notice">비밀번호는 안전하게 암호화되어 저장됩니다.</div>
            <Link to="/login" className="link">로그인 하기</Link>
        </div>
    );
};

export default RegisterPage;
