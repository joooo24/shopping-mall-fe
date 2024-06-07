import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import { Link } from "react-router-dom";

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

    useEffect(() => {
        // 컴포넌트가 마운트될 때 error 초기화하는 액션 디스패치
        dispatch(userActions.clearError());
    }, [dispatch]);

    const register = (event) => {
        event.preventDefault();

        const { email, name, password, confirmPassword, policy } = formData;

        // 비밀번호 중복 확인
        if (password !== confirmPassword) {
            setPasswordError("비밀번호가 일치하지 않습니다");
            return;
        }

        // 이용약관에 체크 확인
        if (!policy) {
            setPolicyError(true); // 이용약관 동의 에러를 표시
            return;
        }

        // 에러 초기화
        setPasswordError("");
        setPolicyError(false);

        // FormData에 있는 값 백엔드로 넘겨주기 (+ navigate함수도 함께)
        dispatch(userActions.registerUser({ email, name, password }, navigate));
    };

    // FormData에 입력한 값 넣는 함수
    const handleChange = (event) => {
        const { id, checked, value } = event.target;

        // 콜백 함수를 사용하여 상태 업데이트 후에 다음 동작을 수행
        setFormData((prevState) => ({
            ...prevState,
            [id]: id === "policy" ? checked : value,
        }));

        // 기존 코드
        // if (id === "policy") {
        //     setFormData({ ...formData, [id]: checked });
        // } else {
        //     setFormData({ ...formData, [id]: value });
        // }
    };

    return (
        <section className="user-page">
            <div className="form-container">
                <Form onSubmit={register} className="form-box user-form">
                    <h1>회원가입</h1>
                    {error && (
                        <div>
                            <Alert variant="danger" className="error-message">
                                {error}
                            </Alert>
                        </div>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" id="name" placeholder="Enter name" onChange={handleChange} required />
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
                            isInvalid={!!passwordError}
                        />
                        <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
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
                        {policyError && <Form.Text className="text-danger">이용약관에 동의해주세요</Form.Text>}
                    </Form.Group>
                    <button type="submit" className="btn btn-submit">
                        {" "}
                        회원가입
                    </button>
                </Form>
                <div className="notice">비밀번호는 안전하게 암호화되어 저장됩니다.</div>
                <Link to="/login" className="link">
                    로그인 하기
                </Link>
            </div>
        </section>
    );
};

export default RegisterPage;
