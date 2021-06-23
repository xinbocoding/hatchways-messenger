import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import MainPage from "./MainPage";

const useStyles = makeStyles((theme) => ({
  navButton: {
    textAlign: "center",
    variant: "contained",
    background: "white",
    height: 50,
    width: 160,
  },
  formButton: {
    height: 60,
    width: 160,
  },
  navBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft:10,
    paddingTop: 40,
    paddingRight: 40,
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  suggestionLine: {
    paddingRight: 40,
  },
  formHeader: {
    fontWeight: 600,
    paddingBottom: 60,
  },
  formTextField: {
    width: "90%",
  },
  form: {
    width: '100%'
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <MainPage>
      <Grid item xs={12}>
        <Box className={classes.navBox}>
          <Typography className={classes.suggestionLine} color="secondary">
            Already have an account?
          </Typography>
          <Paper elevation={3}>
            <Button
              className={classes.navButton}
              color="primary"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.formContainer}>
        <Box className={classes.formBox}>
          <Typography className={classes.formHeader} variant="h4">
            Create an account.
          </Typography>
          <form onSubmit={handleRegister} className={classes.form}>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <FormControl className={classes.formTextField}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formTextField}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formTextField}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* <Grid item>
                <FormControl error={!!formErrorMessage.confirmPassword} className={classes.formTextField}>
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid> */}
              <Button type="submit" variant="contained" color="primary" size="large">
                Create
              </Button>
            </Grid>
          </form>
        </Box>
      </Grid>
    </MainPage>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
