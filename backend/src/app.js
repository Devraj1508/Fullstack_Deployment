const express=require("express")
const app=express();
const notesModel=require("./Models/notemodels")
const cors=require("cors")
const path=require("path")

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")));


//post
app.post("/api/notes",async(req,res)=>{
    const {title,description}=req.body

    const notes=await notesModel.create({
        title,description
    })
    res.status(200).json({
        message:"message send sucessfuly",
        notes
    })
   
})
app.get("/api/notes",async(req,res)=>{
    const notes=await notesModel.find()
    res.status(201).json({
        message:"message fetched sucessfuly",
        notes
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    await notesModel.findByIdAndDelete(id)
    res.status(201).json({
        message:"deleted sucessfully",
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const {description}=req.body
    await notesModel.findByIdAndUpdate(id,{description})
    res.status(201).json({
        message:"updated sucessfuly",
    })
})
app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

module.exports=app;