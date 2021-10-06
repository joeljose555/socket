const mongoose      =   require('mongoose')
const Schema        =   mongoose.Schema

const studentSchema =   new Schema({
    name:{
        type:String,
        trim:true,
        default:null
    },
    roll_no:{
        type: Number,
    },
    mark1:{
        type: Number,
    },
    mark2:{
        type:Number
    }
})

module.exports = Student = mongoose.model('student',studentSchema)