"use strict";

const fs = require("fs")
const xml2js = require("xml2js")

const parsearArchivoXML = async () =>{
    try{
        const archivoXML = fs.readFileSync("./recetas.xml","utf8")

        const parseador = new xml2js.Parser({explicitArray:false})

        const recetasEnBruto = await parseador.parseStringPromise(archivoXML);

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
    catch(error){
        console.error(error)
    }


}

const imprimirTabla = async () => {
    const archivoJSON = fs.readFileSync("./recetas.json","utf8")
    const tabla = document.querySelector("#tabla-recetas")

    if(!tabla) return

    const numFilas = 5
    for(let i = 1; i < numFilas; i++) {
        const fila = document.createElement("tr")
        tabla.append(fila)
        archivoJSON.forEach((objeto) => {
            const celda = document.createElement("td")
            fila.append(celda)
            celda.textContent = objeto[i]
        })
    }



}


imprimirTabla()



