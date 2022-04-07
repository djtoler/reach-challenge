const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:  {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        picture: {type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
    },
    {
        timestamps: true
    }
)

// FUNCTION TO COMPARE IF PASSWORDS MATCH
// access the methods property on userSchema, then create a method that compares passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// FUNCTION TO ENCRYPT PASSWORD BEFORE SAVING IT TO THE DATABASE
// call the .pre function on userSchema & pass in save
userSchema.pre('save', async function (next){

    if (!this.isModified) {
        next()
    }

    // ENCRYPTING PASSWORD...
    // set salt to the genSalt function that comes with bcrypt package
    // pass in 10 for the level of password strength
    const salt = await bcrypt.genSalt(10);
    // set current password to the hash function that comes with bcrypt package
    // pass in current password and the salt variable
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;