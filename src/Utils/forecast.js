const request = require('request')

const forecast =(Lat,Long,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=38e343cfc8a68389a9e6ac8b1573383e&query=${Lat},${Long}&units=m`

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(body.error){
            callback('Unable to get info',undefined)
        }
        else{
            const WeatherDesc = body.current.weather_descriptions[0]
            callback(undefined,{WeatherDesc,body})
        }
    })
}

module.exports = forecast