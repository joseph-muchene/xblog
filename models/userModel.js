const mongoose = require("mongoose")
const schema = require("mongoose").Schema
 

const  userSchema = new schema({

		username:{
			type:String,
			required:true,
			maxLength:55,
		},
		email:{
			type:String,
			required:true,
			maxLength:250,
			unique:true
		},
		about:{
			type:String,
			default:"",
			maxLength:1250
		},
		password:{
			type:String,
			minLength:5,
			required:true
		},
		profilePhoto:{
			type:String,
		}
},{
	timeStamps:true
})



module.exports = mongoose.model("User",userSchema)