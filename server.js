const fs = require("fs");
const express = require('express');
var data = fs.readFileSync("./data1.json");
var users = JSON.parse(data);
const app = express();

app.use(express.json())

app.use(logger)
app.get("/",function(req,res){
res.send("Welcome to Homepage")
});
app.get("/users",function(req,res){
    res.send(users)
})
function logger(req,res,next){
    console.log(req.body);
    next();
}
app.post("/users",function(req,res){
req.body.id=users.length+1;
users.push(req.body)
var newData2 = JSON.stringify(users);
fs.writeFile("./express1.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
  
    res.send(users)
})

app.patch("/users/:id", function(req,res){
    const user =  users.find(user => user.id === parseInt(req.params.id));
    user.Author = req.body.Author;
    user.pages = req.body.pages;
    return res.json(user)
})


app.delete("/users/:id", function(req,res){
    const user =  users.find(user => user.id === parseInt(req.params.id));
    user["Author"] = req.body["Author"];
    user["pages"] = req.body["pages"];
    user["published year"] = req.body["published year"];
    user["Book Name"] = req.body["Book Name"];
    user["id"] = req.body["id"];
    
    return res.json(user)
})




app.listen(2345,function(){
console.log("listening on port 2345");
})  



  