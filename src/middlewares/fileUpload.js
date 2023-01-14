/** @format */

import multer from 'multer';

//Storage Setting
const storage = multer.diskStorage({
  destination: './public/images', //directory (folder) setting
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // file name setting
  },
});

//Upload Setting
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only jpeg,  jpg , png, and gif Image allow'));
    }
  },
});

// app.post('/image', upload.array('products', 12), (req, res) => {
//   const result = imageModel.create({
//     name: req.body.name,
//     img: req.files,
//   });
//   if (result) {
//     res.send({ code: 200, message: 'Upload Success' });
//   } else {
//     res.send({ code: 500, message: 'Upload Err' });
//   }
// });

// app.get('/image', async (req, res) => {
//   let products = await imageModel.find({});
//   if (products.length > 0) {
//     res.send({ code: 200, data: products });
//   } else {
//     res.send({ code: 500, message: 'Server Err' });
//   }
// });

export default upload;
