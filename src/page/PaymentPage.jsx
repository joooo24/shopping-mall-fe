import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OrderReceipt from "../component/OrderReceipt";
import PaymentForm from "../component/PaymentForm";
import "../style/paymentPage.style.css";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../action/orderAction";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { commonUiActions } from "../action/commonUiAction";
import { cc_expires_format } from "../utils/number";

const PaymentPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [firstLoading, setFirstLoading] = useState(true);
    const {  cartList, totalPrice, cartItemQty, loading, error } = useSelector((state) => state.cart);

    // 배송 정보
    const [shipInfo, setShipInfo] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        address: "",
        city: "",
        zip: "",
    });

    // 카드 정보
    const [cardValue, setCardValue] = useState({
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    });

    //맨처음 페이지 로딩할때는 넘어가고  오더번호를 받으면 성공페이지로 넘어가기

    const handleSubmit = (event) => {
        event.preventDefault();

        const { firstName, lastName, contact, address, city, zip } = shipInfo;

        // 백엔드로 보낼 주문 정보
        const data = {
            totalPrice,
            shipTo: { address, city, zip },
            contact: { firstName, lastName, contact },
            orderList:
                // 주문 정보는 카트 정보에서 가져옴
                cartList.map((item) => {
                    return {
                        productId: item.productId._id,
                        price: item.productId.price,
                        qty: item.qty,
                        option: item.option,
                    };
                }),
        };

        // 오더 생성하기
        dispatch(orderActions.createOrder(data));
    };

    // 배송 정보(shipInfo) 값 넣기
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setShipInfo({ ...shipInfo, [name]: value });
    };

    // 크레딧카드 카드 정보 값 넣기
    const handlePaymentInfoChange = (event) => {
        const { name, value } = event.target;

        // 카드 유효 기간 유효성 검사
        if (name === "expiry") {
            let newValue = cc_expires_format(value);
            setCardValue({ ...cardValue, [name]: newValue });
            return;
        }
        setCardValue({ ...cardValue, [name]: value });
    };

    // 크레딧카드 인풋 포커스
    const handleInputFocus = (e) => {
        setCardValue({ ...cardValue, focus: e.target.name });
    };

    //카트에 아이템이 없다면 다시 카트페이지로 돌아가기 (결제할 아이템이 없으니 결제페이지로 가면 안됌)
    if (cartList.length === 0) {
        navigate("/cart");
    }
    return (
        <Container>
            <Row>
                <Col lg={7}>
                    <div>
                        <div className="form-container">
                            <Form className="form-box" onSubmit={handleSubmit}>
                                <h2>배송 주소</h2>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="lastName">
                                        <Form.Label>성</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={handleFormChange}
                                            required
                                            name="lastName"
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="firstName">
                                        <Form.Label>이름</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={handleFormChange}
                                            required
                                            name="firstName"
                                        />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>연락처</Form.Label>
                                    <Form.Control
                                        placeholder="010-xxx-xxxxx"
                                        onChange={handleFormChange}
                                        required
                                        name="contact"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>주소</Form.Label>
                                    <Form.Control
                                        placeholder="Apartment, studio, or floor"
                                        onChange={handleFormChange}
                                        required
                                        name="address"
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>시/도</Form.Label>
                                        <Form.Control onChange={handleFormChange} required name="city" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>우편번호</Form.Label>
                                        <Form.Control onChange={handleFormChange} required name="zip" />
                                    </Form.Group>
                                </Row>

                                <div className="mobile-receipt-area">
                                    <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                                </div>

                                <div>
                                    <h2 className="payment-title">결제 정보</h2>
                                    <PaymentForm
                                        cardValue={cardValue}
                                        handleInputFocus={handleInputFocus}
                                        handlePaymentInfoChange={handlePaymentInfoChange}
                                    />
                                </div>

                                <button className="btn btn-submit" type="submit">
                                    결제하기
                                </button>
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col lg={5} className="receipt-area">
                    <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
