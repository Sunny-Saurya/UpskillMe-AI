const User = require("../models/User")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

// Generate JWT TOken
const generateToken = (userId) =>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn:"7d"});

};

const registerUser = async (req, res) => {

    try{
        const{name, email, password, profileImageUrl} = req.body;

        // check if user already exists
    const userExists = await User.findOne({ email})

    if(userExists){
        return res.status(400).json({message: "User already exists"});

    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl
    });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id)
    });
    }
    catch(error){
        console.error("Error in registerUser:", error);
        res.status(500).json({message: "Internal server error"});
    }

    
    
};


const loginUser = async (req, res) => {

    try{
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });

    }
    catch(error){
        console.error("Error in loginUser:", error);
        res.status(500).json({message: "Internal server error"});
    }
    
};

const getUserProfile = async (req, res) => {
    try{

        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);

    }
    catch(error){
        console.error("Error in getUserProfile:", error);
        res.status(500).json({message: "Internal server error"});
    }
}


module.exports = {registerUser, loginUser, getUserProfile};