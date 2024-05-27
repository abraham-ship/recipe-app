import jwt from "jsonwebtoken";
import User from "../models/user.js";

const requireAuth = async (req, res, next) => {
	// to verify authentication
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({error: 'The authorization token is required'})
	}

	const token = authorization.split(" ")[1]

	try {
		// get id from the payload
		const {id} = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findOne({ id }).select('id')
		next()


	} catch(error) {
		console.log(error);
		res.status(401).json({error: 'The request is not authorized'})

	}
}

export default requireAuth