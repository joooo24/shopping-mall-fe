import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { Link } from "react-router-dom";

const MyPage = () => {
    const dispatch = useDispatch();
    
    //오더리스트 들고오기
    useEffect(() => {
        dispatch(orderActions.getOrder());
    }, [dispatch]);
   
    const { myOrder } = useSelector((state) => state.order);

    // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
    if (myOrder === "") {
        return (
            <div className="page-container">
                <h1>주문 내역</h1>
                <div className="no-contents">
                    <p>주문한 상품이 없습니다</p>
                    <Link to="/">메인페이지로</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>주문 내역</h2>
        </div>
    );
};

export default MyPage;
