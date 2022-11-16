class User {
    constructor({ _id, name, email, country, city, minibio, bio, main_language, abilities, created_at, projects}){
        Object.assign(this, { _id, name, email, country, city, minibio, bio, main_language, abilities, created_at, projects})
    }

    greeting(){
        console.log(`Meu nome é ${name} e tenho o email ${email}}`)
    }
}

module.exports = User