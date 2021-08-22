const Usuario = require('../models/Usuario');
const bcrypjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt =require('jsonwebtoken');

exports.CrearUsuario = async (req,res) => {

    // revisar si hay errores
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    // extrarer email y password
    const {email,password} = req.body; 

    try {
        // validar si el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({msg:'El usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body);
        // Hashear el password
        const salt = await bcrypjs.genSalt(10);
        usuario.password = await bcrypjs.hash(password,salt);
        // guardar usuario
        await usuario.save();
        // crear y formar el jwt
        const payload = {
            usuario:{
                id:usuario.id
            }
        }
        //firmar el token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        },(error,token)=>{
            if (error) throw error;
            // mensaje de confirmacion
            res.json({token:token});
        }); 
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
} 