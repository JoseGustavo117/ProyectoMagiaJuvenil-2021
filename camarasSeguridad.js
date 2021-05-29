/*

SISTEMA DE VIGILANCIA, SECURITY AI ANALYZER(SV_SA):
 
Se trata de un sistema el cual recibe inputs a través de cámaras de seguridad de un lugar/establecimiento,
el cual previamente especifica el tipo de detección que quiere realizar.
Para este caso, el programa se encuentra instalado en el sistema de seguridad y vigilancia de un hotel 5
estrellas, en el cual sus políticas no permiten el acceso de ningún tipo de animal y/o mascotas.
El programa está diseñado para detectar animales con el análisis de un fotograma de una cámara de
seguridad de un hotel. 
Se puede configurar para otro tipo de detecciones como la edad aparente de una persona para permitir
su acceso a cierto lugar, entre otras formas de implementación
 
Resumen técnico:
Se crea un arreglo donde cada parte de este representa un fotograma una cámara de seguridad.
El hotel cuenta con 7 cámaras principales las cuales mandan el input (fotograma). Para el análisis del
fotograma se realiza una petición al servicio de vision Computer Vision, que forma parte de Azure 
Cognitive Services. El servicio devuelve información de la cual se extraen los datos necesarios que el
programa. Por medio de un ciclo doWhile que analiza cada dato recibido desde el análisis implementando 
un condicional en cada realización del ciclo que verifica si el dato que se está analizando es un animal.

*/

//Declaramos axios para hacer nuestras peticiones
const axios = require('axios');
//Declaramos prompt para solicitar la verificación de cierta  del hotel
const prompt = require('prompt-sync')();

//Arreglo donde se guarda lo que ve cada cámara
var cámaras = []

cámaras[0] = "https://estaticos.elperiodico.com/resources/jpg/0/4/recepcion-hotel-barcelona-1484901441340.jpg";
cámaras[1] = "https://www.infoturperu.com.pe/media/k2/items/cache/6f393c73a9c9a064c4c50137fe9679b4_XL.jpg";
cámaras[2] = "http://elempresario.mx/sites/default/files/imagecache/nota_completa/60406011.jpg";
cámaras[3] = "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/08/giraffe-manor-dining.jpg";
cámaras[4] = "http://www.planetacurioso.com/wp-content/uploads/2012/08/hotel-perros-nueva-york3.jpg";
cámaras[5] = "https://st2.depositphotos.com/4061757/10892/i/950/depositphotos_108921206-stock-photo-man-and-woman-with-suitcases.jpg";
cámaras[6] = "https://media-cdn.tripadvisor.com/media/photo-s/07/db/1b/92/hotel-lobby-and-the-show.jpg";


var dirección = "https://serviciovisionnorte.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Description"


//SV: Sistema de Vigilancia
//Damos un mensaje de inicio
console.log("\nSistema de vigilancia, SecurityAnalyze(SV_SA): \n" 
            + "...Cámaras disponibles: " + cámaras.length + "\n"
            + "Esperando usuario: solicite la cámara (número) a analizar\n"
            );

//Declaramos una variable para que el usuario solicite la cámara que desea verificar
var cam = parseInt( prompt("---> ") );

//Este es el body de la petición
var data = { "url": cámaras[cam - 1] }
console.log("\n")

//Iniciamos la petición con una función
//El callback es el análisis de los datos
function petición( callback ){

    axios.post( dirección, data, {
        headers: {
            'Ocp-Apim-Subscription-Key' : '9f8839e9bd4e446c8d1bfad49bd6db72',
            'Content-Type': 'application/json'
        }
    } )
    //El callback pasa como input "respuesta.data..."
    .then( respuesta => callback(respuesta.data.description.tags) )
    .catch( error => console.log( error.message ))
    
}

//"análisis" se ejecutará después de "petición"
//datos = respuesta.data...
//El análisis de los datos (respuesta.data...) nos indica acerca de lo que detectó el servicio 
function análisis( datos ){

    //"j" servirá como indicador de la posición del arreglo que se está analizando
    var j = 0

    //Abrimos un ciclo que busque en todo el arreglo (datos) algún animal
    //El ciclo se ejecutará al menos una vez
    //Seguirá su ejecución siempre y cuando el contador (1) sea menor o igual a la cantidad de datos a analizar
    //# de datos = datos.length
    do{
        //Se muestran los animales que el programa puede detectar
        //El condicional verifica si el dato que el servicio haya detectado es un animal
        //Condición del if = "Si el dato del arreglo analizado contiene un animal, mandar una alerta"
        if( (datos[j] == "dog") || (datos[j] == "cat") || (datos[j] == "giraffe")  ){
            //Alerta
            console.log("Sistema de vigilancia, SecurityAnalyze(SV_SA): \n"
                        + "¡Alerta!, se ha detectado la presencia de un animal en la cámara: " + cam + "\n"
                        + "Prtocolos del hotel: \n"
                        + "I. En caso de presencia de un animal llamar al personal de sanidad\n"
                        + "II. En caso de animal que ponga en peligro la seguridad de los huéspedes llamar al personal de seguridad\n"
                        );

                        //En caso de no encontrar nada se pasa al siguiente dato
                        break;
        };
        //En caso de que tras haber analizado todos los datos anteriores sin encontrar nada, se manda un aviso
        //Condición del if = "Si el último dato del arreglo no contiene un animal, mandar aviso y cerrar el ciclo"
        if( (datos[j] ==! "dog", "cat", "giraffe") && ( j == datos.length ) ){

            console.log("Sistema de vigilancia, SecurityAnalyze(SV_SA): \n"
                        + "No se encontró ningún ningún animal\n"
                        + "Análisis completo\n..."
                        );

                        break;
        };
        j++

    }while( j <= datos.length );

};

//LLamada a la función
petición( análisis );


/*
node camarasSeguridad.js
*/
