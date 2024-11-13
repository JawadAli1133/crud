const express = require('express');
const router = express.Router();
const user = require('../Models/User');
const bcrypt = require('bcryptjs');

router.post('/signup', async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    try
    {
        let existingUser = await user.findOne({email: email});
        if(existingUser)
        {
            return res.status(400).json({success: false, message:"Email Already Exists"});
        }

        const newUser = new user({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({success: true, message: "User Created Successfully"});

    }
    catch(error)
    {
        console.log("Error in schema", error);
        res.json({success: false});
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const userdata = await user.findOne({ email });
    if(!userdata)
    {
        return res.status(400).json({success: false, message: "User does not exist"});
    }
    if(!(await bcrypt.compare(password, userdata.password)))
    {
        return res.status(401).json({success: false, message: "Invalid Password"});
    }
    res.status(200).json({ success: true, message: 'Login successful', user: userdata });
   })

module.exports = router;