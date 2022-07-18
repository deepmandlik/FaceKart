import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import SignIn from "../components/Auth/signIn";
import SignUp from "../components/Auth/signUp";
import Image from "../media/home.jpg";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    background: "#0002",
  },
  content: {
    padding: "2em 0em",
    minHeight: "100vh",
  },
  backdrop: {
    zIndex: 99,
    color: "#fff",
  },
  title: {
    fontWeight: 900,
    lineHeight: 1.15,
    color: "#FFF",
  },
  titleHyperlink: {
    color: "#0D47A1",
    textDecoration: "none",
  },
  titleDescription: {
    fontSize: "1.5rem",
  },
  titleBox: {
    backgroundColor: "#455a64",
    height: 180,
    padding: "2.5em 1.5em",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      borderTopRightRadius: 2,
      borderTopLeftRadius: 2,
    },
  },
  subHeading: {
    fontSize: 13,
    color: "#9E9E9E",
  },
  contentBox: {
    width: 420,
    backgroundColor: "#0009",
    padding: "2.5em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  displayNone: {
    display: "none !important",
  },
  loginBox: {
    width: 350,
    height: 550,
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    [theme.breakpoints.down("sm")]: {
      height: 600,
      justifyContent: "space-between",
      borderRadius: 2,
    },
  },
  grid: {
    width: "100%",
    marginTop: 45,
    marginBottom: 40,
  },

  helpGrid: {
    marginTop: 16,
    textAlign: "center",
  },
  footer: {
    height: 40,
    width: "100%",
    marginBottom: 10,
    padding: "15 5",
  },
  footerGrid: {
    width: "100%",
    height: "100%",
  },
  footerIndiaText: {
    fontSize: 12,
  },
  semiCircle: {
    position: "absolute",
    zIndex: 0,
    transform: "translate(0%, 0%)",
    width: 400,
    height: 550,
    borderRadius: "0 400px 400px 0",
    backgroundColor: "#455a64",
    opacity: 0.1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();

  const handleClickShowSignIn = () => {
    setShowSignIn(true);
  };

  const handleClickShowSignUp = () => {
    setShowSignIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/feature");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <main>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            spacing={3}
          >
            <Box display="flex">
              <Hidden smDown>
                <Box className={classes.semiCircle}></Box>

                <Box className={classes.contentBox}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    style={{ zIndex: 5 }}
                  >
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        align="center"
                        style={{
                          userSelect: "none",
                          fontSize: "0.8em",
                          letterSpacing: 6,
                          color : '#FFF'
                        }}
                      >
                        FACEKART
                      </Typography>
                    </Grid>
                  </Box>
                  <Box style={{ zIndex: 5 }}>
                    <Grid item>
                      <Typography
                        variant="h3"
                        align="left"
                        className={classes.title}
                        style={{ color: "#FFF" }}
                      >
                        Welcome to<br></br>
                        Facekart{" "}
                      </Typography>
                    </Grid>
                  </Box>
                  <Box
                    style={{
                      border: "1 solid #FFF",
                      zIndex: 5,
                    }}
                  ></Box>
                </Box>
              </Hidden>
              <Box className={classes.loginBox}>
                <Hidden mdUp>
                  <Box className={classes.titleBox}>
                    <Grid item>
                      <Typography
                        variant="h4"
                        align="left"
                        className={classes.title}
                        style={{ color: "#FFF", fontSize: 40 }}
                      >
                        Welcome to<br></br>
                        Facekart
                      </Typography>
                    </Grid>
                  </Box>
                </Hidden>
                {showSignIn ? (
                  <SignIn handleClickShowSignUp={handleClickShowSignUp} />
                ) : (
                  <SignUp handleClickShowSignIn={handleClickShowSignIn} />
                )}
                <Hidden mdUp>
                  <Box>
                    <footer className={classes.footer}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.footerGrid}
                      >
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            align="center"
                            style={{
                              userSelect: "none",
                              fontSize: "0.6em",
                              letterSpacing: 6,
                              marginTop: 0,
                            }}
                          >
                            FACEKART
                          </Typography>
                        </Grid>
                      </Grid>
                    </footer>
                  </Box>
                </Hidden>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
