const express = require('express')
const sharp = require('sharp')
const multer = require('multer')
const User = require('../models/User')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(200).send({ user: user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user: user, token })
  } catch (e) {
    res.status(400).send({ error: 'Unable to login' })
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    updates.forEach(update => {
      req.user[update] = req.body[update]
    })
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    sendCancellationEmail(req.user.email, req.user.name)
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

const upload = multer({
  limits: {
    fileSize: 1000000 // 1 megabytes
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error('Please upload an image with .jpg, .jpeg, or .png type.')
      )
    }
    cb(undefined, true)
  }
})

router.post(
  '/users/me/avatar',
  auth,
  upload.single('upload'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({ avatar: req.user.avatar })
  },
  (error, erq, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

router.delete(
  '/users/me/avatar',
  auth,
  upload.single('upload'),
  async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send({ avatar: req.user.avatar })
  },
  (error, erq, res, next) => {
    res.status(400).send({ error: error.message })
  }
)

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user.avatar) {
      res.set('Content-Type', 'image/jpg')
      res.send({ result: 'Avatar added to profile' })
    } else {
      throw new Error('image not found')
    }
  } catch (e) {
    res.status(404).send({ error: 'no image found' })
  }
})

module.exports = router
