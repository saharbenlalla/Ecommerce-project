const User =  require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
           return res.status(404).json({
            error: "User Not Found"
           }) 
        }
        
        req.profile = user;
        next();
    })
}