import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "../component/ProductTable";
import * as types from "../constants/product.constants";

const AdminProduct = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();

    // 다이얼로그
    const [showDialog, setShowDialog] = useState(false);
    const [mode, setMode] = useState("new"); // new, edit

    // 검색 조건 초기 상태 설정
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        name: query.get("name") || "",
    });

    // Redux 상태에서 product에 있는 productList, totalPageNum, totalItemNum 가져오기
    const { productList, totalPageNum, totalItemNum } = useSelector((state) => state.product);

    // 테이블 헤더 배열
    const tableHeader = ["#", "Sku", "Name", "Price", "Stock", "Image", "Status", ""];

    // (검색어또는 페이지가 바뀜 => url 바꿔줌 => url쿼리 읽어옴 => 이 쿼리값 맞춰서  상품리스트 가져오기)
    // 검색어와 페이지가 변경될 때마다 상품 리스트 가져오기 (url쿼리 맞춰서)
    useEffect(() => {
        // 검색어 입력 시 받아온 필드:값 (name:값) 없을 경우 객체의 속성 name을 삭제
        if (searchQuery.name === "") {
            delete searchQuery.name;
        }

        // 객체를 URL 쿼리 문자열로 변환 -> 문자열로 변경 -> url에 쿼리 값 추가
        const params = new URLSearchParams(searchQuery);
        const query = params.toString();
        // 해당 쿼리로 페이지 이동
        navigate("?" + query);

        // 쿼리 변경 될 때 마다 검색 조건 넣어서 리스트 불러오기
        dispatch(productActions.getProductList({ ...searchQuery }));
    }, [searchQuery]);

    // 아이템 삭제
    const deleteItem = (id) => {
        dispatch(productActions.deleteProduct(id));
    };

    // 상품 수정 다이얼로그 열기
    const openEditForm = (product) => {
        // edit 모드 설정
        setMode("edit");
        // 선택된 상품 설정 (통신이 필요x 바로 리덕스로)
        // -> 폼에 보여기주기 위함 
        dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product });
        setShowDialog(true);
    };

    // 상품 생성 다이얼로그 열기
    const handleClickNewItem = () => {
        // new 모드 설정
        setMode("new");
        setShowDialog(true);
    };

    // 페이지 변경 시 쿼리 업데이트
    const handlePageClick = ({ selected }) => {
        setSearchQuery((prev) => ({ ...prev, page: selected + 1 }));
    };

    return (
        <div className="admin-product-page">
            <div className="admin-product-container">
                <SearchBox
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="제품 이름으로 검색"
                    field="name" // 검색할 속성
                />

                <button className="btn btn-default" onClick={handleClickNewItem}>
                    Add New Item +
                </button>

                <ProductTable
                    header={tableHeader}
                    data={productList || []}
                    deleteItem={deleteItem}
                    openEditForm={openEditForm}
                />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5} // 한 페이지에 보여줄 아이템 수
                    pageCount={totalPageNum} // 전체 페이지 {Math.ceil(productList.totalCount / 5)}
                    forcePage={searchQuery.page - 1} // 현재 페이지
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
            </div>

            <NewItemDialog mode={mode} showDialog={showDialog} setShowDialog={setShowDialog} />
        </div>
    );
};

export default AdminProduct;
