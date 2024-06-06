import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";
import "./../style/product.style.scss";

const ProductAll = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams();
    // const error = useSelector((state) => state.product.error);

    const searchQuery = query.get("name") || "";
    console.log("searchQuery", searchQuery);

    useEffect(() => {
        // 검색 조건 넣어서 리스트 불러오기
        dispatch(productActions.getProductList({ name: searchQuery }));
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
