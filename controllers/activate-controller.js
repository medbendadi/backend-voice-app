const Jimp = require('jimp')
const path = require('path');
const UserDto = require('../DTO/user-dto');
const userService = require('../services/user-service');
class ActivateController {

   async activate(req, res) {
      const { name, avatar } = req.body;

      if (!name || !avatar) {
         return res.status(400).json({ message: 'All fields are required!' });
      }

      const buffer = Buffer.from(
         avatar.replace(/^(data:image\/(png|jpg|jpeg);base64,)/, ''),
         'base64'
      );
      const imagePath = `${Date.now()}-${Math.round(
         Math.random() * 1e9
      )}.png`;
      // 32478362874-3242342342343432.png

      try {
         const jimResp = await Jimp.read(buffer);
         jimResp
            .resize(150, Jimp.AUTO)
            .write(path.resolve(__dirname, `../storage/${imagePath}`));
      } catch (err) {
         console.log(err);
         return res.status(500).json({ message: 'Could not process the image' });
      }

      // Image Base64

      const userId = req.user._id;
      // Update user
      try {
         const user = await userService.findUser({ _id: userId });
         if (!user) {
            res.status(404).json({ message: 'User not found!' });
         }
         user.activated = true;
         user.name = name;
         user.avatar = `/storage/${imagePath}`;
         user.save();
         res.json({ user: new UserDto(user), auth: true });
      } catch (err) {
         return res.status(500).json({ message: err });
      }
   }
   async update(req, res) {
      const { name, avatar, phone, email } = req.body;

      if (!name || !avatar || !phone || !email) {
         return res.status(400).json({ message: 'All fields are required!' });
      }

      let imagePath;
      if (avatar !== 'lastImage') {
         const buffer = Buffer.from(
            avatar.replace(/^(data:image\/(png|jpg|jpeg);base64,)/, ''),
            'base64'
         );
         imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
         )}.png`;
         // 32478362874-3242342342343432.png

         try {
            const jimResp = await Jimp.read(buffer);
            jimResp
               .resize(150, Jimp.AUTO)
               .write(path.resolve(__dirname, `../storage/${imagePath}`));
         } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Could not process the image' });
         }
      }

      // Image Base64

      const userId = req.user._id;
      // Update user
      try {
         const user = await userService.findUser({ _id: userId });
         if (!user) {
            res.status(404).json({ message: 'User not found!' });
         }
         user.activated = true;
         user.name = name;
         user.phone = phone;
         user.email = email;
         user.avatar = avatar === 'lastImage' ? user.avatar.replace('http://localhost:5000', '') : `/storage/${imagePath}`;
         user.save();
         res.json({ user: new UserDto(user), auth: true });
      } catch (err) {
         return res.status(500).json({ message: err });
      }
   }
}


module.exports = new ActivateController