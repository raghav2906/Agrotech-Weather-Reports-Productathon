const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageEight = document.querySelector('#message-8')
const messageNine = document.querySelector('#message-9')
const messageTen = document.querySelector('#message-10')
const info = document.querySelector('.content')
const imginfo = document.querySelector('.IMG')
const cropinfos = document.querySelector('.cropcanbe')

const crops = [
    {
        name:"Rice",
        min:21,
        max:40,
        minH:60,
        maxH:80
    },
    {
        name:"Wheat",
        min:16,
        max:25,
        minH:50,
        maxH:60
    },
    {
        name:"Maize",
        min:21,
        max:32,
        minH:50,
        maxH:100
    },
    {
        name:"Sorghum",
        min:27,
        max:32,
        minH:25,
        maxH:40
    },
    {
        name:"Pearl Millet",
        min:27,
        max:32,
        minH:35,
        maxH:55
    },
    {
        name:"Gram",
        min:15,
        max:25,
        minH:35,
        maxH:45
    },
    {
        name:"Field Pea",
        min:15,
        max:28,
        minH:12,
        maxH:17
    },
    {
        name:"Green Gram",
        min:25,
        max:32,
        minH:45,
        maxH:60
    },
    {
        name:"Soyabean",
        min:26,
        max:32,
        minH:15,
        maxH:20
    },
    {
        name:"Groundnut",
        min:25,
        max:35,
        minH:1,
        maxH:5
    },
    {
        name:"Sunflower",
        min:18,
        max:27,
        minH:10,
        maxH:35
    },
    {
        name:"Cotton",
        min:16,
        max:28,
        minH:28,
        maxH:40
    },
    {
        name:"Sugarcane",
        min:30,
        max:35,
        minH:50,
        maxH:65
    },
    {
        name:"Potato",
        min:17,
        max:25,
        minH:20,
        maxH:35
    }
]

const cropinfo = [
    document.querySelector('#crop0'),
    document.querySelector('#crop1'),
    document.querySelector('#crop2'),
    document.querySelector('#crop3'),
    document.querySelector('#crop4'),
    document.querySelector('#crop5'),
    document.querySelector('#crop6'),
    document.querySelector('#crop7'),
    document.querySelector('#crop8'),
    document.querySelector('#crop9'),
    document.querySelector('#crop10'),
    document.querySelector('#crop11'),
    document.querySelector('#crop12'),
    document.querySelector('#crop13')
]

const cropMsg = document.querySelector('#crop14')

setTimeout(()=>{
    info.classList.remove('nondi')
info.classList.add('di')
},20)

imginfo.classList.add('nondi')
            
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.innerHTML="Loading..."
    messageTwo.innerHTML=""
    messageThree.innerHTML=""
    messageFour.innerHTML=""
    imginfo.classList.remove('di')
    imginfo.classList.add('nondi')
    info.classList.remove('nondi')
    info.classList.add('di')
    cropinfos.classList.remove('nondi')
    cropinfos.classList.add('di')

    const location = search.value

    console.log(location)    
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
        
            if(data.error){
                messageOne.textContent=data.error
            }else{
                console.log(data.forecastdata.body)
                info.classList.remove('di')
                info.classList.add('nondi')
                imginfo.classList.remove('nondi')
                imginfo.classList.add('di')
                messageOne.textContent = `- ${data.location}`
                messageTwo.textContent = `- ${data.forecastdata.WeatherDesc}`
                messageThree.textContent = `- ${data.forecastdata.body.location.localtime}`
                messageFour.textContent = `- ${data.forecastdata.body.current.temperature} °C`
                messageEight.textContent =`- There is ${data.forecastdata.body.current.humidity}% humidity`
                messageNine.textContent = `- ${data.forecastdata.body.current.cloudcover}`
                messageTen.textContent =`- Upto ${data.forecastdata.body.current.visibility} km`
                    
                cropinfos.classList.add('nondi')
                cropinfos.classList.remove('di')   
                
                for(let i=0;i<14;i++){
                    cropinfo[i].textContent=""
                }

                cropMsg.textContent=''

                const duplicatecrop = crops.filter((crop)=>{
                    if(data.forecastdata.body.current.temperature <= crop.max && data.forecastdata.body.current.temperature >= crop.min && data.forecastdata.body.current.humidity >= crop.minH && data.forecastdata.body.current.humidity <= crop.maxH)
                    {
                        return crop
                    }
                })
                console.log(cropinfo)
                console.log(duplicatecrop)
                console.log(duplicatecrop.length)
                if(duplicatecrop === undefined || duplicatecrop.length===0 ){
                    cropMsg.textContent = "NO CROPS ARE SUITED"
                }
                else{
                    cropMsg.textContent = "Following crops can be grown (Accordin to temperature and humidity levels) :"
                
                    for(let i=0;i<duplicatecrop.length;i++){
                        cropinfo[i].textContent=`${i+1}. ${duplicatecrop[i].name}`
                        console.log(duplicatecrop[i].name)
                    }
                }
                        
            }
        })
    })
})