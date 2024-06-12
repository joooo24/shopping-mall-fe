import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "./../style/product.style.scss";

const ProductCard = ({ productList }) => {
    const navigate = useNavigate();
    const showProduct = (productId) => {
        // 상품 상세 페이지로 이동 /product/:id
        navigate(`/product/${productId}`);
    };

    return (
        <>
            {productList?.map((product, index) => (
                <div key={product._id} className="product-card" onClick={() => showProduct(product._id)}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{currencyFormat(product.price)}원</div> {/* currencyFormat 사용하여 가격 형식 변환 */}
                </div>
            ))}
        </>
    );
};

export default ProductCard;
