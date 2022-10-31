const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const refreshToken = new Schema({
   token: { type: String, required: true },
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
   timestamps: true
})



module.exports = mongoose.model('Refresh', refreshToken, 'tokens')