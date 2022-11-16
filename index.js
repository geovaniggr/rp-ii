const {
    fastify
} = require('./src/server')

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log(`[fastify Started]`)
    } catch (error){
        fastify.log.error(error)
        process.exit()
    }
}

start()
