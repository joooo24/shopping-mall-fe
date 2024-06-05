import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

const SearchBox = ({ searchQuery, setSearchQuery, placeholder, field }) => {
    const [query] = useSearchParams();
    const [keyword, setKeyword] = useState(query.get(field) || ""); // 검색어 상태 초기화

    // Enter 키를 눌렀을 때 검색어 설정 함수
    const onCheckEnter = (event) => {
        if (event.key === "Enter") {
            // 부모 컴포넌트 (AdminOrderPage)의 검색어 상태를 변경 (페이지, 필드: 값)
            setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value }); 
        }
    };
    return (
        <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
                type="text"
                placeholder={placeholder}
                onKeyPress={onCheckEnter} // Enter 키 눌림 감지
                onChange={(event) => setKeyword(event.target.value)} // 검색어 상태 업데이트
                value={keyword} // 입력값 설정
            />
        </div>
    );
};

export default SearchBox;
