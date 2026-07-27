import multer from "multer"

//from documentation of npm multer
//DiskStorage : The disk storage engine gives you full control on storing files to disk.
// multer has an advantage compared t express that in express we can only handle json data in req but in multere there is an added  option of "file", which can also handle files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage})