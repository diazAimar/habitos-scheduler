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
/* Tacho basura habito especifico */
// const quitarHabitoEspecifico = document.querySelector(".borrar--habito");
let habitsArray = [];

/* Event Handlers */
let count = 0;
/* AGREGAR HABITO VERDE */
formPlusIcon.addEventListener("click", function(e){
    if (formInput.value) {
        const doc = document.implementation.createHTMLDocument()
        doc.body.innerHTML = `
            <div class ="habits habits--plus">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `;
        doc.querySelector('p').textContent = formInput.value
        doc.querySelector('button').addEventListener('click', (e) => {
          e.currentTarget.parentNode?.remove()
        })
        habitosContainer.append(doc.body.children[0]);
        /* ADD HABIT TO LOCAL STORAGE */
        formInput.value = '';
    }
});

/* AGREGAR HABITO ROJO */
formMinusIcon.addEventListener("click", function(e){
    if (formInput.value) {
        const doc = document.implementation.createHTMLDocument()
        doc.body.innerHTML = `
            <div class ="habits habits--minus">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `;
        doc.querySelector('p').textContent = formInput.value
        doc.querySelector('button').addEventListener('click', (e) => {
          e.currentTarget.parentNode?.remove()
        })
        habitosContainer.append(doc.body.children[0]);
        /* ADD HABIT TO LOCAL STORAGE */
        formInput.value = '';
    }
});

/* AGREGAR HABITO AMARILLO */
formEqualsIcon.addEventListener("click", function(e){
    if (formInput.value) {
        /* Creo un archivo html que se elimina una vez termina la funcion */
        const doc = document.implementation.createHTMLDocument()
        /* el cuerpo del nuevo doc html */
        doc.body.innerHTML = `
            <div class ="habits habits--equals">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `;
        /* doc.body.children[0] would be the div element I added with the innerHTML, e.currentTarget in the event would be the button that was clicked so the parentNode would be its parent, (so the div) */
        /* selecciono el parrafo, le cambio el textContent por formInput.value */
        doc.querySelector('p').textContent = formInput.value
        /* selecciono el boton y le pongo un eventlistener */
        doc.querySelector('button').addEventListener('click', (e) => {
            /* e.currentTarget, agarra al elemento que clickie cuando corrio el evento, en este caso el boton de "trashcan" */
            /* si existe el padre (que seria el div completo), lo remuevo */
          e.currentTarget.parentNode?.remove()
        })
        habitosContainer.append(doc.body.children[0]);
        /* ADD HABIT TO LOCAL STORAGE */
        formInput.value = '';
    }
});


/* BORRAR TODOS LOS HABITOS */
quitarHabitos.addEventListener("click", function(){
    habitosContainer.innerHTML = "";
})

/* FOCUS TEXT INPUT */
agregarHabitos.addEventListener("click", function(){
    formInput.focus();
});
