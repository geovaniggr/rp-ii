const multer = require('fastify-multer')
const path = require('path')
const crypto = require('crypto')

const generateFilename = (_, file, cb) => {
    const name = crypto.randomBytes(16).toString('hex')
    const ext = path.extname(file.originalname)
    cb(
        null,
        `${name}-${Date.now()}${ext}`
    )

}

const fileStorage = multer.diskStorage({
    destination: 'uploads/archives/',
    filename: generateFilename
})

const avatarStorage = multer.diskStorage({
    destination: 'uploads/avatar/',
    filename: generateFilename
})

module.exports = {
    archives: multer({
        storage: fileStorage
    }),
    avatar: multer({
        storage: avatarStorage
    })
}