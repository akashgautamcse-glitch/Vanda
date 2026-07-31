const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  FirstName : {
    type : String,
    required : true,
    maxLength : 20,
  },
  LastName : {
    type : String,
    maxlength : 50,
  },
  gmail_id : {
    type : String,
    required : true,
    lowercase : true,
    trim : true,
    unique : true,
  },
  Password : {
    type : String,
    required : true,
  },
  age : {
    type : Number,
    min : 18,
    validate(value){
      if(!["male", "female", "others"].include(value)){
        throw new Error("choose valid gender");
      }
    }
  },
  gender : {
    type : String,
  },
  Bio : {
    type : String,
    default : "This is default a description",
    maxLength : 100,
  },
  Photo_URL : {
    type : String,
    default : "https://imgs.search.brave.com/9FMIcS4iOWxn3c5sr7V0xb-7U6pGsaxB-qiP0gde5P8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDIv/MzMyLzA5Ni9zbWFs/bC9kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tcHJvZmls/ZS1wbGFjZWhvbGRl/ci1hbm9ueW1vdXMt/dXNlci1tYWxlLW5v/LXBob3RvLXdlYi10/ZW1wbGF0ZS1kZWZh/dWx0LXVzZXItcGlj/dHVyZS1mb3Itc29j/aWFsLW5ldHdvcmtz/LXJlc3VtZS1mb3J1/bXMtYW5kLWRhdGlu/Zy1zaXRlcy1ncmV5/LXBob3RvLXBsYWNl/aG9sZGVyLWZyZWUt/dmVjdG9yLmpwZw",
    
  },
  skills : {
    type :  [String],
  }
}, {timestamps : true})

const user = mongoose.model("User", userSchema);

module.exports = {
  user,
}