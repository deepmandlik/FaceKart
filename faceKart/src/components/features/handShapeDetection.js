import { Camera } from "@mediapipe/camera_utils/camera_utils";
import {HAND_CONNECTIONS ,Hands } from "@mediapipe/hands/hands";
import {drawConnectors , drawLandmarks}  from '@mediapipe/drawing_utils/drawing_utils';


export default function HandPose(webcamRef , canvasRef) {
  const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  hands.onResults((results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                       {color: '#FFF', lineWidth: 5});
        drawLandmarks(canvasCtx, landmarks, {color: '#0009', lineWidth: 2});
      }
    }
    canvasCtx.restore();
  });
  
  const camera = new Camera(webcamRef.current.video , {
    onFrame: async () => {
      await hands.send({image: webcamRef.current.video });
    },
    width: 1280,
    height: 720
  });
  camera.start();
   
}

