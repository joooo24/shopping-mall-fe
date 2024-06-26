import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const PaymentForm = ({
    handleInputFocus,
    cardValue,
    handlePaymentInfoChange,
}) => {
    return (
        <div className="display-flex">
            <Cards
                cvc={cardValue.cvc}
                expiry={cardValue.expiry}
                focused={cardValue.focus}
                name={cardValue.name}
                number={cardValue.number}
            />
            <div className="form-area">
                <Form.Control
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    onChange={handlePaymentInfoChange}
                    onFocus={handleInputFocus}
                    required
                    maxLength={16}
                    minLength={16}
                    value={cardValue.number}
                />

                <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handlePaymentInfoChange}
                    onFocus={handleInputFocus}
                    required
                    value={cardValue.name}
                />
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            name="expiry"
                            placeholder="MM/DD"
                            onChange={handlePaymentInfoChange}
                            onFocus={handleInputFocus}
                            required
                            value={cardValue.expiry}
                            maxLength={7}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            onChange={handlePaymentInfoChange}
                            onFocus={handleInputFocus}
                            required
                            maxLength={3}
                            value={cardValue.cvc}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PaymentForm;
