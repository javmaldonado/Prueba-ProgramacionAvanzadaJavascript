//Importar las clases, herencias creadas en el archivo classchild//
import { Leon, Lobo, Oso, Serpiente, Aguila } from "./classchild.js";

//Declarar variables constantes a utilzar dentro del código//
const animales = []; //Este array  vacio almacenara las instancias de los animales//
const animalesClasses = { Leon, Lobo, Oso, Serpiente, Aguila }; //Mientras que este objeto mapea los animales  y sus clases//

//Para obtener los elementos del DOM se obtienen de la referencia de los elementos mediante sus IDs/
const animalElement = document.getElementById("animal");
const edadElement = document.getElementById("edad");
const comentariosElement = document.getElementById("comentarios");
const previewElement = document.getElementById("preview");
const btnAgregarElement = document.getElementById("btnRegistrar");
const animalContainerElement = document.getElementById("Animales");

//La función cargarDatos se encarga de cargar los datos de un animal desde un archivo JSON//
async function cargarDatos() {
  const response = await fetch("./data/animales.json"); //fetch para realizar la solicitud al contenido del JSON//
  const data = await response.json(); //response almacena los resultados de la solicitud//
  return data.animales.find((animal) => animal.name === animalElement.value); //retorna el objeto animal encontrado con .find//
}

//El evento permite  ver el preview  del animal seleciccionado//
animalElement.addEventListener("change", () => {
  (async () => {
    previewElement.innerHTML = "";
    const animalData = await cargarDatos();
    if (animalData) {
      previewElement.innerHTML += `<img src="./assets/imgs/${animalData.imagen}" class="preview-img img-fluid rounded card-img-top" alt="...">`;
    }
    return animalData;
  })();
});

// Función para crear una instancia de la clase del animal
function InstanciaAnimal(name, edad, imagen, comentarios, sonido) {
  const AnimalClass = animalesClasses[name];
  return new AnimalClass(name, edad, imagen, comentarios, sonido);
}
//Esta función crea una card HTML para cada animal//
function cardAnimal(animal) {
  const { img, nombre, sonido } = animal;
  const modalId = `modal-${nombre}`;
  animalContainerElement.innerHTML += `
    <div class="col-md-4 px-3 pb-2">
      <div class="card bg-light text-dark">
        <img src="./assets/imgs/${img}" class="card-img-top" data-toggle="modal" data-target="#${modalId}" alt="${img}" type="button" height="120">
        <div class="card-body">
          <audio controls class="w-100">
            <source src="assets/sounds/${sonido}" type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>`;
  modal(animal);
}
//Toma la informacion ingresada en el card para crear el Modal que aparece al hacer click en la card//
function modal(animal) {
  const { nombre, img, edad, comentarios } = animal;
  const newModal = document.createElement("div");
  newModal.classList.add("modal", "fade");
  newModal.id = `modal-${nombre}`;
  newModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered w-25" role="document">
      <div class="modal-content bg-dark">
        <div class="modal-body">
          <div class="imgModal">
            <img src="./assets/imgs/${img}" class="card-img" alt="">
          </div>
          <div class="cuerpoModal text-light text-center">
            <h5>${edad}</h5>
            <h3>Comentarios</h3>
            <hr>
            <p>${comentarios}</p>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(newModal);
  clearForm();
}

/*Agregar la información del animal al hacer click en el botón agregar, solo
si estan completados todos los campos solicitados */
btnAgregarElement.addEventListener("click", async () => {
  const animalData = await cargarDatos();
  if (!animalData) return;

  const { name, imagen, sonido } = animalData;
  if (animalElement.value && edadElement.value && comentariosElement.value) {
    const nuevoAnimal = new InstanciaAnimal(
      animalElement.value,
      edadElement.value,
      imagen,
      comentariosElement.value,
      sonido
    );
    animales.push(nuevoAnimal);
    cardAnimal(nuevoAnimal);
    clearForm();
  } else {
    alert("Por favor, llene todos los campos e intente nuevamente.");
  }
});

//Limitar el numero de caracteres en el comentario//
const textarea = document.getElementById("comentarios");
const charCount = document.getElementById("charCount");
const maxLength = 35;

textarea.addEventListener("input", () => {
  if (textarea.value.length > maxLength) {
    textarea.value = textarea.value.slice(0, maxLength);
  }
  charCount.textContent = `${textarea.value.length} / ${maxLength} caracteres`;
});
//Limpiar los campos del formulario y restablece la vista preview//
function clearForm() {
  previewElement.innerHTML = `<img src="./assets/imgs/lion.svg" class="img-fluid rounded card-img-top" alt="...">`;
  comentariosElement.value = "";
  edadElement.value = "Seleccione un rango de años";
  animalElement.value = "Seleccione un animal";
  charCount.textContent = "0 / 35 caracteres";
}
