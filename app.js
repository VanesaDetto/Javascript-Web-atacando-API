//1. ALMACENAMIENTO DE LA CAJA CONTENEDORA
const charactersContainer = document.querySelector("#characters_container");

//2. ALMACENAMIENTO DE LA URL
const charactersURL = "https://starwars-server.vercel.app/characters";

let previousCharacters = "";

//3.ETAPA DE SINCRONISIDAD
///A. Metodo ONLOAD:aplicado a window disparamos la función init, que es la que va a iniciar todas las demás en cascada

///B.Definimos nuestra función initCharacters.Almacenamos el retorno de la función getCharacters, que son los datos en JSON, en una constante para poder utilizarla de aquí en adelante de forma SINCRONA.Le pasamos la lista de personajes en JSON a la función mapCharacters para que los mapee

const initCharacters = async () => {
  const characters = await getCharacters();
  mapCharacters(characters);
};

///C. Definimos nuestra función getCharacters.Estamos almacenando los datos de la URL (API) en "crudo" en una constante. Le hemos puesto un await porque hasta que no recupere todos los datos no va a pasar a la siguiente linea de ejecución. Traducimos o convertimos los datos en crudo a JSON con el metodo json para poder trabajar con ellos en nuestra aplicación. Le hemos puesto un await porque hasta que no termine de traducir todos los datos crudos a json no va a pasar a la siguiente linea de ejecución

const getCharacters = async () => {
  const rawData = await fetch(charactersURL);
  const jsonData = await rawData.json();
  return jsonData;
};

//3. ETAPA DE MAPEO

///OJO!! EN CADA UNA DE LAS API VIENEN LOS DATOS EN UN SITIO U OTRO, EN ESTE CASO MIS PERSONAJES ESTAN EN .data.characters.
//Le vamos a pasar a la función que genera un figure el item nuevo que generamos con el mapeo. Gracias al mapeo podemos quedarnos con las propiedades que queramos del objeto original e incluso renombrar las claves o las keys

const mapCharacters = (list) => {
  list.data.characters.map((item) => {
    return generateHTML({
      nombre: item.name,
      origen: item.origin,
      rol: item.role,
      imagen: item.image,
    });
  });
};

//4. ARMO HTML

const generateHTML = (item) => {
  const myFigure = `
    <figure class="figure_container">
    <h3>${item.nombre}</h3>
    <h4>${item.origen}</h4>
    <img src="${item.imagen}" alt="${item.nombre}" />
    <h4>${item.rol}</h4>
    </figure>
    `;

  print(myFigure);
};

const print = (figure) => {
  charactersContainer.innerHTML += figure;
};
//--------------------------------//

const nextCharacters = async () => {
  if (previousCharacters) {
    const result = await fetch(previousCharacters);
    const resultToJson = await result.json();
    mappedCharacters(resultToJson);
  }
};
