import React, { useState } from "react";
import "aframe";
import "aframe-ar";

const ARCamera = () => {
	const [stream, setStream] = useState(null);

	const startCamera = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});
			setStream(mediaStream);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<button onClick={startCamera}>Start Camera</button>
			{stream ? (
				<a-scene>
					<a-video src={stream}></a-video>
				</a-scene>
			) : (
				<p>Please click the button to start the camera</p>
			)}
		</div>
	);
};

export default ARCamera;
