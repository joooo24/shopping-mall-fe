import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
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

    // 상품 상세 정보 가져오기
    useEffect(() => {
        dispatch(productActions.getProductDetail(id));
    }, [dispatch, id]);

    // 사이즈 관련 상태
    const [option, setOption] = useState("");
    const [optionError, setOptionError] = useState(false);

    // Redux 상태 선택자를 사용하여 유저 정보, 상품 정보, 장바구니 정보 가져오기
    const { user } = useSelector((state) => state.user);
    const { productDetail, loading, error } = useSelector((state) => state.product);

    // 장바구니에 상품 추가
    const addItemToCart = () => {
        // 옵션을 선택 안했다면 에러
        if (option === "") {
            setOptionError(true);
            return;
        }

        // 아직 로그인을 안한유저라면 로그인페이지로
        if (!user) {
            navigate("/login");
            return;
        }

        // 장바구니에 상품 추가하기 위한 정보 전달
        dispatch(cartActions.addToCart({ id, option, qty: 1 }));
    };

    // 사이즈 선택
    const selectOption = (value) => {
        setOption(value);
        setOptionError(false);
    };

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
                    {productDetail.image ? (
                        <img src={productDetail.image} className="w-100" alt="image" />
                    ) : (
                        <div className="no-image-placeholder">이미지를 불러올 수 없습니다</div>
                    )}
                </Col>
                <Col className="product-info-area" sm={6}>
                    <div className="product-info">{productDetail.name}</div>
                    <div className="product-info">{currencyFormat(productDetail.price)}</div>
                    <div className="product-info">{productDetail.description}</div>

                    <Dropdown
                        className="drop-down size-drop-down"
                        align="start"
                        onSelect={(value) => selectOption(value)}
                    >
                        <Dropdown.Toggle
                            className="size-drop-down btn btn-line"
                            variant={optionError ? "outline-danger" : "outline-dark"}
                            id="dropdown-basic"
                            align="start"
                        >
                            {option === "" ? "옵션 선택" : option.toUpperCase()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="size-drop-down">
                            {Object.entries(productDetail.stock)
                                .filter(([option, quantity]) => quantity > 0)
                                .map(([option, quantity]) => (
                                    <Dropdown.Item key={option} eventKey={option}>
                                        {`${option.toUpperCase()}: ${quantity}개 남음`}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="warning-message">{optionError && "옵션을 선택해주세요."}</div>
                    {option && <div className="selected-option">선택된 옵션: {option.toUpperCase()}</div>}
                    <button className="btn btn-primary" onClick={addItemToCart}>
                        추가
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
