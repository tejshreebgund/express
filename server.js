const express=require("express");
const mongoose=require("mongoose");
//connect mongoose to the express
const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment");// mongoose conected to mongo
}
//create schema
const movieSchema=new mongoose.Schema({
    id:{type:Number,reqiured:true},
    movie_name:{type:String,reqiured:true},
    movie_genre:{type:String,reqiured:false},
    production_year:{type:Number,reqiured:true},
    budget:{type:Number,reqiured:true}
})
//connect mongoose schema to mongo collection
const Movie=mongoose.model("movie",movieSchema)//in double quote i.e. user collection whatever name get plural,model cretes class user
const app=express();//It calls express
app.use(express.json());
//-----------------CRUD operation--------------------//
app.post("/movies",async(req,res) =>{//movies :it's collection name
    const movie=await Movie.create(req.body)// db.users.insert // mongoose whatever i pass into req.body put on documents of mongo
    return res.status(201).send({movie})
})
app.get("/movies",async(req,res) =>{
    const movies=await Movie.find().lean().exec()
    return res.status(200).send({movies})
})
app.get("/movies/:id",async(req,res)=>{
    const movie=await Movie.findById(req.params.id).lean().exec()
    return res.status(200).send({movie})
})
app.patch("/movies/:id",async(req,res)=>{
    const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(200).send({movie})
})
app.delete("/movies/:id",async(req,res)=>{
    const movie=await Movie.findByIdAndDelete(req.params.id)
    return res.status(200).send({movie})
})

app.listen(2344, async function(){//app listen our local port
    await connect()
    console.log("listining on the 2344 port");
})
