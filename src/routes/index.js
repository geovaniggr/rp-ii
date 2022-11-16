const userRoutes = require('./user.routes')
const orderRoutes = require('./order.routes')

module.exports = (fastify, opts, done) => {

    fastify.register(userRoutes, { prefix: '/user'})
    fastify.register(orderRoutes, { prefix: '/orders'})
    done()
}