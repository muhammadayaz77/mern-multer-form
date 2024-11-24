import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import cors from 'cors';
import connecDB from './config/dbConfig/db.mjs';
import userModel from './models/userModels.mjs';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
connecDB();
// Serve static files from the public directory

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      if (err) return cb(err);
      const fn = file.fieldname+ "_"+ Date.now() + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

// Change route to POST and handle file upload
app.post("/upload", upload.single('file'), async(req, res) => {
  await userModel.create({
    image : req.file.filename,
  })
  .then(result => res.json(result))
  .catch(err => console.log(err))
});
app.get("/getImages", async(req, res) => {
  await userModel.find()
  .then(result => res.json(result))
  .catch(err => console.log(err))
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
