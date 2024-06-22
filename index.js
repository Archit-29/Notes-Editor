const express = require('express');
const app = express();
const path=require('path');
const fs= require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files: files});
    })
    
})


app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`, 'utf-8' ,function(err,filedata){
        res.render("show",{filename: req.params.filename, filedata: filedata});
        console.log(filedata)
    })
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join("")}.txt`, req.body.details,function(err){
        res.redirect('/');
    })
       
})

app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename})
})

app.post('/submit',function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(error){
        res.redirect("/");
    })
})





app.listen(3000)