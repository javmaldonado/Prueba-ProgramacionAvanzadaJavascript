//Creacion clase e instancias, herencias de la clase Animal//
import { Animal } from "./classanimal.js"

 export class Leon extends Animal {
    constructor (nombre,edad,img,comentarios,sonido){
        super (nombre,edad,img,comentarios,sonido);
    }
    rugir(){
        return "Rugido del leon";
    }
}

export class Lobo extends Animal {
    constructor (nombre,edad,img,comentarios,sonido){
        super (nombre,edad,img,comentarios,sonido);
    }
    aullar(){
        return "Aullido del lobo";
    }
}
export class Oso extends Animal {
    constructor (nombre,edad,img,comentarios,sonido){
        super (nombre,edad,img,comentarios,sonido);
    }
    grunido(){
        return "Gruñido del oso";
    }
}

export class Serpiente extends Animal {
    constructor (nombre,edad,img,comentarios,sonido){
        super (nombre,edad,img,comentarios,sonido);
    }
    sisear(){
        return "Siseo de la serpiente";
    }
}
export class Aguila extends Animal {
    constructor (nombre,edad,img,comentarios,sonido){
        super (nombre,edad,img,comentarios,sonido);
    }
    chillar(){
        return "Chillido del aguila";
    }
}
