import userSchema from "../Schema/userSchema.js"
import User from "../Model/userModel.js";
import bcrypt from "bcrypt"

export  const createUser = async (req, res) => {
    try {
        console.log("received body", req.body);


        const validatedUser = await userSchema.validateAsync(req.body)
        const password = bcrypt.hashSync(validatedUser.password, 10)

        const newUser = await new User({ ...validatedUser, password: password });
        await newUser.save();


        res.status(201).json({
            message: "user has created",
            user: newUser
        })

    } catch (err) {
        if (err?.code === 11000) {
            return res.status(409).json({
                message: "this email is in use",
                error: err.message
            })
        }
        res.status(500).json({
            message: "internal server error ",
            error: err.message
        })
    }
}
//loginUser
 export const loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            console.log(chalk.bgCyan.blue("email or password not found"));

            return res.status(400).json({
                success: false,
                message: "enter correct credentials"
            })
        }

        //first validating through email
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }
        //then match pasword
        const compare = await bcrypt.compare(req.body.password, user.password)
        if (!compare) {
            return res.status(401).json({
                success: false,
                message: "unauthorized user"
            })
        }

        var token = jwt.sign({ ...user }, process.env.JWT_SECRETKEY)
        console.log(chalk.bgBlue.white(token));

        res.status(200).json({
            success: true,
            message: "user Sign in",
            user: user.id,
            token,
            role:user.role
        })
    } catch (error) {
        console.log(chalk.bgRed.white(error));
        res.status(500).json({ message: "Internal server error", error });
    }
}
// export default createUser