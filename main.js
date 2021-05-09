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

/* Elemento de todos los botones */
const formIcons = document.querySelectorAll(".form-icon");

/* Event Handlers */

/* function llamada agregarHabito, que dependiendo del icono que se usa, crea un habito con ese tipo y color */

function agregarHabito(e){
    if (formInput.value) {
        localStorage.getItem("arr");
        let date = Date.now();
        let tipo = e.currentTarget.classList.item(2);
        const doc = document.implementation.createHTMLDocument()
        doc.body.innerHTML = `
            <div class ="habits habits--${tipo}" id="${date}">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `;
        doc.querySelector('p').textContent = formInput.value
        doc.querySelector('button').addEventListener('click', (e) => {
            let habitoEncontrado = false;
            let indexHabitoEncontrado;
            let i = 0;
            let habitsArray = localStorage.getItem("arr");
            e.currentTarget.parentNode?.remove();
            let dateHabitoActual = e.currentTarget.parentNode?.id;
            habitsArray = JSON.parse(localStorage.getItem("arr"));
            do {
                if(habitsArray[i]["id"] == dateHabitoActual) {
                    indexHabitoEncontrado = i;
                    habitoEncontrado = true;
                }
                i++;
            } while (habitoEncontrado == false && i < habitsArray.length);
            habitsArray.splice(habitsArray[indexHabitoEncontrado], 1);
            localStorage.setItem("arr", JSON.stringify(habitsArray));
        }); 
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
        localStorage.getItem("arr");
        localStorage.setItem("arr", JSON.stringify(arrObjHabitos));
        formInput.value = '';
    }
};
formPlusIcon.addEventListener('click', agregarHabito);
formMinusIcon.addEventListener('click', agregarHabito);
formEqualsIcon.addEventListener('click', agregarHabito);

function cargarHabitos(){
    let arrHabitosAll = JSON.parse(localStorage.getItem("arr"));
    if (arrHabitosAll !== null){
        for(let i = 0; i < arrHabitosAll.length; i++){
            let tipo = arrHabitosAll[i]["type"];
            let valor = arrHabitosAll[i]["value"];
            let id = arrHabitosAll[i]["id"];
            const doc = document.implementation.createHTMLDocument()
            doc.body.innerHTML = `
                <div class ="habits habits--${tipo} id="${id}">
                    <p></p>
                    <button><i class="far fa-trash-alt"></i></button>
                </div>
            `;
            doc.querySelector('p').textContent = valor;
            doc.querySelector('button').addEventListener('click', (e) => {
                let habitoEncontrado = false;
                let indexHabitoEncontrado;
                let i = 0;
                let habitsArray = localStorage.getItem("arr");
                e.currentTarget.parentNode?.remove();
                let dateHabitoActual = e.currentTarget.parentNode?.id;
                habitsArray = JSON.parse(localStorage.getItem("arr"));
                do {
                    if(habitsArray[i]["id"] == dateHabitoActual) {
                        indexHabitoEncontrado = i;
                        habitoEncontrado = true;
                    }
                    i++;
                } while (habitoEncontrado == false && i < habitsArray.length);
                habitsArray.splice(habitsArray[indexHabitoEncontrado], 1);
                localStorage.setItem("arr", JSON.stringify(habitsArray));
            }); 
            habitosContainer.append(doc.body.children[0]);
        }
    }
}
cargarHabitos();
/* 
OTRA FORMA
<i data-icon-type="plus" class="fas fa-plus plus"></i>
<i data-icon-type="minus" class="fas fa-minus minus"></i>
<i data-icon-type="equals" class="fas fa-equals equals"></i>

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.hasAttribute('data-icon-type') {
    const type = el.dataset.iconType; // this would equal one of the values
    // your code based on which icon was clicked would go here
  }
}); */

/* AGREGAR HABITO VERDE */
/* formPlusIcon.addEventListener("click", function(e){
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
        formInput.value = '';
    }
}); */

/* AGREGAR HABITO ROJO */
/* formMinusIcon.addEventListener("click", function(e){
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
        formInput.value = '';
    }
}); */

/* AGREGAR HABITO AMARILLO */
/* formEqualsIcon.addEventListener("click", function(e){
    if (formInput.value) { */
        /* Creo un archivo html que se elimina una vez termina la funcion */
        // const doc = document.implementation.createHTMLDocument()
        /* el cuerpo del nuevo doc html */
/*         doc.body.innerHTML = `
            <div class ="habits habits--equals">
                <p></p>
                <button><i class="far fa-trash-alt"></i></button>
            </div>
        `; */
        /* doc.body.children[0] would be the div element I added with the innerHTML, e.currentTarget in the event would be the button that was clicked so the parentNode would be its parent, (so the div) */
        /* selecciono el parrafo, le cambio el textContent por formInput.value */
        // doc.querySelector('p').textContent = formInput.value
        /* selecciono el boton y le pongo un eventlistener */
        // doc.querySelector('button').addEventListener('click', (e) => {
            /* e.currentTarget, agarra al elemento que clickie cuando corrio el evento, en este caso el boton de "trashcan" */
            /* si existe el padre (que seria el div completo), lo remuevo */
/*           e.currentTarget.parentNode?.remove()
        })
        habitosContainer.append(doc.body.children[0]);
        formInput.value = '';
    }
}); */


/* BORRAR TODOS LOS HABITOS */
quitarHabitos.addEventListener("click", function(arrObjHabitos){
    habitosContainer.innerHTML = "";
    localStorage.clear();
})

/* FOCUS TEXT INPUT */
agregarHabitos.addEventListener("click", function(){
    formInput.focus();
});
