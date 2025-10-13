const temas = ['no puede fallar', 'tengo una banda', 'la tienda', 'soñé', 'hummus', 'pibes crudos', 'fidelina', 'pobre cotur', 'nada que ver', 'invierno', 'pobre niño rico', 'ape', 'duerme', 'por las noches', 'ceviche', 'bailando en cuero', 'artístico', 'yo no me caí del cielo'];
const listaTemas = document.getElementById('listaTemas');



//generar lista de temas

const generarLista = () => {
    temas.map((tema) => {
        const botonTema = document.createElement('button');
        botonTema.id = `${tema}`;
        botonTema.innerHTML = `<span class='botonEliminar'><i class="fa-solid fa-trash-can"></i></span> ${tema} <span class='botonEnganchar'><i class="fa-solid fa-link"></i></span>`;
        const elementoLista = document.createElement('li');
        elementoLista.appendChild(botonTema);
        listaTemas.appendChild(elementoLista);
    });

    const ultimoBotonLink = listaTemas.lastChild.lastChild.lastChild;
    listaTemas.lastChild.lastChild.removeChild(ultimoBotonLink);
}

generarLista();

//borrar temas
function borrarTema(id) {
    console.log(temas)
    borrar = temas.findIndex(tema => tema === id);
    //console.log(borrar);
    temas.splice(borrar, 1);
   listaTemas.innerHTML = '';
   generarLista();
}

listaTemas.addEventListener('click', function(event) {
    if(event.target.classList.contains('botonEliminar')) {
        const temaABorrar = event.target.parentElement.id;
        borrarTema(temaABorrar);
    }
})