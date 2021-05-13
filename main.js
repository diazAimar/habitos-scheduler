"use strict";

/* Selectors */

/* Elemento del input del form */
const formInput = document.querySelector(".form__input");
/* Elemento del boton + */
const formPlusIcon = document.querySelector(".fa-plus");
/* Elemento del boton - */
const formMinusIcon = document.querySelector(".fa-minus");
/* Elemento del boton = */
const formEqualsIcon = document.querySelector(".fa-equals");
/* Elemento habito */
const habitsList = document.querySelector(".habits")
/* Elemento container de habitos */
const habitosContainer = document.querySelector(".container--habitos");
/* Agregar o quitar habitos */
const agregarHabitos = document.querySelector(".agregar--habitos");
const quitarHabitos = document.querySelector(".quitar--habitos");
/* Cerrar mensaje */
const cerrarMensaje = document.querySelector(".btn-cerrar-mensaje");
/* Elemento de todos los botones */
const formIcons = document.querySelectorAll(".form-icon");
/* Form habito */
const formHabito = document.querySelector(".form--habito");
/* Basurita */
const borrarHabito = document.querySelector(".borrar--habito");


/* Event Handlers */
formPlusIcon.addEventListener('click', agregarHabito);
formMinusIcon.addEventListener('click', agregarHabito);
formEqualsIcon.addEventListener('click', agregarHabito);

/* removeBtnListener, funcion para eliminar un elemento */
const removeBtnListener = (e) => {
    let habitoEncontrado = false;
    let indexHabitoEncontrado;
    let i = 0;
    let habitsArray = localStorage.getItem("arr");
    let idHabitoActual = e.currentTarget.parentNode?.id;
    console.log(e.currentTarget.parentNode);
    console.log(e.currentTarget.parentNode.id);
    console.log(idHabitoActual)
    habitsArray = JSON.parse(localStorage.getItem("arr"));
    console.log(habitsArray);
    let arrayNuevo = habitsArray.filter(habit => habit.id != idHabitoActual);
    console.log(arrayNuevo);
    e.currentTarget.parentNode?.remove();
/*     console.log(habitsArray);
 */    localStorage.setItem("arr", JSON.stringify(arrayNuevo));
}

/* function llamada agregarHabito, que dependiendo del icono que se usa, crea un habito con ese tipo y color */
function agregarHabito(e){
    if (formInput.value) {
        localStorage.getItem("arr");
        /* Guardo la fecha actual para usar como id unico */
        let date = Date.now();
        /* Busco el tipo de habito que voy a agregar */
        let tipo = e.currentTarget.classList.item(2);
        /* Creo un archivo html que se elimina una vez termina la funcion */
        const doc = document.implementation.createHTMLDocument()
        doc.body.innerHTML = `
            <div class ="habits habits--${tipo}" id="${date}">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `;
        /* selecciono el parrafo, le cambio el textContent por formInput.value, el valor que se encuentra en el input */
        doc.querySelector('p').textContent = formInput.value
        /* selecciono el boton y le pongo un eventlistener, caso que se haga click en el se ejecutara la funcion removeBtnListener, que elimina el elemento  */
        doc.querySelector('button').addEventListener('click', removeBtnListener);
        /* doc.body.children[0] would be the div element I added with the innerHTML, e.currentTarget in the event would be the button that was clicked so the parentNode would be its parent, (so the div) */
        habitosContainer.append(doc.body.children[0]);
        /* Que significa || []: F variable is not defined (or has a falsey value) THEN set it to an empty object. */
        /* Hago un parse del item tipo y si no existe creo el arr vacio */
        let arrObjHabitos = JSON.parse(localStorage.getItem("arr")) || [];
        /* Creo un objeto con los datos de este habito */
        let objHabito = {
            "type": tipo,
            "value": formInput.value,
            "id": date
        };
        /* Al array le voy a pushear el objeto que tengo */
        arrObjHabitos.push(objHabito);
        /* Guardo en localStorage el array convertido a string */
        localStorage.setItem("arr", JSON.stringify(arrObjHabitos));
        formInput.value = '';
    }
};

function cargarHabitos(){
    let arrHabitosAll = JSON.parse(localStorage.getItem("arr"));
    if (arrHabitosAll !== null){
        for(let i = 0; i < arrHabitosAll.length; i++){
            let tipo = arrHabitosAll[i]["type"];
            let valor = arrHabitosAll[i]["value"];
            let id = arrHabitosAll[i]["id"];
            const doc = document.implementation.createHTMLDocument()
            doc.body.innerHTML = `
                <div class ="habits habits--${tipo}" id="${id}">
                    <p></p>
                    <button><i class="far fa-trash-alt"></i></button>
                </div>
            `;
            doc.querySelector('p').textContent = valor;
            doc.querySelector('button').addEventListener('click', removeBtnListener);
            habitosContainer.append(doc.body.children[0]);
        }
    }
}
cargarHabitos();

/* BORRAR TODOS LOS HABITOS */
quitarHabitos.addEventListener("click", function(arrObjHabitos){
    habitosContainer.innerHTML = "";
    localStorage.clear();
});

/* FOCUS TEXT INPUT */
agregarHabitos.addEventListener("click", function(){
    formInput.focus();
});

/* MENSAJE DE ADVERTENCIA */
formInput.addEventListener('keypress', function(e){
    if (e.key === "Enter"){
        e.preventDefault();
        formInput.value = "Ingrese un habito y agreguelo con el boton correspondiente ->";
        const mensaje = document.createElement("div");
        mensaje.innerHTML = "<button class='btn btn-cerrar-mensaje'> Limpiar Mensaje</button>";
        formHabito.append(mensaje);
    }
});

if(cerrarMensaje){
    cerrarMensaje.addEventListener('click', function(e){
        e.preventDefault();
        formInput.value = "";
        mensaje.remove();
    });
}