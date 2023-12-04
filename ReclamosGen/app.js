require('dotenv').config()

const { createBot, createProvider, createFlow, addKeyword, EVENTS  } = require('@bot-whatsapp/bot')

//SÓLO PARA MOSTRAR QR VIA WEB
//const QRPortalWeb = require('@bot-whatsapp/portal')

const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

const ServerAPI = require("./http");


const flowReclamos  = addKeyword(EVENTS.WELCOME)
    .addAction(
    async(ctx,{flowDynamic, fallBack, provider}) => {
       // console.log(ctx)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "message": ctx.body,
                    "typemessage": "Whatsapp",
                    "valuetype": ctx.from,
                    "solution" : "Reclamos",
                    "enterprise": process.env.ENTERPRISE
                });
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };
                  
                //console.log('http://' + process.env.IP_APIREST + '/enviareclamo/')
                let response = await fetch('http://' + process.env.IP_APIREST + '/send_message/', requestOptions);
            result = await response.json();
            resultado = await result.respuesta;

            if(resultado != ''){
                flowDynamic([
                    {
                        body: resultado
                    }
                ])
            }

    }
)

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USER,
        database: process.env.MYSQL_DB_NAME,
        password: process.env.MYSQL_DB_PASSWORD,
        port: process.env.MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowReclamos])
    const adapterProvider = createProvider(BaileysProvider)
    const httpServer = new ServerAPI(adapterProvider, adapterDB)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    //QRPortalWeb()
    httpServer.start()
}

main()
