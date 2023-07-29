const express=require('express');
const router=express.Router();
const userController=require('../controller/userController')
const auth=require("../middleware/auth")


// router.get('/login',(req,res)=>{
//     res.send('asdasd')
// });

router.post('/home',userController.Login);
router.post('/signup',userController.Signup);
router.get('/todo/:uid',auth.verifyToken,userController.getTodo);
router.delete('/todo/:listId/:uid',auth.verifyToken,userController.deleteTodo);
router.patch('/todo/:listId/:uid',userController.patchTodo);
router.patch('/editTodo/:listId/:uid',userController.patchEditTodo);
router.post('/todo/:uid',userController.postTodo);
router.get('/todo/isComplete/:uid',userController.isCompletedTodo);




module.exports=router;