class RoomDto {
   id;
   topic;
   roomType;
   speakers;
   ownerId;
   createdAt;
   password;

   constructor(room) {
      this.id = room._id
      this.topic = room.topic
      this.roomType = room.roomType
      this.ownerId = room.ownerId
      this.speakers = room.speakers
      this.password = room.password ? room.password : null
      this.createdAt = room.createdAt
   }
}


module.exports = RoomDto;