const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const app=express();
const port=8080
const uploaddir=path.join(__dirname,'uploads');
if(!fs.existsSync(uploaddir)){
    fs.mkdirSync(uploaddir);
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploaddir);
    },
    filename:(req,file,cb)=>{
        const unique=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,unique+path.extname(file.originalname));
    }
});
const filetype=(req,file,cb)=>{
    const filetypes='/png|docx|pdf/';
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const typo=filetypes.test(file.mimetype);
    if(extname&&mimetype){
        cb(null,true);
    }
    else{
        cb(new Error('only format png and docx and pdf is accepted'));
    }
};
const upload=multer({
      storage:storage,
      limits:{fileSize:2*1024*1024},
      filetype:filetype
}).single('file');
app.use(express.static('public'));
app.post('/upload',(req,res)=>{
      upload(req,res,(err)=>{
          if(err){
            console.error('error occured',err);
            return res.status(400).json({success:false,message:err.message});
          }
          if(!req.file){
            console.error('no files');
            return res.status(400).json({success:false,message:'no files'});
          }
        const fileUrl=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({success:true,fileUrl:fileUrl});
      });
});
app.use('/uploads', express.static(uploaddir));
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});