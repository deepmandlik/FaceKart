import { Camera } from "@mediapipe/camera_utils/camera_utils";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation/selfie_segmentation";

export default function GreenScreen(webcamRef , canvasRef){
  const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    },
  });
  selfieSegmentation.setOptions({
    modelSelection: 1,
  });
  selfieSegmentation.onResults((results) => {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "green";
    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
  });

  const camera = new Camera(webcamRef.current.video, {
    onFrame: async () => {
      await selfieSegmentation.send({ image: webcamRef.current.video });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
}

