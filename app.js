"use strict";

const fs = require("fs")
const xml2js = require("xml2js")

const parsearArchivoXML = async () =>{
        const archivoXML = fs.readFileSync("./recetas.xml","utf8")

        const parseador = new xml2js.Parser({explicitArray:false})

        const recetasEnBruto = await parseador.parseStringPromise(archivoXML);
        console.log(recetasEnBruto)

        const recetasFormateadas = recetasEnBruto.receta

        // Me lanza una excepción TypeError debido al uso de map

        const recetasJSON = recetasFormateadas.map((receta) =>(
            {
              codigo: receta.$.codigo,
              nombre: receta.nombre,
              categoria: receta.categoria,
              tiempo: Number(receta.tiempo),
              dificultad: receta.dificultad
            }
        ))

        fs.writeFileSync("./recetas.json",JSON.stringify(recetasJSON,null, 2))

}

parsearArchivoXML()



