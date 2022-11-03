const roomModel = require("../models/room-model")

class RoomService {

   async create(payload) {
      const { topic, roomType, ownerId } = payload
      const room = await roomModel.create({
         topic,
         ownerId,
         roomType,
         speakers: [ownerId],
      })
      return room
   }

   async createPrivate(payload) {
      const { topic, roomType, ownerId, password } = payload
      const room = await roomModel.create({
         topic,
         ownerId,
         roomType,
         password,
         speakers: [ownerId],
      })
      return room
   }

   async getAllRooms(types) {
      const rooms = await roomModel.find({ roomType: { $in: types } })
         .populate('speakers')
         .populate('ownerId')
         .exec();
      return rooms;
   }

   async getRoom(roomId) {
      const room = await roomModel.findOne({ _id: roomId })
      return room;
   }

   async getPrivateRoom(roomId, password) {
      const room = await roomModel.findOne({ _id: roomId })
      if (room.password === password) {
         return room;
      } else {
         return []
      }

   }

   async closeRoom(roomId) {
      const room = await roomModel.deleteOne({ _id: roomId })
      return room;
   }
}



module.exports = new RoomService()