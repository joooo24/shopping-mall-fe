import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";
import { ColorRing } from "react-loader-spinner";

const OrderCompletePage = () => {
    const { orderNum, error, loading } = useSelector((state) => state.order);

    // 만약 주문번호가 없는 상태로 이페이지에 왔다면?
    // 다시 메인페이지로 돌아가기
    if (!orderNum || orderNum === "") {
        return (
            <div className="container">
                <h1>주문 실패</h1>
                <div>
                    메인페이지로 돌아가세요
                    <Link to="/">메인페이지로</Link>
                </div>
            </div>
        );
    }

    // 로딩 중이면 로딩 스피너를 표시
    if (loading) {
        return <ColorRing />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="page-container confirmation-page">
            <img src="/image/greenCheck.png" width={100} className="check-image" alt="greenCheck.png" />
            <h2>주문이 완료되었습니다!</h2>
            <div>주문 번호:{orderNum}</div>
            <div>
                주문 확인은 메뉴 {`>`} 내 주문에서
                <div className="text-align-center">
                    <Link to={"/account/purchase"}>내 주문 바로가기</Link>
                </div>
            </div>
        </section>
    );
};

export default OrderCompletePage;
