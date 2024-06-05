import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import "./../style/product.style.scss"

const ProductAll = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams();
    // const error = useSelector((state) => state.product.error);

    // 검색 조건 초기 상태 설정
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        name: query.get("name") || "",
    });

    // 처음 로딩하면 상품리스트 불러오기
    useEffect(() => {
        // 검색어 입력 시 받아온 필드:값 (name:값) 없을 경우 객체의 속성 name을 삭제
        if (searchQuery.name === "") {
            delete searchQuery.name;
        }

        // 객체를 URL 쿼리 문자열로 변환 -> 문자열로 변경 -> url에 쿼리 값 추가
        const params = new URLSearchParams(searchQuery);
        const query = params.toString();
        navigate("?" + query);

        // 검색 조건 넣어서 리스트 불러오기
        dispatch(productActions.getProductList({ ...searchQuery }));
    }, [searchQuery]);

    const { productList, totalPageNum, totalItemNum } = useSelector((state) => state.product);

    return (
        <div className="product-container">
            <div className="product-list">
                <ProductCard productList={productList} />
            </div>
        </div>
    );
};

export default ProductAll;
