import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Input from "./../Input";

import "./styles.css";

/* Component for the SignUpForm page */
class SignUpForm extends React.Component {
  render() {
    const {
      userName,
      password,
      age,
      favMeal,
      handleChange,
      addAccount
    } = this.props;

    return (
      <Grid className="signUp-form" container spacing={6}>
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

        <Input
          name="age"
          value={age}
          onChange={handleChange}
          label="Age"
        />

        <Input
          name="favMeal"
          value={favMeal}
          onChange={handleChange}
          label="Favourite Meal"
        />

        <Grid
          className="signUp-form_button-grid"
          item
          xs={12}
        >
         <Link className="signUp_button-link" to={"./components/Timeline"}>
          <Button
            variant="contained"
            color="primary"
            onClick={addAccount}
            className="signUp-form__submit-button"
          >
            Sign Up
          </Button>
        </Link>
        </Grid>
      </Grid>
    );
  }
}

export default SignUpForm;