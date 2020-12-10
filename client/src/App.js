/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

// Importing the Queue and our simple Home Page
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Timeline from './components/Timeline';
import UserTimeline from './components/UserTimeline';
import AccountInfo from './components/AccountInfo/AccountInfo';
import Admin from './components/Admin/Admin';
import PostRecipePage from "./components/PostRecipePage";

// Imports for profile pictures of posts and reviews.
import profilePic from "./images/profile.png";
import adminPic from "./images/admin.png";
import { checkSession } from "./actions/user";

class App extends React.Component {

  constructor(props) 
  {
      super(props);
      checkSession(this); //checks session to see if the user is still logged in
  }

  // global state passed down includes the current logged in user.
  state = {
    currentUser: null
  }

  render() {
    const {currentUser} = this.state;

    return (
        <div>
        <BrowserRouter>
          <Switch> 
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path="/" render={props => <Home {...props} app={this} />} />
            <Route exact path='/SignUp' render={props => <SignUp {...props} app={this}/>} />
            <Route exact path='/LogIn' render={props => <LogIn {...props} app={this}/>} />
            <Route exact path='/PostRecipePage' render={props => <PostRecipePage {...props} app={this}/>} />
            <Route exact path='/UserTimeline' render={props => <UserTimeline {...props} app={this}/>} />
            <Route exact path='/AccountInfo' render={props => <AccountInfo {...props} app={this}/>} />
            <Route exact path='/Admin' render={props => <Admin {...props} app={this}/>} />
            <Route
               exact path={["/", "/SignUp", "/LogIn", "/Timeline", "/PostRecipePage", "/UserTimeline", "/AccountInfo", "/Admin"]}
               render={ props => (
                <div className="app">
                {!currentUser ? <Home {...props} app={this} /> : <Timeline {...props} app={this} />}
                </div>                   
                )}
             />
             { /* Default webpage if the URL is not an expected one  */ }
             <Route render={() => <div>404 Not found</div>} /> 
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;


