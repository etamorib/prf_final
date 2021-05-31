const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;
const basicPermission = process.env.READ_PERMISSION;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  permissionLevel: {type: Number, required:true, default: basicPermission}
});


userSchema.pre('save', async function(next) {
  const user = this;
  console.log('Before saving');
  if(user.isModified('password')) {
    try { 
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch(error) {
      console.log('Creating hashed password');
      return next(error);
    }
  }
});

userSchema.pre('findOneAndUpdate', async function(next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10);
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
  
});

userSchema.methods.comparePassword = async function(enterPassword, nx){
  return await bcrypt.compare(enterPassword, this.password, (err, isMatch) => {
    nx(err, isMatch);
  });
}

const User = mongoose.model('Users', userSchema);

exports.findByEmail = async (email) => {
  const user = await User.find({email: email});
  return user[0];
};

exports.findById = async (id) =>{
  let result = await User.findById(id);
  result = result.toJSON();
  delete result._id;
  delete result.__v;
  return result;
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.listAll = async () => {
  return await User.find();
};


exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate({
    _id: id
  }, userData);
};


exports.removeById =  (userId) => {
  User.findByIdAndDelete(userId, (err, docs) => {
    if(err) {
      console.log('Error happened during deleting user with id: ' + userId);
    }
    else {
      console.log(docs + ' have been removed');
    }
  });
};

