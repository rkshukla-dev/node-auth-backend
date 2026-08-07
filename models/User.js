import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },

    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    otpHash: { type: String, trim: true, select: false },
    otpExpires: Date,
}, {
    timestamps: true,
    versionKey: false,
});

// Hash password before saving
userSchema.pre('save', async function() {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if(this.isModified("otpHash")) {
        this.otpHash = await bcrypt.hash(this.otpHash, 10);
    }
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