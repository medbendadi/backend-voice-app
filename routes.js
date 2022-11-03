const app = require('express')
const activateController = require('./controllers/activate-controller')
const router = app.Router()

const authController = require('./controllers/auth-controller')
const roomsController = require('./controllers/roomsController')
const authMiddleware = require('./middlewares/auth-middleware')

router.post('/api/send-otp', authController.sendOtp)

router.post('/api/verify-otp', authController.verifyOtp)

router.post('/api/activate', authMiddleware, activateController.activate)
router.post('/api/users/update/:userId', authMiddleware, activateController.update)

router.get('/api/refresh', authController.refresh)
router.post('/api/logout', authMiddleware, authController.logout)
router.post('/api/rooms', authMiddleware, roomsController.create)
router.post('/api/rooms/private', authMiddleware, roomsController.createPrivate)
router.get('/api/rooms', authMiddleware, roomsController.index)
router.get('/api/rooms/:roomId', authMiddleware, roomsController.show)
router.post('/api/rooms/private/:roomId', authMiddleware, roomsController.showPrivate)
router.delete('/api/rooms/:roomId', authMiddleware, roomsController.delete)


module.exports = router