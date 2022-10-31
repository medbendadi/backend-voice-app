const mongoose = require('mongoose')
// require('./user-model')
const Schema = mongoose.Schema;


const roomSchema = new Schema({
   topic: { type: String, required: true },
   roomType: { type: String, required: true },
   ownerId: { type: Schema.Types.ObjectId, ref: 'user' },
   speakers: {
      type: [
         {
            type: Schema.Types.ObjectId,
            ref: 'user',
         },
      ],
      required: false,
   },
   // admins: {
   //    type: [
   //       {
   //          type: Schema.Types.ObjectId,
   //          ref: 'User'
   //       }
   //    ],
   //    required: false
   // }
}, {
   timestamps: true
})



module.exports = mongoose.model('Room', roomSchema, 'rooms')