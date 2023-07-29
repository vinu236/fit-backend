const {Schema,model}=require('mongoose');

const userSchema=new Schema({

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    todo:[
        {
            text: {
              type: String,
              required: true
            },
            isCompleted: {
              type: Boolean,
              default: false
            }}
          
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
});


module.exports=model('Users',userSchema);