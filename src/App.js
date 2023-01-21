import React, { useState } from "react";
import "./App.css";

function Camera() {
	const [stream, setStream] = useState(null);
	const [error, setError] = useState(null);
	const [isCameraOpen, setIsCameraOpen] = useState(false);

	const openCamera = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(setStream)
			.catch(setError);
		setIsCameraOpen(true);
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
					<button onClick={closeCamera}>Close Camera</button>
				</div>
			)}
		</div>
	);
}

export default Camera;
