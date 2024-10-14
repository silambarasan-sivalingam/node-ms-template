import { OrderStatus } from "@silambarasansivalingam/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


// list of properties that are required to building the order 
interface OrderAttrs {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus
}

// list of properties that a order document has
interface OrderDoc extends mongoose.Document {
    userId: string;
    version: number;
    price: number;
    status: OrderStatus
}

// list of properties that a order model has
interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;

}

// creating the order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
    }
}, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        userId: attrs.userId,
        price: attrs.price,
        status: attrs.status
    });
}


// creating the order model
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };