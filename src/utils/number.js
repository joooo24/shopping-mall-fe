// 숫자를 통화 형식으로 변환하는 함수
export const currencyFormat = (value) => {
    // 입력된 값이 없으면 0으로 설정
    const number = value !== undefined ? value : 0;
    // 숫자를 통화 형식으로 변환하여 반환
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

// 신용카드 유효기간을 MM/YY 형식으로 변환하는 함수
export const cc_expires_format = (string) => {
    // 숫자 이외의 문자를 모두 제거하여 숫자만 남기고
    // MM/YY 형식으로 변환하여 반환
    return string
        .replace(/[^0-9]/g, "") // 숫자만 허용
        .replace(/^([2-9])$/g, "0$1") // 3을 03으로 변환
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2") // 13을 01/3으로 변환
        .replace(/^0{1,}/g, "0") // 00을 0으로 변환
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2"); // 113을 11/3으로 변환
};
