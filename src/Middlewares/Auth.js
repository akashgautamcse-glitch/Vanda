const adminAuth = (req,res,next)=> {
  console.log("Admin Auth is getting Checked");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if(!isAuthorized){
    res.status(401).send("unAuthorized User");
  }
    else{
      next();
    }
};

const userAuth = (req,res,next)=> {
  console.log("User Auth is getting Checked");
  const token = "xyz";
  const isAuthorized = token === "xyzs";
  if(!isAuthorized){
    res.status(401).send("unAuthorized User");
  }
    else{
      next();
    }
}

module.exports = {
  adminAuth,
  userAuth,
}