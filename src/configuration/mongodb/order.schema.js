const mongoose = require('mongoose')

module.exports = {
    name: "orders",
    alias: "Order",
    schema: {
        id: {
            type: mongoose.Types.ObjectId
        },
        title: {
            type: String
        },
        tags: {
            type: Array
        },
        main_language: {
            type: String
        },
        languages: {
            type: Array,
        },
        description: {
            type: String
        },
        files: {
            type: Array
        },
        price: {
            type: mongoose.Types.Decimal128
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        answers: {
            type: mongoose.Types.ObjectId,
            ref: 'Answer'
        }
    }
}