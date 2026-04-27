"use strict";

const fs = require("fs")
const xml2js = require("xml2js")

const parsearArchivoXML = async () =>{
    try{
        const archivoXML = fs.readFileSync("./recetas.xml","utf8")

        const parseador = new xml2js.Parser({explicitArray:false})

        const recetasEnBruto = await parseador.parseStringPromise(archivoXML);
    }
    catch(err){
        console.error("Se ha producido un error al intentar parsear el archivo")
    }

}





