module.exports = {
    name: "users",
    alias: "User",
    schema: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String, 
        },
        country: {
            type: String
        },
        city: {
            type: String
        },
        minibio: {
            type: String
        },
        bio: {
            type: String,
        },
        main_language: {
            type: String
        },
        languages: {
            type: Array
        },
        abilities: {
            type: Array
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        projects: {
            type: Array
        }
    }
}