import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderDetailDialog from "../component/OrderDetailDialog";
import OrderTable from "../component/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";

// AdminOrderPage 컴포넌트
const AdminOrderPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();

    const { orderList, totalPageNum } = useSelector((state) => state.order); // 주문 목록, 총 페이지 수
    const [open, setOpen] = useState(false); // 주문 상세 다이얼로그 토글

    // 검색 쿼리
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1, // 페이지 번호
        ordernum: query.get("ordernum") || "", // 주문 번호
    });

    // 주문 목록 타이틀
    const tableHeader = ["#", "Order#", "Order Date", "User", "Order Item", "Address", "Total Price", "Status"];

    // 쿼리 변경 될 때 마다 검색 조건 넣어서 리스트 불러오기
    useEffect(() => {
        dispatch(orderActions.getOrderList({ ...searchQuery }));
    // (검색어또는 페이지가 바뀜 => url 바꿔줌 => url쿼리 읽어옴 => 이 쿼리값 맞춰서  주문리스트 가져오기)
    // 검색어와 페이지가 변경될 때마다 상품 리스트 가져오기 (url쿼리 맞춰서)
    useEffect(() => {
        // 검색어 입력 시 받아온 필드:값 (ordernum:값) 없을 경우 객체의 속성 ordernum을 삭제
        if (searchQuery.ordernum === "") {
            delete searchQuery.ordernum;
        }

        // 객체를 URL 쿼리 문자열로 변환 -> 문자열로 변경 -> url에 쿼리 값 추가
        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();
        // 해당 쿼리로 페이지 이동
        navigate("?" + queryString);
        // 쿼리 변경 될 때 마다 검색 조건 넣어서 리스트 불러오기
        dispatch(orderActions.getOrderList({ ...searchQuery }));
    }, [searchQuery]);

    // 페이지 변경 시 쿼리 업데이트
    const handlePageClick = ({ selected }) => {
        setSearchQuery((prev) => ({ ...prev, page: selected + 1 }));
    };

    const openEditForm = (order) => {
        setOpen(true);
        dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="admin-product-page">
            <Container>
                <div className="mt-2 display-center mb-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery} // setSearchQuery 전달
                        placeholder="오더번호"
                        field="ordernum"
                    />
                </div>

                <OrderTable header={tableHeader} data={orderList} openEditForm={openEditForm} />

                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPageNum}
                    forcePage={searchQuery.page - 1}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    className="display-center list-style-none"
                />
            </Container>

            {open && <OrderDetailDialog open={open} handleClose={handleClose} />}
        </div>
    );
};

export default AdminOrderPage;
