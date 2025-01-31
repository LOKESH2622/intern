import UserModel from "../DataModels/usermodel.js";

export const UserAuth = async (req, res) => {
    const COOKIE_NAME = "Lokesh";

    try {
        // Get the email from the cookie
        const email = req.cookies[COOKIE_NAME];
        if (!email) {
            return res.status(401).json({ message: "Unauthorized! No valid cookie found." });
        }

        // Find the user by email
        const user = await UserModel.findOne({ EmailId: email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Check if the user is verified
        if (!user.verified) {
            return res.status(403).json({ message: "User account is not verified!" });
        }

        // Return success response with user information
        return res.status(200).json({
            message: "User is valid and authenticated.",
            user: {
                id: user._id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.emailid
            },
        });
    } catch (error) {
        console.error("Error during user authentication:", error);
        return res.status(500).json({ message: "An error occurred during authentication", error });
    }
};
