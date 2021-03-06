// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check} = require('express-validator'); 
// crea un usuario
// api/usuarios
router.post('/', 
    [   
        // reglas de validacion para el modelo
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
    ],
    usuarioController.CrearUsuario
);

module.exports = router;