/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

// Importing the Queue and our simple Home Page
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Timeline from './components/Timeline';
import AccountInfo from './components/AccountInfo/AccountInfo';

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  state = {
    accounts:[{ username: "user", password: "user", age: "404", typeMeal: "Filet Mignon"},
      { username: "admin", password: "admin", age: "30", typeMeal: "Sliced Oranges" }]
  }

  render() {
    return (
        <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' render={() => 
                            (<Home appState={this.state}/>)}/>
            <Route exact path='/SignUp' render={() => 
                            (<SignUp appState={this.state}/>)}/>
            <Route exact path='/LogIn' render={() => 
                            (<LogIn appState={this.state}/>)}/>
            <Route exact path='/Timeline' render={() => 
                            (<Timeline appState={this.state}/>)}/>
            <Route exact path='/AccountInfo' render={() => 
                            (<AccountInfo appState={this.state}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;