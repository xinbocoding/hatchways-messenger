import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
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
    height: 70,
    width: 200,
    fontSize: 20,
    fontWeight: 800,
    marginTop: '9%',
    marginLeft: '30%'
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
    marginLeft: '20%'
  },
  formContainer: {
    height:600,
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
    width: "100%",
  },
  form: {
    width: '70%'
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <MainPage>
      <Grid item xs={12}>
        <Box className={classes.navBox}>
          <Typography className={classes.suggestionLine} color="secondary">
            Don't have an account?
          </Typography>
          <Paper elevation={3}>
            <Button
              className={classes.navButton}
              color="primary"
              onClick={() => history.push("/register")}
            >
              Create account
            </Button>
          </Paper>
        </Box>
      </Grid>
      <Grid className={classes.formContainer} item xs={12}>
        <Box pt={8} className={classes.formBox}>
          <Typography className={classes.formHeader} variant="h4">
            Welcome Back!
          </Typography>
          <form onSubmit={handleLogin} className={classes.form}>
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <FormControl
                  margin="normal"
                  required
                  className={classes.formTextField}
                >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl
                  margin="normal"
                  required
                  className={classes.formTextField}
                >
                  <TextField
                    label="password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.formButton}
                >
                  Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
