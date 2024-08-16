const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
// import './styles.css';

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    // console.log("Post request recieved");
    const query =req.body.cityName;
    const apiKey = "e6ff3d9502e8e5f8abeea421d3056a81";
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp
            console.log(temp); 

            const weatherDesc = weatherData.weather[0].description
            console.log(weatherDesc); 

            const icon = weatherData.weather[0].icon
            const imagURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p id ='weatherdescription'>Weather Description :"+weatherDesc+"</p>");
            res.write("<h1>The temp in "+query+  " is "+temp+" Celsius.</h1>");
            res.write("<img src="+imagURL+">");
            res.send()


            
        })

    })
});



app.listen(4000 ,function () {
    console.log("Server started on port 4000");
});