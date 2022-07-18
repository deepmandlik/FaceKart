import React, { createRef, useRef, useEffect, useState } from "react";

import Webcam from "react-webcam";
import IconButton from "@material-ui/core/IconButton";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import Image from "../media/home.jpg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useScreenshot, createFileName } from "use-react-screenshot";

import GetAppIcon from "@material-ui/icons/GetApp";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FaceMask from "../components/features/faceMask";
import Lipstick from "../components/features/lipstick";
import HandPose from "../components/features/handShapeDetection";
import GreenScreen from "../components/features/selfieSegmentation";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    background: "#000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100wh",
  },
  webcam: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  getImage: {
    position: "absolute",
    display: "flex",
    alignItems:  'center',
    justifyContent: "center",
    zIndex: 20,
  },
  iconButton: {
    color: "#FFF",
    fontSize: 12,
    position: "absolute",
    right: 25,
    top: 20,
    borderRadius: 0,
    "&:hover": {
      color: "#000",
      background: "#FFF",
    },
    border: "1px solid #fff",
  },
  image: {
    position: "absolute",
    zIndex : 20
  },
  download: {
    position: "absolute",
  },
}));

export default function Feature() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [value, setValue] = useState(0);
  const [heading, setHeading] = useState("Facemask");
  const Screen = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const getImage = () =>  {
    takeScreenShot(ref.current);
  }
  const leftChange = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const rightChange = () => {
    if (value < 3) {
      setValue(value + 1);
    }
  };

  useEffect(() => {
    if (value === 0) {
      FaceMask(webcamRef, canvasRef);
      setHeading("Facemask");
    } else if (value === 1) {
      Lipstick(webcamRef, canvasRef);
      setHeading("Lipstick");
    } else if (value === 2) {
      GreenScreen(webcamRef, canvasRef);
      setHeading("Greenscreen");
    } else if (value === 3) {
      HandPose(webcamRef, canvasRef);
      setHeading("Handpose");
    }
  }, [value]);

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <main>
        <Box disply="flex" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            align="center"
            style={{
              userSelect: "none",
              fontSize: 20,
              letterSpacing: 6,
              marginTop: 0,
              position: "absolute",
              left: 20,
              top: 20,
              color: "#FFF",
            }}
          >
            FACEKART
          </Typography>
          <Button
            variant="outlined"
            className={classes.iconButton}
            onClick={signOut}
          >
            signOut
          </Button>
        </Box>
        <Box
          style={{
            width: Screen ? 680 : 320,
            background: "#0006",
            position: "absolute",
            zIndex: 29,
            transform: "translate(0% , -540%)",
          }}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            align="center"
            style={{ color: "#FFF", fontSize: 20 }}
          >
            {heading}
          </Typography>
        </Box>
        <div ref={ref} className={classes.webcam}>
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: Screen ? 700 : 340,
              height: Screen ? 520 : 420,
            }}
          />{" "}
          <canvas
            ref={canvasRef}
            className="output_canvas"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: Screen ? 700 : 340,
              height: Screen ? 520 : 420,
              background: "#0002",
            }}
          ></canvas>
        </div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          style={{ width: Screen ? 680 : 320 }}
        >
          <IconButton
            style={{
              color: "#FFF",
              fontSize: 20,
              padding: 20,
              background: "#0006",
            }}
            onClick={leftChange}
            disabled={value === 0 ? true : false}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            style={{
              color: "#FFF",
              fontSize: 20,
              padding: 20,
              background: "#0006",
            }}
            onClick={rightChange}
            disabled={value === 5 ? true : false}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Box
          className={classes.getImage}
          style={{ width: Screen ? 680 : 320 , marginTop : Screen ? 120 : 70}}
        >
          <IconButton
            style={{
              color: "#FFF",
              fontSize: 20,
              padding: 20,
              background: "#0006",
            }}
            onClick={getImage}
          >
            <PhotoCameraIcon />
          </IconButton>
        </Box>
        <Box className={classes.image} style={{ marginTop : Screen ? -270 : -250}}>
          {image && (
            <img
              style={{ height: "110px", width: "125px" }}
              src={image}
              alt="Screenshot"
            />
          )}
        </Box>
        <Box className={classes.download} style={{marginTop : Screen ?  -270 : -250 , marginLeft : 90}}>
          {image && (
            <IconButton
              style={{
                color: "#FFF",
                fontSize: 10,
                padding: 5,
                zIndex : 34
              }}
              onClick={downloadScreenshot}
            >
              <GetAppIcon />
            </IconButton>
          )}
        </Box>
      </main>
    </div>
  );
}
