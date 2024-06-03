import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import "../style/common.style.css";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidget extends Component {
	componentDidMount() {
		// Cloudinary 업로드 위젯을 생성하고 초기화
		var myWidget = window.cloudinary.createUploadWidget(
			{
				cloudName: CLOUDNAME, // Cloudinary 클라우드 이름
				uploadPreset: UPLOADPRESET, // Cloudinary 업로드 프리셋
			},
			(error, result) => {
				// 업로드가 성공적으로 완료된 경우
				if (!error && result && result.event === "success") {
					console.log("Done! Here is the image info: ", result.info);

					// 업로드된 이미지의 URL을 획득하고 이미지를 표시
					document
						.getElementById("uploadedimage")
						.setAttribute("src", result.info.secure_url);

					// 업로드된 이미지의 URL을 상위 컴포넌트로 전달
					this.props.uploadImage(result.info.secure_url);
				}
			}
		);
		// 업로드 버튼 클릭 시 이벤트 핸들러를 설정
		document.getElementById("upload_widget").addEventListener(
			"click",
			function () {
				// 업로드 위젯을 열어 사용자가 파일을 선택할 수 있도록 함
				myWidget.open();
			},
			false
		);
	}

	render() {
		// 업로드 버튼
		return (
			<Button id="upload_widget" size="sm" className="ml-2">
				Upload Image +
			</Button>
		);
	}
}

export default CloudinaryUploadWidget;
