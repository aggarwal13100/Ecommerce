const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        phoneno: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                public_id: {
                    type: String,
                    required: true,
                },

                url: {
                    type: String,
                    required: true,
                },
            },
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },

    paidAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },

    deliveredAt: {
        type: Date,
        required: true,
        default: Date.now() + 24 * 60 * 60 * 1000 * 3,
    },
});

module.exports = mongoose.model("Order", orderSchema);
