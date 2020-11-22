const express = require('express')
const geocode = require('./Utils/geocode')
const path = require('path')
const forecast = require('./Utils/forecast')

const port = process.env.PORT || 3000

const app = express()


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const PublicDirectory = path.join(__dirname,'../public')

app.use(express.static(PublicDirectory))

app.get('',(req,res)=>{
    res.send('<h1>Hello</h1>')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address to continue'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location})=>{
        if(error){
           return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecastdata:data,
                location,
                address:req.query.address
            })

        })
    })
})



app.listen(port,()=>{
    console.log(`serving on : ${port}  `)
})