const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => res.render('index'))
router.get('/register', (req, res) => res.render('register'))
// register user
router.post('/register', (req, res) => {
    const {username, email, password, password2} = req.body
    let errors = []
    
    // check required fields
    if (!username || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all required fields'})
}

// check that passwords match
    if (password != password2) {
        errors.push({msg: 'Passwords do not match'})
}
// check password length
    if (password.length < 6) {
        errors.push({msg: 'Password must be at least 6 characters'})
}

    if (errors.length > 0) {
        res.render('register.ejs', {
        errors,
        username,
        email,
        password,
        password2
})
} else {
User.findOne({email: email})

.then(user => {
    if(user) {
        errors.push({msg: 'Email already exists'})
        res.render('register.ejs', {
            errors,
            username,
            email,
            password,
            password2
        })
    } else {
        const newUser = new User({
            username,
            email,
            password
        })
        console.log('========= NEW USER CREATED ===========')
        console.log(newUser);
        console.log('========= NEW USER CREATED ===========')
        newUser.save()
            .then(user => {
                req.flash('success_msg', 'Registered! Please login')
                res.redirect('/')
            })
    }
})
}
} )

module.exports = router