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

    // 쿼리가 변경될 때 주문 목록을 가져오기
    useEffect(() => {
        dispatch(orderActions.getOrderList({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        // ordernum이 빈 문자열일 경우 쿼리에서 제거
        if (searchQuery.ordernum === "") {
            delete searchQuery.ordernum;
        }

        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();

        // 해당 쿼리로 페이지 이동
        navigate("?" + queryString);
    }, [searchQuery]);

    const openEditForm = (order) => {
        // 주문 상세 모달 열기
        setOpen(true);
        // 선택된 주문을 Redux store에 설정
        dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
    };

    // 페이지 클릭 시 검색 쿼리를 업데이트
    const handlePageClick = ({ selected }) => {
        setSearchQuery((prev) => ({ ...prev, page: selected + 1 }));
    };

    // 주문 상세 다이얼로그 닫기
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="admin-product-page">
            <Container>
                <div className="mt-2 display-center mb-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="오더번호"
                        field="ordernum"
                    />
                </div>

                <OrderTable header={tableHeader} data={orderList} openEditForm={openEditForm} />

                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPageNum} // 총 페이지 수
                    forcePage={searchQuery.page - 1} // 현재 페이지 수
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
