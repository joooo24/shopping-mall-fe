import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // URL에서 id 파라미터를 가져옴
    const navigate = useNavigate();

    // 사이즈 관련 상태
    const [size, setSize] = useState("");
    const [sizeError, setSizeError] = useState(false);

    // 상품 상세 정보 가져오기
    useEffect(() => {
        dispatch(productActions.getProductDetail(id));
    }, [dispatch, id]);

    // Redux 상태 선택자를 사용하여 상품 정보, 로딩 상태, 에러 상태 가져오기
    const { productDetail, loading, error } = useSelector((state) => state.product);

    console.log("productDetail", productDetail)

    // 장바구니에 상품을 추가
    const addItemToCart = () => {
        //사이즈를 아직 선택안했다면 에러
        // 아직 로그인을 안한유저라면 로그인페이지로
        // 카트에 아이템 추가하기
    };

    // 사이즈 선택
    const selectSize = (value) => { };

    // 로딩 중이면 로딩 스피너를 표시
    if (loading) {
        return <ColorRing />;
    }

    // 에러가 있으면 에러 메시지 표시
    if (error) {
        return <div>Error: {error}</div>;
    }

    // productDetail이 null이거나 undefined인 경우
    if (!productDetail) {
        return <div>No product found.</div>;
    }

    return (
        <Container className="product-detail-card">
            <Row>
                <Col sm={6}>
                    <img src={productDetail.image} className="w-100" alt="image" />
                </Col>
                <Col className="product-info-area" sm={6}>
                    <div className="product-info">{productDetail.name}</div>
                    <div className="product-info">{currencyFormat(productDetail.price)}</div>
                    <div className="product-info">{productDetail.description}</div>

                    <Dropdown
                        className="drop-down size-drop-down"
                        title={size}
                        align="start"
                        onSelect={(value) => selectSize(value)}
                    >
                        <Dropdown.Toggle
                            className="size-drop-down"
                            variant={sizeError ? "outline-danger" : "outline-dark"}
                            id="dropdown-basic"
                            align="start"
                        >
                            {size === "" ? "사이즈 선택" : size.toUpperCase()}
                        </Dropdown.Toggle>

                        {/* <Dropdown.Menu className="size-drop-down">
                            {productDetail.sizes.map((sizeOption) => (
                                <Dropdown.Item key={sizeOption}>{sizeOption}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu> */}
                    </Dropdown>
                    <div className="warning-message">{sizeError && "사이즈를 선택해주세요."}</div>
                    <button className="btn btn-add" onClick={addItemToCart}>
                        추가
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
