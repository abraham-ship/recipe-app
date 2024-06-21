import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
	// to verify authentication
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

	try {
		// get id from the payload
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();

	} catch(error) {
		console.log(error);
		res.status(401).json({error: 'The request is not authorized'})
	}
}

export default requireAuth