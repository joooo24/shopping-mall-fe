import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { IoClose } from "react-icons/io5";

const CartProductCard = ({ item, totalPrice }) => {
    console.log("CartProductCard item", item);
    const dispatch = useDispatch();

    const handleQtyChange = () => {
        //아이템 수량을 수정한다
    };

    const deleteCart = (id) => {
        //아이템을 지운다
    };

    return (
        <div className="cart-product-card">
            <div className="cart-product-img">
                <img src={item.productId.image} width={112} />
            </div>
            <div className="cart-product-info">
                <IoClose className="btn-close" onClick={() => deleteCart("hard_code")} />
                <h3>{item.productId.name}</h3>
                <div>
                    <strong>₩ {currencyFormat(item.productId.price)}</strong>
                </div>
                <div>
                    <span>옵션 :</span> {item.size}
                </div>
                <div className="display-flex space-between">
                    <span>수량 :</span>
                    <Form.Select
                        onChange={(event) => handleQtyChange()}
                        required
                        defaultValue={item.qty}
                        className="qty-dropdown"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </Form.Select>
                </div>
                <div className="total">
                    <span>합계 :</span> {currencyFormat(item.productId.price * item.qty)}원
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
