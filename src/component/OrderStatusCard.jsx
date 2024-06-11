import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ myOrder }) => {
    console.log(myOrder)
    return (
        <div>
            {myOrder.map((order) => (
                <Row key={order.orderNum} className="status-card">
                    <Col xs={2}>
                        <img
                            src={order.items[0].productId.image}
                            alt={order.items[0].productId.name}
                            height={96}
                        />
                    </Col>
                    <Col xs={8} className="order-info">
                        <div>
                            <strong>주문번호: {order.orderNum}</strong>
                        </div>
                        <div className="text-12">{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div>
                            {order.items.length > 1 ? (
                                `${order.items[0].productId.name} [${order.items[0].option}] 외 ${order.items.length - 1}개`
                            ) : (
                                order.items[0].productId.name
                            )}
                        </div>
                        <div>총 {currencyFormat(order.totalPrice)}원</div>
                    </Col>
                    <Col md={2} className="vertical-middle">
                        <div className="text-align-center text-12">주문상태</div>
                        <Badge bg="warning">{order.status}</Badge>
                        <span className={`${badgeBg[order.status]} order-status`}>
                            {order.status}
                        </span>

                    </Col>
                </Row>
            ))
            }
        </div>
    );
};
export default OrderStatusCard;
