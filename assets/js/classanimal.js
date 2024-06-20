//Creacion clase e instancias, clase Animal (padre)//

 export class Animal{
    constructor (nombre,edad,img,comentarios,sonido){
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.comentarios = comentarios;
        this.sonido = sonido;
    }

    getNombre(){
        return this.nombre;
    }
    getEdad(){
        return this.nombre;
    }
    getImg(){
        return this.nombre;
    }

    setComentarios (){
        return
    }
    getSonido (){
        return this.sonido;
    }
}