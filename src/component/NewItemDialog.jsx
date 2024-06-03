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
        // 모드가 "new"인 라면 초기 값 InitialFormData, 아니면 selectedProduct
        mode === "new" ? { ...InitialFormData } : selectedProduct
    );

    // 재고 상태
    const [stock, setStock] = useState([]); // ex) 재고 [["s", 2], ["m", 5], ["l", 5]]
    const [stockError, setStockError] = useState(false);

    const dispatch = useDispatch();

    // 다이얼로그 닫기 핸들러
    const handleClose = () => {
        setShowDialog(false);
    };

    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();
        // 입력 유효성 검사 (재고 체크 및 타입 변경) -> 상품 생성 or 수정 요청

        // 재고를 입력했는지 확인, 아니면 에러
        if (stock.length === 0) return setStockError(true);

        // 재고 타입 변경 (배열 -> 객체) [['M',2]] -> {M:2}
        const totalStock = stock.reduce((total, item) => {
            return { ...total, [item[0]]: parseInt(item[1]) };
        }, {});

        if (mode === "new") {
            //새 상품 만들기
            dispatch(productActions.createProduct({ ...formData, stock: totalStock }));
            setShowDialog(false);
        } else {
            // 상품 수정하기
            dispatch(productActions.editProduct({ ...formData, stock: totalStock }));
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
        setStock([...stock, []]);
    };

    // 재고 항목 삭제
    const deleteStock = (idx) => {
        const newStock = stock.filter((item, index) => index !== idx);
        setStock(newStock);
    };

    // 재고 옵션 변경
    // ex) [["s", 2], ["m", 5], ["l", 5]]
    const handleOptionChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][0] = value;
        setStock(newStock);
    };

    // 재고 수량 변경
    const handleStockChange = (value, index) => {
        const newStock = [...stock];
        newStock[index][1] = value;
        setStock(newStock);
    };

    // 카테고리 변경 핸들러
    const onHandleCategory = (event) => {
        // 선택된 카테고리가 이미 formData.category 배열에 포함되어 있는지 확인
        if (formData.category.includes(event.target.value)) {
            // 포함되어 있다면, 해당 카테고리를 배열에서 제거
            const newCategory = formData.category.filter((item) => item !== event.target.value);

            // 업데이트된 카테고리 배열을 formData 상태에 반영
            setFormData({
                ...formData,
                category: [...newCategory],
            });
        } else {
            // 포함되어 있지 않다면, 해당 카테고리를 배열에 추가
            setFormData({
                ...formData,
                category: [...formData.category, event.target.value],
            });
        }
    };

    // 이미지 업로드 핸들러
    const uploadImage = (url) => {
        // 업로드된 이미지 URL 업데이트
        setFormData({ ...formData, image: url });
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
                <Modal.Title>{mode === "new" ? "새로운 상품 등록" : "상품 수정"}</Modal.Title>
            </Modal.Header>

            {/* 모달 폼 */}
            <div className="form-container">
                <Form className="form-box modal-form" onSubmit={handleSubmit}>
                    <div className="form-group-wrap">
                        {/* 상품 코드 */}
                        {/* <Form.Group className="form-group" controlId="sku">
                            <Form.Label>상품 코드</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="string"
                                placeholder="상품 코드를 입력하세요"
                                required
                                value={formData.sku}
                            />
                        </Form.Group> */}
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="sku">상품 코드</Form.Label>
                            <Form.Control
                                id="sku"
                                onChange={handleChange}
                                type="string"
                                placeholder="상품 코드를 입력하세요"
                                required
                                value={formData.sku}
                            />
                        </Form.Group>

                        {/* 상품명 */}
                        <Form.Group className="form-group" controlId="name">
                            <Form.Label>상품명</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                type="string"
                                placeholder="상품명을 입력하세요"
                                required
                                value={formData.name}
                            />
                        </Form.Group>
                    </div>

                    {/* 상품 설명 */}
                    <div className="form-group-wrap">
                        <Form.Group className="form-group" controlId="description">
                            <Form.Label>상품 설명</Form.Label>
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
                    </div>

                    {/* 상품 재고 */}
                    <div className="form-group-wrap coloum" controlId="stock">
                        <Form.Label className="mr-1">상품 재고</Form.Label>

                        {stockError && <span className="error-message">재고를 추가해주세요</span>}

                        <button className="btn btn-line" onClick={addStock}>
                            Add +
                        </button>

                        {/* 상품 재고 추가 배열 */}
                        <>
                            {stock.map((item, index) => (
                                <div className="form-group-wrap" key={index}>
                                    <div className="form-group">
                                        <Form.Select
                                            onChange={(event) => handleOptionChange(event.target.value, index)}
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
                                                    disabled={stock.some((size) => size[0] === item.toLowerCase())}
                                                    key={index}
                                                >
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <div className="form-group">
                                        <Form.Control
                                            onChange={(event) => handleStockChange(event.target.value, index)}
                                            type="number"
                                            placeholder="number of stock"
                                            value={item[1]}
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-small btn-danger" onClick={() => deleteStock(index)}>
                                        -
                                    </button>
                                </div>
                            ))}
                        </>
                    </div>

                    {/* 상품 이미지 업로드 */}
                    <div className="form-group-wrap coloum" controlId="Image" required>
                        <Form.Label>상품 이미지</Form.Label>
                        <CloudinaryUploadWidget uploadImage={uploadImage} />
                        <img
                            id="uploadedimage"
                            src={formData.image}
                            className="upload-image mt-2"
                            alt="uploadedimage"
                        ></img>
                    </div>

                    <div className="form-group-wrap">
                        {/* 가격 */}
                        <Form.Group className="form-group" controlId="price">
                            <Form.Label>가격</Form.Label>
                            <Form.Control
                                value={formData.price}
                                required
                                onChange={handleChange}
                                type="number"
                                placeholder="0"
                            />
                        </Form.Group>

                        {/* 카테고리 */}
                        <Form.Group className="form-group" controlId="category">
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

                        {/* 상태 */}
                        <Form.Group className="form-group" controlId="status">
                            <Form.Label>상태</Form.Label>
                            <Form.Select value={formData.status} onChange={handleChange} required>
                                {STATUS.map((item, idx) => (
                                    <option key={idx} value={item.toLowerCase()}>
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {/* 버튼 */}
                    <button className="btn btn-submit" type="submit">
                        {mode === "new" ? "상품 등록" : "수정 완료"}
                    </button>
                </Form>
            </div>
        </Modal>
    );
};

export default NewItemDialog;
