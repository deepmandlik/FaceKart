import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  titleSignIn: {
    fontWeight: 900,
    lineHeight: 1.15,
  },
  displayNone: {
    display: "none !important",
  },
  form: {
    padding: "1em 1.5em",
  },
  grid: {
    width: "100%",
    marginTop: 45,
    marginBottom: 40,
  },
  inputGridItem: {
    width: "100%",
  },
  input: {
    color: "#424242",
    height: 45,
    border: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: 2,
    padding: "1em",
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  errorText: {
    marginTop: 10,
    fontSize: 13,
  },
  loginButton: {
    marginTop: 25,
    height: 45,
    color: "white",
    width: "100%",
    borderRadius: 2,
    boxShadow: "none",
  },
  helpGrid: {
    marginTop: 5,
    textAlign: "center",
  },
}));

export default function SignUp({ handleClickShowSignIn }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const data = {
        name: name,
        email: email,
        password: password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      console.log(process.env.SIGNUP_URL);
      fetch("https://facekart.herokuapp.com/user/register", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate("/feature");
          localStorage.setItem('token', data.token.substr(7));
          console.log(localStorage.getItem('token'));
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.form}>
      <Hidden smDown>
        <Box mb={4}>
          <Typography variant="h4" align="left" className={classes.titleSignIn}>
            Sign Up
          </Typography>
        </Box>
      </Hidden>
      <Grid item className={classes.inputGridItem}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          name="name"
          placeholder="Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon
                  style={{
                    color: "#42A5f6",
                    fontSize: 20,
                    marginRight: 5,
                  }}
                />
              </InputAdornment>
            ),
            className: classes.input,
            disableUnderline: true,
          }}
          autoFocus={true}
          value={name}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item className={classes.inputGridItem}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon
                  style={{
                    color: "#42A5f6",
                    fontSize: 20,
                    marginRight: 5,
                  }}
                />
              </InputAdornment>
            ),
            className: classes.input,
            disableUnderline: true,
          }}
          autoFocus={true}
          value={email}
          onChange={handleEmailChange}
        />
      </Grid>
      <Grid item className={classes.inputGridItem}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon
                  style={{
                    color: "#42A5f6",
                    fontSize: 20,
                    marginRight: 5,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  style={{
                    color: "#42A5f6",
                    padding: 8,
                  }}
                >
                  {showPassword ? (
                    <Visibility style={{ fontSize: 20 }} />
                  ) : (
                    <VisibilityOff style={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            className: classes.input,
            disableUnderline: true,
          }}
          value={password}
          onChange={handlePasswordChange}
        />
      </Grid>
      <Grid item>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.loginButton}
        >
          SignUp
        </Button>
      </Grid>
      <Grid item className={classes.helpGrid}>
        <Button
          color="primary"
          onClick={handleClickShowSignIn}
          style={{ textDecoration: "none", color: "grey" }}
        >
          {" "}
          Sign In
        </Button>
      </Grid>
    </Box>
  );
}
