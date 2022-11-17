const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      require: [true, 'Name must be required'],
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Email must be required'],
    },

    password: {
      type: String,
      trim: true,
      required: [true, 'Password must be required'],
      minLength: [6, 'Password must be at least 6 characters'],
    },

    // randomGeneratedString: {
    //   type: String,
    //   minLength: 5,
    //   maxlength: 5,
    // },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  let user = this // this: is a document created in mongoose

  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error)
    } else {
      user.password = hash // hash is a new password
      next() // next() to next step: save hash password into DB
    }
  })
})

// userSchema.pre('save', async function (next) {
//   const randomInteger = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }
//   this.randomGeneratedString = Math.random()
//     .toString(36)
//     .substr(2, randomInteger(1, 9))
//   next()
// })

const User = mongoose.model('User', userSchema)

// exports to use it later
module.exports = User