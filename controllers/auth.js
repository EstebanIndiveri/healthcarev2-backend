const {response}=require('express');
const bcrypt=require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario=async(req,res=response)=>{
   
    const{email,password}=req.body;
    try{

        const usuario=await Usuario.findOne({email});
        if(!usuario){
           return res.status(404).json({
                ok:false,
                msg:'Usuario o contraseña incorrectos'
            })
        }
        const validPass=bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            return res.status(404).json({
                ok:false,
                msg:'Contraseña incorrecta'
            });
        }

        //JTW
        const token=await generarJWT(usuario.id,usuario.name);

        res.status(200).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:'Por favor intente nuevamente'
        })
    }
 
}

const crearUsuario=async(req,res=response)=>{
    const{email,password}=req.body;

    try{
        let usuario=await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo electronico'
            });
        }
        usuario=new Usuario(req.body);
        //bcrypt: 
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);
        await usuario.save();

        //JWT
        const token=await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:'new',
            uid:usuario.id,
            name:usuario.name,
            token
            
        });

    }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Por favor intente nuevamente'
        })
    }

  
}

const revalidarToken=async(req,res=response)=>{
    const {uid,name}=req;
    try{
    //nuevo JWT y retornarlo en esta petición
    const token=await generarJWT(uid,name);

    res.json({
        ok:'retoken',
        uid,
        name,
        token
    })
    }catch(error){
        console.log(error);
    }
    
}

module.exports={
    crearUsuario,
    revalidarToken,
    loginUsuario
}