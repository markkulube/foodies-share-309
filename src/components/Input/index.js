import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import "./styles.css";

/* Component for the Input field*/
class Input extends React.Component {
  render() {
    const { label, value, onChange, name, type } = this.props;

    return (
      <Grid className="input-form" item xs={12}>
        <TextField 
          name={name}
          type={type}
          label={label}
          id="margin-normal"
          defaultValue={value || ""}
          className="input"
          margin="normal"
          onChange={onChange}
          multiline={false}
        />
      </Grid>
    );
  }
}

export default Input;