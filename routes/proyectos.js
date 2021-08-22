const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController'); 
const {check} = require('express-validator'); 
const auth = require('../middleware/auth');

// Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.CrearProyecto
)
// Obtner todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// Actualizar proyecto via ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

// Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)


module.exports = router;