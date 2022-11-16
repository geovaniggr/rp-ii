const { avatar: uploader } = require('../services/uploader.service')

module.exports = (fastify, opts, done) => {
    const UserController = require('../controllers/user.controller')
    const controller = UserController(fastify)

    fastify.get("/profile", controller.handleGetProfile)

    fastify.get("/:id", controller.handleFindUser)
    
    fastify.post("/create", {
        preHandler: uploader.single('avatar'),
        handler: controller.handleCreate
    })

    fastify.put("/update", controller.handleUpdate)

    done()
}