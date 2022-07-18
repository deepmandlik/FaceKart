import { FaceMesh , FACEMESH_TESSELATION ,FACEMESH_LIPS ,FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS, FACEMESH_LEFT_EYE,FACEMESH_RIGHT_EYE , FACEMESH_RIGHT_IRIS,FACEMESH_RIGHT_EYEBROW} from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils/camera_utils";
import {drawConnectors}  from '@mediapipe/drawing_utils/drawing_utils';

export default function FaceMask(webcamRef ,  canvasRef) {
  const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  }});
  faceMesh.setOptions({
    maxNumFaces: 5,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  faceMesh.onResults((results) => {
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
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                       {color: '#E8F5E9', lineWidth: 0.5});
        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: 'aqua'});
        drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: 'aqua'});
      }
    }
    canvasCtx.restore();
  });
  
  const camera = new Camera(webcamRef.current.video , {
    onFrame: async () => {
      await faceMesh.send({image: webcamRef.current.video });
    },
    width: 1280,
    height: 720
  });
  camera.start();
}

