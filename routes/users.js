const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
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
        // hash password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            // set password to hash
            newUser.password = hash
            // save user
            newUser.save()
            .then(() => {
                    console.log('========= NEW USER CREATED ===========')
                    console.log(newUser);
                    console.log('========= NEW USER CREATED ===========')
                    req.flash('success_msg', 'Registered! Please login here')
                    res.redirect('/login')
                })
                .catch(err => console.log(err))

            }))
        }
    })
    }
} )

// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

// Logout handle
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {return next(err)}
        req.flash('success_msg', 'You are logged out')
        res.redirect('/login')
    })
})



module.exports = router