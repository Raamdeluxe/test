import React, { useState, useEffect } from "react";
import "aframe";

function Camera() {
	const [stream, setStream] = useState(null);
	const [error, setError] = useState(null);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [cameraId, setCameraId] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			const cameras = devices.filter((d) => d.kind === "videoinput");
			if (cameras.length > 0) {
				setCameraId(cameras[0].deviceId);
				setIsMobile(
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
						navigator.userAgent
					)
				);
			}
		});
	}, []);

	const openCamera = () => {
		const constraints = {
			video: { deviceId: cameraId ? { exact: cameraId } : undefined },
		};
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(setStream)
			.catch(setError);
		setIsCameraOpen(true);
	};

	const flipCamera = () => {
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			const cameras = devices.filter((d) => d.kind === "videoinput");
			if (cameras.length > 1) {
				const newCameraId = cameras.find(
					(c) => c.deviceId !== cameraId
				).deviceId;
				setCameraId(newCameraId);
				openCamera();
			}
		});
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
				<div>
					<a-scene>
						<a-entity gltf-model="#model" position="0 0 0"></a-entity>
					</a-scene>
					{isMobile && <button onClick={flipCamera}>Flip Camera</button>}
					<button onClick={closeCamera}>Close Camera</button>
					<a-assets>
						<a-asset-item id="model" src={require("./models/model.gltf")} />
					</a-assets>
				</div>
			)}
		</div>
	);
}

export default Camera;
