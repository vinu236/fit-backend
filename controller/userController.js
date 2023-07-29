const USER = require("../model/userModel");
const jwt = require("../middleware/auth");
const bcrypt=require('bcrypt');

exports.Signup = async (req, res, next) => {
  try {
    const{email,password}=req.body;

    const userCheck=await USER.findOne({email});

    if(userCheck){
    const err=new Error("User already exist");
    err.status=409;
    return next(err)
    }
    const hashPassword=await bcrypt.hash(password,10);
    console.log(hashPassword)

    const userData={
      email,
      password:hashPassword
    }
    const createCred=await USER.create(userData);
    res.status(201).json({message:"created"})
  } catch (error) {
  throw new Error(error)  
  }
};
exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userValidCheck =await USER.findOne({ email: email });
    const isValidUser = userValidCheck && await bcrypt.compare(password, userValidCheck.password);
    if (!isValidUser) {
      const err = new Error('Invalid User or Password');
      err.status = 404;
      return next(err);
    }

    const accessToken = await jwt.generateAccessToken(userValidCheck);
    res.status(200).json({
      uid: userValidCheck._id,
      email: userValidCheck.email,
      uToken: accessToken,
    });
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};





exports.getTodo = async (req, res, next) => {
  try {
    const{uid}=req.params
    console.log("asdjaksdahkdhadhakhdhdhdhdhdhdhdbddbdbdb")
    console.log(uid)  
   
    const getTodoData=await USER.findById({_id:uid})
    console.log(getTodoData.todo)
    res.status(200).json(getTodoData.todo);
  } catch (error) {
    console.log(error)
  }
};

exports.postTodo = async (req, res, next) => {

  try {
    console.log(req.params)
  const{uid}=req.params;
  const userCheck=await USER.findOne({_id:uid});

      if(!userCheck){
        const err=new Error("Invalid user");
         err.status=404;
         return next(err)

      }
      userCheck.todo.push(req.body)
      await userCheck.save()
      res.status(201).json(userCheck)
  } catch (error) {
    throw new Error(error)
  }
};

exports.patchTodo = async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  console.log("adsfgsaf")
  try {
    const{listId,uid}=req.params;
    const{isComplete}=req.body;
    const updatedTodo = await USER.findOneAndUpdate(
      { _id: uid, 'todo._id': listId },
      { $set: { 'todo.$.isCompleted': !isComplete } },
      { new: true }
    );

    if(!updatedTodo){
      return res.status(404).json({error:"Todo not Found"})
    }
    res.status(200).json({message:"successfully updated"})
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const {listId,uid}=req.params;
    console.log("*******************************************************************8***")
    
    console.log(uid)
    console.log(`listId is ${listId}`);

    const deleteTodo = await USER.findByIdAndUpdate(
        uid,
      { $pull: { todo: { _id: listId } } },
      { new: true }
    );

    res.status(200).json({message:"todo delete successfully"})
  } catch (error) {
    console.log(error)
  }
};  

exports.isCompletedTodo=async(req,res,next)=>{
  try {
      const {uid}=req.params;

      const user = await USER.findById(uid);
      const completedTodos = user.todo.filter((todo) => todo.isCompleted === true);      
      res.status(200).json(completedTodos);
      // res.status(200).json(completedTodos.todo);
  } catch (error) {
    console.log(error)
  }
}

exports.patchEditTodo = async (req, res, next) => {
  console.log(req.params);
  try {
    const{listId,uid}=req.params;
    console.log(req.body);
    const updatedTodo = await USER.findOneAndUpdate(
      { _id: uid, 'todo._id': listId },
      { $set: { 'todo.$.text': req.body.text } },
      { new: true }
    );

    if(!updatedTodo){
      return res.status(404).json({error:"Todo not Found"})
    }
    res.status(200).json({message:"successfully updated"})
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};