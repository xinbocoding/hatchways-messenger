import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";

// const styles = {
//   root: {
//     height: "97vh",
//   },
// };

const useStyle = makeStyles(() => ({
  root: {
    height: "97vh",
    marginTop: '6%'
  },
  appbar: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = (props) => {
  const classes = useStyle();

  const { logout, fetchConversations } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = props.user || {};

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);
  }, [user.id]);

  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <>
      {!user.id && (
        <>
          {isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/register" />}
        </>
      )}
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <div className={classes.appbar}>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Chat Room
              </Typography>
              <Button onClick={this.handleLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <SidebarContainer />
          <ActiveChat />
        </Grid>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
    fetchConversations: () => {
      dispatch(fetchConversations());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
