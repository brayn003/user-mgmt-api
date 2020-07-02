const express = require('express');
const jwt = require('jsonwebtoken');


const User = require('./models/User');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User Mgmt Backend is working!!!')
});

// READ path
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// READ path
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.send(user);
})


// WRITE path
router.post('/user', async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
})

const PRIVATE = 'qrtyuiop';

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email: email});
  if(user) {
    if(user.password === password) {

      const token = jwt.sign(user.toJSON(), PRIVATE);
      
      res.send({token: token})
    } else {
      res.status(401).send({message: 'password incorrect'});
    }
  } else {
    res.status(401).send({message: 'User does not exist'});
  }


});


const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, PRIVATE);
    req.user = decoded;
  } catch(err) {
    return res.status(401).send({message: 'uauthorized'})
  }
  next();
}

router.get('/protected', authMiddleware, (req, res) => {
  res.send({message: 'YAY you are now logged in'});
})




















module.exports = router;
