const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController'); 
const {check} = require('express-validator'); 
const auth = require('../middleware/auth');

// crear una tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre','El Nombre es obligatorio').not().isEmpty(),
        check('proyecto','El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// obtener las tareas por proyectos
router.get('/',
    auth,
    tareaController.obtenerTareas
);

// actualizar tarea
router.put('/:id',
    auth,
    [
        check('nombre','El nombre de la tarea es obligatorio').not().isEmpty()
    ],
    tareaController.actualizarTarea
);

// eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;