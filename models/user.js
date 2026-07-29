const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  FirstName : {
    type : String,
  },
  LastName : {
    type : String,
  },
  gmail_id : {
    type : String,
  },
  Password : {
    type : String,
  },
  age : {
    type : Number,
  },
  gender : {
    type : String,
  }
})

const user = mongoose.model("User", userSchema);

module.exports = {
  user,
}