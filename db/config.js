const mongoose=require('mongoose');

const dbConnection= async()=>{
    try{

        await mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
        console.log('DB UP!!');

    }catch(error){
        console.log(error);
        throw new Error('error a la hora de iniciar DB');
    }
}
module.exports={
    dbConnection
}