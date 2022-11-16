const path = require('path')

const routes = require('./routes')

const multer = require('fastify-multer')

const { archives: uploader } = require('./services/uploader.service')

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/jwt'), {
    secret: 'SUPER_SECRET'
})

fastify.register(require('fastify-bcrypt'), {
    saltWorkFactor: 12
})

fastify.register(require('@fastify/cors'), {
    origin: true
})

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'uploads')
})

fastify.register(multer.contentParser)

// fastify.register(require('fastify-mongoose-driver').plugin, {
//     uri: 'mongodb://rosetta:p4ssword@localhost:27017/rosetta?authSource=admin',
//     settings: {
//         useNewUrlParser: true,
//         config: {
//             autoIndex: true
//         }
//     },
//     models: [
//         UserSchema,
//         OrderSchema
//     ]
// })

fastify.get("/archives/:filename", (request, response) => {
    console.log("aqui")
    const { filename } = request.params
    response.sendFile(`/archives/${filename}`)
})

fastify.register(routes, { prefix: '/api'})

// fastify.get("/", async (request, reply) => {
//     const users = await fastify.mongoose.User.find({})
    
//     const data = users.map( user => new User(user))

//     console.log(data)

//     try {
//         await request.jwtVerify()
        
//         return {
//             hello: 'world'
//         }

//     } catch (error){
//         return {
//             error
//         }
//     }
// })


fastify.get('/upload', {
    preHandler: uploader.single('avatar'),
    handler: (request, response) => {
        return { hello: 'world' }
    }
})

fastify.get('/login', async (request, reply) => {
    const token = await request.jwtVerify()
    console.log(token)

    return { hello: 'world'}
})

fastify.post('/signup', async (request, reply) => {
    const token = fastify.jwt.sign({
        id: "claibsxkx00009hq9umls7pcv",
        internal_id: 1,
        email: 'my-email@email.com'
    })

    return {
        payload: token
    }
})

module.exports = {
    fastify
}