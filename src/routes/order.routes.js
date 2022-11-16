const { archives: FileUploader } = require('../services/uploader.service')

const OrderController = require('../controllers/order.controller')

module.exports = (fastify, _, done) => {

    const controller = OrderController(fastify)

    fastify.get("/", controller.handleFindAll)
    fastify.get("/:id", controller.handleFindOne)
    fastify.post("/:id/answer", { preHandler: FileUploader.array('files'), handler: controller.handleAddResponse })
    fastify.get("/:id/finish", controller.handleFinish)
    
    
    fastify.post("/create", { preHandler: FileUploader.array('files'), handler: controller.handleCreate })


    fastify.put("/:id", controller.handleUpdate)

    done()
}