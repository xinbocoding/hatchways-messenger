import React, { Component, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, CssBaseline, Button, makeStyles } from "@material-ui/core";
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
  },
}));

const Home = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoggedIn: false,
  //   };
  // }
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

  // componentDidMount() {
  //   this.props.fetchConversations();
  // }

  const handleLogout = async () => {
    await logout(user.id);
  };

  // render() {
  //   if (!this.props.user.id) {
  //     // If we were previously logged in, redirect to login instead of register
  //     if (this.state.isLoggedIn) return <Redirect to="/login" />;
  //     return <Redirect to="/register" />;
  //   }
  //   return (
  //     <>
  //       {/* logout button will eventually be in a dropdown next to username */}
  //       <Button className={classes.logout} onClick={this.handleLogout}>
  //         Logout
  //       </Button>
  //       <Grid container component="main" className={classes.root}>
  //         <CssBaseline />
  //         <SidebarContainer />
  //         <ActiveChat />
  //       </Grid>
  //     </>
  //   );
  // }

  return (
    <>
      {!user.id && (
        <>
          {isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/register" />}
        </>
      )}
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        <Button className={classes.logout} onClick={handleLogout}>
          Logout
        </Button>
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
