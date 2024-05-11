const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.ejs')) {
            res.set('Content-Type', 'text/javascript');
        }
    }
}));
app.set("views", "./public/views");
app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    return res.sendFile('index.html',{root:'./public/views'});
})
app.get('/donation',(req,res)=>{
    return res.sendFile('donation.html',{root:'./public/views'});
})
app.get('/login',(req,res)=>{
    return res.sendFile('login.html',{root:'./public/views'});
})
app.get('/adoption',(req,res)=>{
    return res.sendFile('adoption.html',{root:'./public/views'});
})
app.get('/about',(req,res)=>{
    return res.sendFile('about.html',{root:'./public/views'});
})
app.get('/register.html',(req,res)=>{
    return res.render('register');
})
app.listen(8080,()=>{console.log("Server Started at port 8080")});
