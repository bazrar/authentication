const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  try {
    //   lets validate the data before we make a user
    const value = await registerValidation(req.body);
    const { name, email, password } = value;

    // checking if the user already exists in the database
    const emailExists = await User.findOne({ email });

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash  = await bcrypt.hash(password, salt); 


    if (emailExists) {
      return res.status(400).send({
        status: 'fail',
        msg: 'email already exists',
      });
    }
    const user = new User({
      name,
      email,
      password: hash,
    });
    const savedUser = await user.save();
    res.status(201).json({
      status: 'success',
      data: {id: savedUser._id}
    });
  } catch (err) {
    res.status(400).json({
      status: 'err',
      msg: err.details[0].message,
    });
  }
});

router.post('/login', async (req,res) => {
  try {
    const value = await loginValidation(req.body);
    const {email, password}  = value; 
    const user= await User.findOne({email})
    // console.log(user)
    if(!user) {
      return res.status(400).json({status: 'fail', message: "the email or password is wrong"})
    }

    // PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass) {
      res.status(400).json({
        status: 'fail', 
        message: 'Invalid password'
      })
    }


    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '1W'})

    res.header('auth-token', token).send(token)

    }catch(err) {
    res.status(404).json({
      status: 'error', 
      msg: err.details[0].message
    })
  }
})

module.exports = router;
