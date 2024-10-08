import { Password } from './../services/Password';
import mongoose from "mongoose";

// An interface that describes the properties
// required to create new user
interface UserAttrs {
    email: string;
    password: string;
}


// AN interface that describes the properties 
// that a user document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    // createdAt: string;
    // updatedAt: string;
}

// An interface that describes the properties
// that a user Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;

}

const userSchema = new mongoose.Schema({
    email: {
        type: String,  //not typescript this is mongo
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, 
// transform the original value to modified value
{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function (done) {

    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

// custom function
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };