import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "./../style/product.style.scss";

const ProductCard = ({ productList }) => {
    const navigate = useNavigate();
    console.log("### productList", productList);

    const showProduct = (id) => {
        // 상품 디테일 페이지로 가기
    };

    return (
        <>
            {productList?.map((product, index) => (
                <div key={product._id} className="product-card" onClick={() => showProduct("hard_code")}>
                    <img src={product.image} alt={product.name} />
                    <div>{product.name}</div>
                    <div>{currencyFormat(product.price)}원</div> {/* currencyFormat 사용하여 가격 형식 변환 */}
                </div>
            ))}
        </>
    );
};

export default ProductCard;
