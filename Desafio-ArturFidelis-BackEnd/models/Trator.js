const mongoose = require('mongoose')
const tratorSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: false,
    },
    valor: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    }
    
});

tratorSchema.statics.isThisNameInUse = async function(nome) {
    
    try {
        const trator = await this.findOne({nome})
  if(trator) return false

  return true;

    } catch (error) {
        console.log('error inside nome em uso', error.message)
        return false
    }
  
}



module.exports = mongoose.model('Trator',tratorSchema)
