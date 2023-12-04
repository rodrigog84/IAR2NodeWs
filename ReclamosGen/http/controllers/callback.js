const ctrlCallBack = async (req, res) => {

  //console.log(req.db)
  const adapterDB = req.db;
  const adapterProvider = req.ws;

  //req.body.p = req.query.p
  //req.body.q = req.query.q

  var phone= req.body.phone
  var message= req.body.message

  //var phone= req.query.p
  //var tipomensaje= req.query.q

  /*if(tipomensaje == 1){
    var message = '¡Hola de nuevo! Parece que ha pasado un tiempo desde nuestra última interacción. Nuestro sistema de seguridad cerrará en unos minutos la sesión por inactividad. Si tienes alguna información adicional, por favor, no dudes en escribir.'

  }else if(tipomensaje == 2){
    var message = 'Nuestro sistema de seguridad ha cerrado la sesión por inactividad.'
  }*/

  await adapterProvider.sendText(
    `${phone}@c.us`,
     message
  );

  /*  await adapterProvider.sendText(
      `${phone}@c.us`,
      [
        "Felicitaciones! ya tienes acceso al curso 🙌",
        "un mail te llegara en los proximos minutos",
        "Si tienes algun inconveniente puedes escribirme un mail a leifer.contacto@gmail.com",
      ].join("\n")
    );*/
    
    res.send({ data: "Mensaje Enviado" });
};

module.exports = { ctrlCallBack };
