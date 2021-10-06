const express       =       require('express')
const app           =       express()
require('dotenv').config()
const server        =       require('http').createServer(app)
const io            =       require('socket.io')(server,{cors:{origin:'*'}})
const db            =       require('./db')
const Student       =       require('./studentModel')
const jwt           =       require('jsonwebtoken')

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/chat',(req,res)=>{

    res.render('home')
})

app.post('/add-data', async(req,res)=>{
    let data = req.body
    
    let student     = new Student()
    student.name = data.name
    student.roll_no = data.rollno
    student.mark1   = data.mark1
    student.mark2   =   data.mark2

    try {
        await student.save()
        return res.json({
            status:true,
            message:"Student has been added"
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/get-data', async(req,res)=>{
    
    if(req.body.rollno != '-1'){
        let data = await Student.findOne({roll_no:req.body.rollno})
        const token = jwt.sign({name:data.name},process.env.TOKEN_SECRET)
        return res.json({
            status:true,
            data:data,
            token:token
        })
    }
    let data = await Student.find()
    return res.json({
        status:true,
        message:"All Student Data",
        data:data
    })

})

const Port          =   process.env.Port || 3000

server.listen(Port,()=>{
    console.log(`server started on ${Port}`)
})

io.on('connection',(socket)=>{
    socket.on('message',(data)=>{
        socket.broadcast.emit('message',data)
    })
})