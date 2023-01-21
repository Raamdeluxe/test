import React, { useState } from "react";
import "./App.css";

function Camera() {
	const [stream, setStream] = useState(null);
	const [error, setError] = useState(null);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [cameraType, setCameraType] = useState("front");

	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);

	const openCamera = () => {
		const constraints = { video: { facingMode: cameraType } };
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(setStream)
			.catch(setError);
		setIsCameraOpen(true);
	};

	const flipCamera = () => {
		setCameraType(cameraType === "front" ? "back" : "front");
		openCamera();
	};

	const closeCamera = () => {
		stream.getTracks().forEach((track) => track.stop());
		setIsCameraOpen(false);
	};

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<div>
			{!isCameraOpen ? (
				<button onClick={openCamera}>Open Camera</button>
			) : (
				<div className="video_container">
					<video
						playsInline
						autoPlay
						muted
						ref={(ref) => ref && (ref.srcObject = stream)}
					/>
					{isMobile && <button onClick={flipCamera}>Flip Camera</button>}
					<button onClick={closeCamera}>Close Camera</button>
				</div>
			)}
		</div>
	);
}

export default Camera;
