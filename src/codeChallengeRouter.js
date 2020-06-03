
const express = require('express');
const codeChallengeService = require('./codeChallengeService')
const codeChallengeRouter = express.Router();
const jsonBodyParser = express.json()

codeChallengeRouter
.route('/')
.get((req, res, next) => {
  codeChallengeService.getAllUser(req.app.get('db'))
  .then(data => {
    res.status(200).json(data.rows)
  })
})
.put(jsonBodyParser, async (req,res,next) => {
  const { username, phone_number, email_address, preferred_contact_method } = req.body
  const newUser = { username, phone_number, email_address, preferred_contact_method };
  Object.keys(newUser).forEach(key => {
    if(!newUser[key]){
      return res.status(500).json({
        error: `Missing ${key} in request body`
      })
    }
  })
  codeChallengeService.insertUser(req.app.get('db'), newUser)
  .then(data => {
    const newUserID = data[2].rows[0].id
    codeChallengeService.insertContact(req.app.get('db'), newUser, newUserID)
    .then(result => {
      res.status(201).json({
        "user_id": newUserID
      })
    })
  })
  .catch(next)
})

codeChallengeRouter
.route('/:user_id')
.get((req, res, next) => {
  codeChallengeService.getUser(req.app.get('db'), req.params.user_id)
  .then(data => {
    if(data.rows[0]) {
      res.status(200).json(data.rows[0])
    }
    else {
      return res.status(404).json({
        error: 'user doesn\'t exist' 
      })
    }
  })
})
.delete(async (req, res, next) => {
  const success = await codeChallengeService.deleteUser(req.app.get('db'), req.params.user_id)
  if (success) {
    res.status(200).end();
  } 
  else {
    res.status(500).end();
  }
})
.post(jsonBodyParser, async (req,res,next) => {
  const { preferred_contact_method } = req.body
  if(!preferred_contact_method) {
    return res.status(500).json({
      error: `Missing preferred_contact_method in request body`
    })
  }
  codeChallengeService.updateContact(req.app.get('db'), req.params.user_id, preferred_contact_method)
  .then(data => {
    res.status(200).end();
  })
  .catch(next)
})

module.exports = codeChallengeRouter;