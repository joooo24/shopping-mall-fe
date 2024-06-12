import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import { ColorRing } from "react-loader-spinner";

const CartPage = () => {
    const dispatch = useDispatch();
    const { cartList, totalPrice, loading, error } = useSelector((state) => state.cart);
    console.log("### CartPage cartList", cartList);
    useEffect(() => {
        // 카트 리스트 불러오기
        dispatch(cartActions.getCartList());
    }, []);

    // 로딩 중이면 로딩 스피너를 표시
    if (loading) {
        return <ColorRing />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <Container>
            <Row>
                <Col xs={12} md={7}>
                    {cartList && cartList?.length > 0 ? (
                        cartList?.map((item) => <CartProductCard item={item} key={item._id} />)
                    ) : (
                        <div className="text-align-center empty-bag">
                            <h2>카트가 비어있습니다.</h2>
                            <div>상품을 담아주세요!</div>
                        </div>
                    )}
                </Col>
                <Col xs={12} md={5}>
                    <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
