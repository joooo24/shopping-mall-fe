import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "../component/ProductTable";

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

    // Redux 상태에서 productList 가져오기
    const { productList } = useSelector((state) => state.product);

    // 테이블 헤더 배열
    const tableHeader = [
        "#",
        "Sku",
        "Name",
        "Price",
        "Stock",
        "Image",
        "Status",
        "",
    ];

    // (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)
    // 검색어와 페이지가 변경될 때마다 상품 리스트 가져오기 (url쿼리 맞춰서)
    useEffect(() => {
        // 검색어 입력 시 받아온 필드:값 (name:값) 없을 경우
        if (searchQuery.name === "") {
            console.log("searchQuery.name", searchQuery.name)

            // 객체의 속성 name을 삭제
            delete searchQuery.name;
        }

        // 검색어 입력 시 받아온 필드:값 (name:값)
        console.log("###searchQuery.name", searchQuery.name)
        // 객체를 URL 쿼리 문자열로 변환
        const params = new URLSearchParams(searchQuery);
        // 문자열로 변경
        const query = params.toString();
        // url에 쿼리 값 추가
        navigate("?" + query);

        // url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기

        // 검색 조건 넣어주기
        dispatch(productActions.getProductList());
    }, [searchQuery]);

    // 아이템 삭제
    const deleteItem = (id) => { };

    // 상품 수정 다이얼로그 열기
    const openEditForm = (product) => {
        setMode("edit"); // edit 모드 설정
        setShowDialog(true);
    };

    // 상품 생성 다이얼로그 열기
    const handleClickNewItem = () => {
        setMode("new"); // new 모드 설정
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
                    data={productList?.products || []}
                    deleteItem={deleteItem}
                    openEditForm={openEditForm}
                />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={100} // ### 수정하기
                    // pageCount={Math.ceil(productList.totalCount / 10)} 전체 페이지 수 계산
                    forcePage={2} // ### 수정하기 - 현재 페이지 +1 해야함
                    // forcePage={searchQuery.page - 1} 현재 페이지 설정
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

            <NewItemDialog
                mode={mode}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </div>
    );
};

export default AdminProduct;
