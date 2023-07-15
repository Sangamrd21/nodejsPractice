const express = require('express');
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
const https = require('https');
const apiKey = "b6802a5863ff4d63aa951439231507"

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/home.html');
});

app.post('/', (req, res)=> {
    const city = req.body.city;
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+city+"&aqi=no"
    https.get(url, (response)=> {
        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            const weatherCondition = weatherData.current.condition.text;
            const weatherIcon = "https:"+weatherData.current.condition.icon;
            res.write("<h1> The weather condition of "+city+" is "+weatherCondition+"</h1>");
            res.write("<img src="+weatherIcon+">");
            res.send();
        });
    });
})


app.listen(3000);
