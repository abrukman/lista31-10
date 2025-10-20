const temas = ['no puede fallar', 'tengo una banda', 'la tienda', 'soñé', 'hummus', 'pibes crudos', 'fidelina', 'pobre cotur', 'nada que ver', 'invierno', 'pobre niño rico', 'ape', 'duerme', 'por las noches', 'ceviche', 'bailando en cuero', 'artístico', 'yo no me caí del cielo'];
const temasDisponibles = [];
const listaTemas = document.getElementById('listaTemas');
const listaDisponibles = document.getElementById('temasDisponibles');
const tituloDisponibles = document.getElementById('tituloDisponibles');



//generar lista de temas

const generarLista = () => {
    temas.map((tema) => {
        const botonTema = document.createElement('li');
        botonTema.id = `${tema}`;
        botonTema.classList.add('temaListado');
        botonTema.innerHTML = `<button class='botonEliminar'><i class="fa-solid fa-trash-can"></i></button> ${tema} <button class='botonLink'><i class="fa-solid fa-link"></i></button>`;
        listaTemas.appendChild(botonTema);
    });

    const ultimoBotonLink = listaTemas.lastChild.lastChild;
    listaTemas.lastChild.removeChild(ultimoBotonLink);
};

generarLista();

//generar la lista de temas borrados
const generarListaDisponibles = () => {
    temasDisponibles.map((tema) => {
        const temaDisponible = document.createElement('li');
        temaDisponible.id = `${tema}`;
        temaDisponible.classList.add('temaDisponible');
        temaDisponible.innerHTML = `<button class='botonReciclar'><i class="fa-solid fa-recycle"></i></button> ${tema}`;
        listaDisponibles.appendChild(temaDisponible);
    });

    if(listaDisponibles.childElementCount === 0) {
        tituloDisponibles.classList.add('oculto');
    };

    if(listaDisponibles.childElementCount > 0) {
        tituloDisponibles.classList.remove('oculto');
    };
};

generarListaDisponibles();

//agregar temas borrados a la lista de disponibles
function pasarADisponible(tema) {
    temasDisponibles.push(tema);
};

//borrar temas
function borrarTema(id) {
    //console.log(temas)
    borrar = temas.findIndex(tema => tema === id);
    //console.log(id);
    pasarADisponible(id);
    temas.splice(borrar, 1);
   listaTemas.innerHTML = '';
   listaDisponibles.innerHTML = '';
   generarLista();
   generarListaDisponibles();
};

//incluir temas reciclados de nuevo en la lista
function incluirEnLista(tema) {
    temas.push(tema);
};

//reciclar temas
function reciclarTema(id) {
    reciclar = temasDisponibles.findIndex(tema => tema === id);
    incluirEnLista(id);
    temasDisponibles.splice(reciclar, 1);
    listaTemas.innerHTML = '';
    listaDisponibles.innerHTML = '';
    generarLista();
    generarListaDisponibles();
};

//enganchar temas
function engancharTemas(a, b) {
    if(!a.parentElement.classList.contains('enganchado')) {
        //console.log(`${a.id} no esta enganchado, hay que engancharlo con ${b.id}`);
        const enganchados = document.createElement('ul');
        enganchados.classList.add('enganchado');
        enganchados.id = `${a.id}/${b.id}`;
        enganchados.appendChild(a);
        enganchados.appendChild(b);
        listaTemas.appendChild(enganchados);    
    } else {
        console.log('hay que sumarlo al enganchado');
    }
    

}



listaTemas.addEventListener('click', function(event) {
    const botonEliminar = event.target.closest('.botonEliminar');
    const botonLink = event.target.closest('.botonLink');

    if(botonEliminar) {
        const temaABorrar = botonEliminar.parentElement.id;
        borrarTema(temaABorrar);
    } else if (botonLink) {
        const tema = botonLink.parentElement;
        console.log(tema);
        const engancharCon = botonLink.parentElement.nextElementSibling;
        console.log(engancharCon);
        engancharTemas(tema, engancharCon);
    };
});

listaDisponibles.addEventListener('click', function(event) {
    const botonReciclar = event.target.closest('.botonReciclar');

    if(botonReciclar) {
        const temaAReciclar = botonReciclar.parentElement.id;
        reciclarTema(temaAReciclar);
    };
}); 