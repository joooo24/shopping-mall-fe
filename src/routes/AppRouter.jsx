import React from "react";
import { Route, Routes } from "react-router";
import AdminOrderPage from "../page/AdminOrderPage";
import AdminProduct from "../page/AdminProduct";
import CartPage from "../page/CartPage";
import Login from "../page/Login";
import MyPage from "../page/MyPage";
import OrderCompletePage from "../page/OrderCompletePage";
import PaymentPage from "../page/PaymentPage";
import ProductAll from "../page/ProductAll";
import ProductDetail from "../page/ProductDetail";
import RegisterPage from "../page/RegisterPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <Routes>
            {/* 홈 페이지 */}
            <Route path="/" element={<ProductAll />} />
            
            {/* 로그인 페이지 */}
            <Route path="/login" element={<Login />} />
            
            {/* 회원가입 페이지 */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* 제품 상세 페이지 */}
            <Route path="/product/:id" element={<ProductDetail />} />
            
            {/* 고객 권한이 필요한 페이지 */}
            <Route element={<PrivateRoute permissionLevel="customer" />}>
                <Route path="/cart" element={<CartPage />} /> {/* 장바구니 페이지 */}
                <Route path="/payment" element={<PaymentPage />} /> {/* 결제 페이지 */}
                <Route path="/payment/success" element={<OrderCompletePage />} /> {/* 주문 완료 페이지 */}
                <Route path="/account/purchase" element={<MyPage />} /> {/* 내 주문 페이지 */}
            </Route>
            
            {/* 관리자 권한이 필요한 페이지 */}
            <Route element={<PrivateRoute permissionLevel="admin" />}>
                <Route path="/admin/product" element={<AdminProduct />} /> {/* 관리자 제품 관리 페이지 */}
                <Route path="/admin/order" element={<AdminOrderPage />} /> {/* 관리자 주문 관리 페이지 */}
            </Route>
        </Routes>
    );
};

export default AppRouter;
