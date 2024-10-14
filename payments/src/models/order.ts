import { OrderStatus } from "@silambarasansivalingam/common";
import mongoose from "mongoose";


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

});

// creating the order model
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };