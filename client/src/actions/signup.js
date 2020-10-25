// Methods in this file modifies the SignUp component state
const log = console.log;

// Function to add an account
export const addAccount = signup => {
  const accountList = signup.state.accounts;

  const account = {
    userName: signup.state.userName,
    password: signup.state.password,
    age: signup.state.age,
    favMeal: signup.state.favMeal
  };
  
  accountList.push(account);

  signup.setState({
    accounts: accountList
  });

  log(signup.state.accounts);
};

// Function to verify an account
export const checkAccount = signup => {
  const accountList = signup.state.accounts;

  const account = {
    userName: signup.state.userName,
    password: signup.state.password
  };
  
  const temp = account.userName
  const temp2 = account.password

  if (temp.valueOf()==="user"){
    if (temp2.valueOf()===("user")){
      log("true");
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

  
