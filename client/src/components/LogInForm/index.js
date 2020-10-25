import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Input from "./../Input";

import "./styles.css";

/* Component for the LogInForm page */
class LogInForm extends React.Component {
  render() {
    const {
      userName,
      password,
      handleChange,
      checkAccount
    } = this.props;

    return (
      <Grid className="logIn-form" container spacing={6}>
        {/* Inputs to add account */}
        <Input
          name="userName"
          value={userName}
          onChange={handleChange}
          label="Username"
        />

        <Input
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />

        <Grid
          className="logIn-form_button-grid"
          item
          xs={12}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={checkAccount}
            className="logIn-form__submit-button"
          >
            Sign Up
          </Button>   
        </Grid>
      </Grid>
    );
  }
}

export default LogInForm;