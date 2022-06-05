const mongoose = require("mongoose")
const schema = require("mongoose").Schema
const ObjectId = require("mongoose").Schema.Types.ObjectId
const ArticleSchema = new schema({
	user:{
		type:ObjectId,
		ref:"User"
	},
	title:{
		type:String,
		required:true,
		unique:true,
		maxLength:250,		
	},
	text:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	}
},{
	timeStamps:true
})



module.exports = mongoose.model("Article",ArticleSchema)