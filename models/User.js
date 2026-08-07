import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },

    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    otp: { type: String, minlength: 6, maxlength: 6, trim: true },
    otpExpires: Date,
}, {
    timestamps: true,
    versionKey: false,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare the user password with the saved password
userSchema.methods.matchPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
}

const User = mongoose.model('User', userSchema);

export const getUsers = () => User.find();
export const getUserByEmail = (email) => User.findOne({ email });
export const getUserById = (id) => User.findById(id);
export const createUser = (values) => new User(values).save().then(user => user.toObject());
export const deleteUserById = (id) => User.findOneAndDelete({ _id: id });
export const updateUserById = (id, values) => User.findByIdAndUpdate(id, values);

export default User;