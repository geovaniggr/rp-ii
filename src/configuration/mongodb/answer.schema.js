const mongoose = require('mongoose')

module.exports = {
    name: "answers",
    alias: "Answer",
    schema: {
        user_id: {
            type: mongoose.Types.ObjectId
        },
        answer: {
            type: String 
        },
        files: {
            type: Array
        }
    }    
}