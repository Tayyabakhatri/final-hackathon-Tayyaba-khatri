import jwt from 'jsonwebtoken';
import User  from '../Model/userModel.js'
import "dotenv/config"
import chalk from 'chalk'

const authentication = async (req, res, next) => {
    if (!req.headers.authentication) {
        return res.status(401).json({ message: "Authentication token not provided" })

    } else {
        try {
            const token = req.headers.authentication.trim().split(" ")[1]
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(chalk.blue("Decoded token: "), decoded);
            console.log(chalk.blue(decoded._doc.username));

            //check if user exist in database
            const user = await User.findById(decoded._doc.id)
            console.log(chalk.bgGreen.red("database user --->", user));
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "user not found"
                })
            }
            req.user = { id: user._id.toString(), role: user.role }
            next()

        } catch (error) {
            console.log("authentication problem", error.message);
            return res.status(401).json({
                success: false,
                message: 'Please authenticate using a valid token',
            })

        }
    }
}
export default authentication;