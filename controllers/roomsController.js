const RoomDto = require('../DTO/room-dto');
const roomService = require('../services/room-service');

class RoomsController {
   async create(req, res) {
      // room
      const { topic, roomType } = req.body;

      if (!topic || !roomType) {
         return res
            .status(400)
            .json({ message: 'All fields are required!' });
      }

      const room = await roomService.create({
         topic,
         roomType,
         ownerId: req.user._id,
      });

      return res.json(new RoomDto(room));
   }

   async createPrivate(req, res) {
      // room
      const { topic, roomType, password } = req.body;

      if (!topic || !roomType || !password) {
         return res
            .status(400)
            .json({ message: 'All fields are required!' });
      }

      const room = await roomService.createPrivate({
         topic,
         roomType,
         password,
         ownerId: req.user._id,
      });

      return res.json(new RoomDto(room));
   }

   async index(req, res) {
      const rooms = await roomService.getAllRooms(['open']);
      const allRooms = rooms.map((room) => new RoomDto(room));
      return res.json(allRooms);
   }

   async show(req, res) {
      try {
         const room = await roomService.getRoom(req.params.roomId);

         return res.json(room);
      } catch (err) {
         res.status(404).json({ message: 'Invalid id' })
      }

   }
   async showPrivate(req, res) {
      const { password } = req.body
      if (!password) {
         return res.status(404).json({ message: 'Invalid id or password' })
      }
      try {
         const room = await roomService.getPrivateRoom(req.params.roomId, password);
         if (room === []) {
            throw new Error
         }
         return res.json(room);
      } catch (err) {
         res.status(404).json({ message: 'Invalid id or password' })
      }

   }
   async delete(req, res) {
      const room = await roomService.closeRoom(req.params.roomId);

      return res.json(room);
   }
}

module.exports = new RoomsController();
