const { Router } = require("express");
const { ctrlCallBack } = require("../controllers/callback");
const router = Router()

/**
 * Ruta para recibir y enviar un mensaje desde fastapi
 */
router.post("/", ctrlCallBack);
//router.get("/", ctrlCallBack);

module.exports = router