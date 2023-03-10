const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.sahar = (req, res) => {
    res.send({message: 'users module'})
}

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err)=>{
        if(err){
            res.status(400).send(err);
        }
        res.send(user);
    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User Not Found With This Email !, Please SignUp'
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email & Password doesnt match'
            })
        }
        const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET);
        res.cookie('token', token, {expire: new Date()+ 8500000})
        const {_id, name, email, role} = user;
        return res.json({
             token, user:{_id, name, email, role}
        })
    })
}

exports.signout = (req, res)=>{
    res.clearCookie('token');
    res.json({
        message: 'User Signout ..'
    })
}