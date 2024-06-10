import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";
import { IoClose } from "react-icons/io5";

const CartProductCard = ({ item }) => {
    const dispatch = useDispatch();

    // 수량 변경
    const handleQtyChange = (id, value) => {
        dispatch(cartActions.updateQty(id, value));
    };

    // 장바구니 아이템 삭제
    const deleteCart = () => {
        dispatch(cartActions.deleteCartItem(item.productId._id));
    };

    return (
        <div className="cart-product-card">
            <div className="cart-product-img">
                <img src={item.productId.image} width={112} alt="" />
            </div>
            <div className="cart-product-info">
                <IoClose className="btn-close" onClick={deleteCart} />
                <h3>{item.productId.name}</h3>
                <div>
                    <strong>₩ {currencyFormat(item.productId.price)}</strong>
                </div>
                <div>
                    <span>옵션 :</span> {item.option}
                </div>
                <div className="display-flex space-between">
                    <span>수량 :</span>
                    <Form.Select
                        onChange={(event) => handleQtyChange(item._id, event.target.value)}
                        required
                        defaultValue={item.qty}
                        className="qty-dropdown"
                    >
                        {Array.from({ length: item.qty }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
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
