const validator = require('validator');
const validationsignup = (req) =>{
  const{FirstName, LastName, email_id, Password} = req.body;

  if(!FirstName.length || !LastName.length){
    throw new Error("Please Enter your full Name");
  }
  else if(!validator.isEmail(email_id)){
    throw new Error("Please enter valid email");
  }
  else if(!validator.isStrongPassword(Password)){
    throw new Error("Password is not strong enough!");
  }
}

module.exports = {
  validationsignup
}
