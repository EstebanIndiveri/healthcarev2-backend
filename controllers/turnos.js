

// {
//     ok:true,
//     msg:'get turnos'

const { response } = require("express");
const Turno=require('../models/Turno');
// }
const getTurnos=async(req,res=response)=>{
    const turnos=await Turno.find()
    .populate('user','name')

    res.json({
        ok:true,
        turnos
    });
}

const crearTurnos=async(req,res=response)=>{

    const turno=new Turno(req.body);
    try {
        turno.user=req.uid;
        const turnoGuardado=await turno.save();
        res.json({
            ok:true,
            turno:turnoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con admin'
        })
    }
    
  
}

const actualizarTurno=async(req,res=response)=>{
    const turnoId=req.params.id;
    const uid=req.uid;
    try {
        const turno=await Turno.findById(turnoId);
        if(!turno){
            return res.status(404).json({
                ok:false,
                msg:'Turno no encontrado'
            });
        };
        if(turno.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso para editar este turno'
            });
        };
        const nuevoTurno={
            ...req.body,
            user:uid
        }
    const turnoActualizado=await Turno.findByIdAndUpdate(turnoId,nuevoTurno,{new:true,useFindAndModify:false});
    
    res.json({
        ok:true,
        turno:turnoActualizado
    });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }
}

const eliminarTurno=async(req,res=response)=>{
    const turnoId=req.params.id;
    const uid=req.uid;

    try {
        const turno=await Turno.findById(turnoId);
        if(!turno){
            return res.status(404).json({
                ok:false,
                msg:'Turno no encontrado'
            });
        };
        if(turno.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso para eliminar este turno'
            });
        };
     
    await Turno.findByIdAndDelete(turnoId);
    
    res.json({
        ok:true,
        msg:'turno eliminado!'
    });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }
}

module.exports={
    getTurnos,
    crearTurnos,
    actualizarTurno,
    eliminarTurno
}