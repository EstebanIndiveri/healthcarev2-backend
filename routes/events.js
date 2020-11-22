const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTurnos,crearTurnos,actualizarTurno,eliminarTurno } = require('../controllers/turnos');
const router=Router();
//validacion JWT middleware high order
router.use(validarJWT);


//obtener turno:

router.get(
    '/',
    
    getTurnos);


//crer un nuevo turno
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de inicio es obligatoria').custom( isDate ), 
        validarCampos
    ],
    crearTurnos 
);

//act
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de inicio es obligatoria').custom( isDate ), 
    ],
    actualizarTurno);


router.delete(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de inicio es obligatoria').custom( isDate ), 
    ],
    eliminarTurno);

module.exports=router;