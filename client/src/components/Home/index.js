import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {

  constructor(props) {
    super(props);

    if(this.props.app.state.currentUser!==null)
    {
      this.props.history.push("/Timeline");
    }
}

  render() {
    return (
    <div>
    <div className="home_image center3"></div>
        <Link className="signup_button-link center" to={"./../SignUp"}>
          <Button className="signup_button">Sign Up</Button>
        </Link> 
      <Link className="login_button-link center2" to={"./../LogIn"}>
          <Button className="login_button">Log In</Button>
        </Link> 
      </div>
    );
  }
}

export default Home;