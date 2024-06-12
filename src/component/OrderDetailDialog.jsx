import React, { useState } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../style/adminOrder.style.css";
import { ORDER_STATUS } from "../constants/order.constants";
import { orderActions } from "../action/orderAction";
import { currencyFormat } from "../utils/number";

const OrderDetailDialog = ({ open, handleClose }) => {
    const selectedOrder = useSelector((state) => state.order.selectedOrder); // 선택된 주문
    const [orderStatus, setOrderStatus] = useState(selectedOrder?.status); // 주문 상태
    const dispatch = useDispatch();

    console.log("selectedOrder", selectedOrder)

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const submitStatus = () => {
        dispatch(orderActions.updateOrder(selectedOrder._id, orderStatus));
        handleClose();
    };

    if (!selectedOrder) {
        return <></>;
    }

    return (
        <Modal show={open} onHide={handleClose} className="modal modal-selected-order">
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="order-info">
                    <p><span>예약번호:</span> {selectedOrder.orderNum}</p>
                    <p><span>주문날짜:</span>  {selectedOrder.createdAt.slice(0, 10)}</p>
                    <p><span>이메일:</span> {selectedOrder.userId.email}</p>
                    <p><span>주소:</span> {selectedOrder.shipTo.address + " " + selectedOrder.shipTo.city}</p>
                    <p><span>이름:</span>
                        {`${selectedOrder.contact.firstName + selectedOrder.contact.lastName}`}
                    </p>
                    <p><span>연락처:</span>  {`${selectedOrder.contact.contact}`}</p>
                </div>
                <hr />
                <h4>주문내역</h4>
                <div className="overflow-x">
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* selectedOrder가 하나 이상일 때만 노출 */}
                            {selectedOrder.items.length > 0 &&
                                selectedOrder.items.map((item) => (
                                    <tr key={item._id}>
                                        <td className="selected-order-td1">{item._id}</td>
                                        <td className="selected-order-td2">{item.productId.name}</td>
                                        <td className="selected-order-td3">{currencyFormat(item.price)}</td>
                                        <td className="selected-order-td4">{item.qty}</td>
                                        <td className="selected-order-td5">{currencyFormat(item.price * item.qty)}</td>
                                    </tr>
                                ))}
                            <tr>
                                <td colSpan={4}>총계:</td>
                                <td>{currencyFormat(selectedOrder.totalPrice)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <Form onSubmit={submitStatus}>
                    <Form.Group as={Col} controlId="status">
                        <Form.Label>배송 상태</Form.Label>
                        <Form.Select value={orderStatus} onChange={handleStatusChange}>
                            {ORDER_STATUS.map((item, idx) => (
                                <option key={idx} value={item.toLowerCase()}>
                                    {item}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="btn-wrap">
                        <button className="btn btn-line" onClick={handleClose}>닫기</button>
                        <button className="btn btn-submit" type="submit">저장</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OrderDetailDialog;
