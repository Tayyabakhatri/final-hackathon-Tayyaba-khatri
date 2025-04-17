import mongoose from "mongoose";

const databaseUserSchema = mongoose.Schema({
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },
	isCustomer:{
		type:Boolean,
		default:false
	}
})
databaseUserSchema.index({email:1},{unique:true})
const Users = mongoose.model("Users",databaseUserSchema)

export default Users