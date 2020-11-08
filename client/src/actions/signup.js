import profilePic from "../images/profile.png";

// Methods in this file modifies the SignUp component state
const log = console.log;

// Function to add an account
export const addAccount = signup => {
  const accountList = signup.props.appState.accounts;

  const account = {
    userName: signup.state.userName,
    profilePic: profilePic,
    password: signup.state.password,
    age: signup.state.age,
    favMeal: signup.state.favMeal,
    posts: [],
    isLoggedIn: true,
    isAdmin:false,
    likes: [],  // 1 = like, 0 = dislike
    savedPosts: []
  };
  
  accountList.push(account);
  signup.props.appState.currentUser = account;

  signup.setState({
    accounts: accountList
  });
};

// Function to verify an account
export const checkAccount = signup => {
  const accountList = signup.state.accounts;
  const app_accountList = signup.props.appState.accounts;

  const account = {
    userName: signup.state.userName,
    password: signup.state.password
  };
  
  const temp = account.userName
  const temp2 = account.password

  if (temp.valueOf()==="user"||temp.valueOf()==="admin"){
    if (temp2.valueOf()===("user")||temp.valueOf()==="admin"){
      let temp3='';
      if (temp.valueOf()==="user"){
          temp3 = "user";
          signup.props.appState.currentUser=app_accountList[0];
      }  
      if (temp.valueOf()==="admin"){
          temp3 = "admin"
          signup.props.appState.currentUser=app_accountList[1];
      }  

      for(let i=0; i<app_accountList.length; i++)
      {
        if(app_accountList[i].userName.valueOf()===(temp3))
        {
          app_accountList[i].isLoggedIn=true;
          break;
        }
      }
      signup.setState({
        flag:true
      });
    }
  }
  else
  {
    signup.setState({
        flag:false
      });
  }
  
};

export const signOut = signup => {
  const app_accountList = signup.props.appState.accounts;
  
   for(let i=0; i<app_accountList.length; i++)
   {
        if(app_accountList[i].isLoggedIn.valueOf()===(true))
        {
          app_accountList[i].isLoggedIn=false;
          signup.props.appState.currentUser=null;
          break;
        }
   }
 

};

  
