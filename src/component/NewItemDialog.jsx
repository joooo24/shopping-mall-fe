import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { productActions } from "../action/productAction";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import * as types from "../constants/product.constants";
import { commonUiActions } from "../action/commonUiAction";

// 상품 데이터
const InitialFormData = {
    name: "",
    sku: "",
    stock: {},
    image: "",
    description: "",
    category: [],
    status: "active",
    price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
    // Redux store에서 선택된 상품 및 에러 상태를 가져옴
    const selectedProduct = useSelector((state) => state.product.selectedProduct);
    const { error } = useSelector((state) => state.product);

    // 상태 변수 초기화
    const [formData, setFormData] = useState(
        // 모드가 "new"인 경우에는 초기 상태를 InitialFormData로 설정, 아니면 선택된 상품 데이터 사용
        mode === "new" ? { ...InitialFormData } : selectedProduct
    );
    const [stock, setStock] = useState([]); // ex) 재고 [["s", 2], ["m", 5], ["l", 5]]
    const [stockError, setStockError] = useState(false);
    const dispatch = useDispatch();

    // 다이얼로그 닫기 핸들러
    const handleClose = () => {
        // 상태 초기화 및 다이얼로그 닫기
    };

    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();
        // 입력 유효성 검사 및 상품 생성 또는 수정 요청
        // 재고를 입력했는지 확인, 아니면 에러
        // 재고를 배열에서 객체로 바꿔주기
        // [['M',2]] 에서 {M:2}로
        if (mode === "new") {
            //새 상품 만들기
        } else {
            // 상품 수정하기
        }
    };

    // 폼 필드 변경 핸들러
    const handleChange = (event) => {
        // 폼 데이터 업데이트
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    // 재고 항목 추가
    const addStock = () => {
        // 기존 배열에 새 배열 추가
        setStock([...stock, []])
    };

    // 재고 항목 삭제
    const deleteStock = (idx) => {
        const newStock = stock.filter((item, index) => index !== idx);
        setStock(newStock)
    };

    // 재고 옵션 변경
    // ex) [["s", 2], ["m", 5], ["l", 5]]
    const handleOptionChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][0] = value;
        setStock(newStock)
    };

    // 재고 수량 변경
    const handleStockChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][1] = value;
        setStock(newStock)
    };

    // 카테고리 변경 핸들러
    const onHandleCategory = (event) => {
        if (formData.category.includes(event.target.value)) {
            const newCategory = formData.category.filter(
                (item) => item !== event.target.value
            );
            setFormData({
                ...formData,
                category: [...newCategory],
            });
        } else {
            setFormData({
                ...formData,
                category: [...formData.category, event.target.value],
            });
        }
    };

    // 이미지 업로드 핸들러
    const uploadImage = (url) => {
        // 업로드된 이미지 URL 업데이트
    };

    // 다이얼로그가 열릴 때 실행되는 효과
    useEffect(() => {
        if (showDialog) {
            if (mode === "edit") {
                // 선택된 상품 데이터 불러오기  (재고 형태 객체에서 어레이로 바꾸기)
            } else {
                // 초기화된 폼 데이터 불러오기
            }
        }
    }, [showDialog]);

    //에러나면 토스트 메세지 보여주기


    return (
        <Modal show={showDialog} onHide={handleClose}>

            {/* 모달 헤더 */}
            <Modal.Header closeButton>
                <Modal.Title>{mode === "new" ? "Create New Product" : "Edit Product"}</Modal.Title>
            </Modal.Header>

            {/* 모달 폼 */}
            <div className="form-container">
                <Form className="form-box modal-form" onSubmit={handleSubmit}>

                    <Row className="mb-3">

                        {/* Sku */}
                        <Form.Group as={Col} controlId="sku">
                            <Form.Label>Sku</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="string"
                                placeholder="Enter Sku"
                                required
                                value={formData.sku}
                            />
                        </Form.Group>

                        {/* 상품명 */}
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>상품명</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="string"
                                placeholder="Name"
                                required
                                value={formData.name}
                            />
                        </Form.Group>
                    </Row>

                    {/* 설명문구 */}
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>설명문구</Form.Label>
                        <Form.Control
                            type="string"
                            placeholder="Description"
                            as="textarea"
                            onChange={handleChange}
                            rows={3}
                            value={formData.description}
                            required
                        />
                    </Form.Group>

                    {/* 재고 */}
                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label className="mr-1">재고</Form.Label>
                        {stockError && (
                            <span className="error-message">재고를 추가해주세요</span>
                        )}
                        <button className="btn btn-line" onClick={addStock}>
                            Add +
                        </button>
                        <div className="mt-2">
                            {stock.map((item, index) => (
                                <Row key={index}>
                                    <Col sm={4}>
                                        <Form.Select
                                            onChange={(event) =>
                                                handleOptionChange(event.target.value, index)
                                            }
                                            required
                                            defaultValue={item[0] ? item[0].toLowerCase() : ""}
                                        >
                                            <option value="" disabled selected hidden>
                                                Please Choose...
                                            </option>
                                            {SIZE.map((item, index) => (
                                                <option
                                                    invalid="true"
                                                    value={item.toLowerCase()}
                                                    disabled={stock.some(
                                                        (size) => size[0] === item.toLowerCase()
                                                    )}
                                                    key={index}
                                                >
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Control
                                            onChange={(event) =>
                                                handleStockChange(event.target.value, index)
                                            }
                                            type="number"
                                            placeholder="number of stock"
                                            value={item[1]}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <button
                                            className="btn btn-small btn-danger"
                                            onClick={() => deleteStock(index)}
                                        >
                                            -
                                        </button>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </Form.Group>

                    {/* 상품 이미지 업로드 */}
                    <Form.Group className="mb-3" controlId="Image" required>
                        <Form.Label>상품 이미지</Form.Label>
                        <CloudinaryUploadWidget uploadImage={uploadImage} />

                        <img
                            id="uploadedimage"
                            src={formData.image}
                            className="upload-image mt-2"
                            alt="uploadedimage"
                        ></img>
                    </Form.Group>

                    <div className="row-wrap">
                        {/* Price */}
                        <Form.Group as={Col} controlId="price">
                            <Form.Label>가격</Form.Label>
                            <Form.Control
                                value={formData.price}
                                required
                                onChange={handleChange}
                                type="number"
                                placeholder="0"
                            />
                        </Form.Group>

                        {/* Category */}
                        <Form.Group as={Col} controlId="category">
                            <Form.Label>카테고리</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                onChange={onHandleCategory}
                                value={formData.category}
                                required
                            >
                                {CATEGORY.map((item, idx) => (
                                    <option key={idx} value={item.toLowerCase()}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Status */}
                        <Form.Group as={Col} controlId="status">
                            <Form.Label>노출</Form.Label>
                            <Form.Select
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                {STATUS.map((item, idx) => (
                                    <option key={idx} value={item.toLowerCase()}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {/* 폼 제출 버튼 */}
                    <button className="btn btn-submit" type="submit">
                        {mode === "new" ? "Submit" : "Edit"}
                    </button>
                </Form>
            </div>
        </Modal>
    );
};

export default NewItemDialog;