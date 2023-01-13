import multer from "multer";
const path = require('path')
const sourcePath = require('app-root-path').path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(sourcePath, 'src/uploads'))
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, filename + '-' + file.originalname)
    }
})
export const upload = () => multer({
    storage: storage,
})