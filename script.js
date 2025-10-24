let temas = ['no puede fallar', 'tengo una banda', 'la tienda', 'soñé', 'hummus', 'pibes crudos', 'fidelina', 'pobre cotur', 'nada que ver', 'invierno', 'pobre niño rico', 'ape', 'duerme', 'por las noches', 'ceviche', 'bailando en cuero', 'artístico', 'látigo', 'cavashitov', 'yo no me caí del cielo'];
const temasDisponibles = [];
const listaTemas = document.getElementById('listaTemas');
const listaDisponibles = document.getElementById('temasDisponibles');
const tituloDisponibles = document.getElementById('tituloDisponibles');
const tituloLista = document.getElementById('tituloLista').textContent;
let textoPlano = '';


//generar lista de temas

const generarLista = () => {
    temas.map((tema) => {
        if(Array.isArray(tema)) {
            const liContenedor = document.createElement('li');
            liContenedor.classList.add('temaListado');
            const enganchado = document.createElement('ul');
            enganchado.classList.add('enganchado');
            tema.map((subtema => {
                const botonSubTema = document.createElement('li');
                botonSubTema.id = `${subtema}`;
                botonSubTema.classList.add('temaEnganchado');
                botonSubTema.innerHTML = ` ${subtema} <button class='botonUnLink'><i class="fa-solid fa-link-slash"></i></i></button>` 
                enganchado.appendChild(botonSubTema);
            }));
            liContenedor.id += `${tema.join('-')}`;

            const ultimoBotonUnLink = enganchado.lastChild.lastChild;
            enganchado.lastChild.removeChild(ultimoBotonUnLink);
            enganchado.lastChild.innerHTML += '<button class="botonLink"><i class="fa-solid fa-link"></i></button>';

            liContenedor.innerHTML = "<button class='botonEliminar'><i class='fa-solid fa-trash-can'></i></button>";
            liContenedor.appendChild(enganchado);
            listaTemas.appendChild(liContenedor);
        } else {
            const botonTema = document.createElement('li');
            botonTema.id = `${tema}`;
            botonTema.classList.add('temaListado');
            botonTema.innerHTML = `<button class='botonEliminar'><i class="fa-solid fa-trash-can"></i></button> ${tema} <button class='botonLink'><i class="fa-solid fa-link"></i></button>`;
            listaTemas.appendChild(botonTema);
        }

    });

    const ultimoBotonLink = listaTemas.lastChild.lastChild;
    listaTemas.lastChild.removeChild(ultimoBotonLink);
    generarTextoPlano();
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
    if (id.includes('-')) {
        borrar = id.split('-');
        for(i = 0; i < temas.length; i++) {
            const tema = temas[i];
            if(Array.isArray(tema)) {
                const temasABorrar = borrar.every(b => tema.includes(b) && borrar.length === tema.length);
                if(temasABorrar) {
                    temas.splice(i, 1);
                    borrar.forEach(pasarADisponible);
                    break;
                }
            };
        };
    } else {
        borrar = temas.findIndex(tema => tema === id);
        pasarADisponible(id);
        temas.splice(borrar, 1);
    };
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
function engancharTemas(a) {
    if(temas.includes(a)) {
        const indexA = temas.findIndex(tema => tema === a);
        //const indexB = temas.findIndex(tema => tema === b.id );
        let enganchadas = temas.splice(indexA, 2);
        temas.splice(indexA, 0, enganchadas);
        listaTemas.innerHTML = '';
        generarLista();
    } else if(temas.some(enganchados => enganchados.includes(a))) {
        if(confirm('Enganchar más de dos temas puede hacer algunos músicos se cansen de más. Estás seguro?')) {
            let sumarAenganchado = temas.findIndex(enganchados => enganchados.includes(a));
            let temaAsumar = temas.splice(sumarAenganchado + 1, 1)[0];
            temas[sumarAenganchado].push(temaAsumar);
            listaTemas.innerHTML = '';
            generarLista();
        } else {
            return;
        }     
    } else {
        alert('error');
    }
};

//desenganchar temas
function desengancharTema(tema) {
    for(let i = 0; i < temas.length; i++) {
        const enganchado = temas[i];

        if(Array.isArray(enganchado)) {
            const indiceEnganchado = enganchado.indexOf(tema);
            if(indiceEnganchado !== -1) {
                const primeraParte = enganchado.slice(0, indiceEnganchado + 1);
                const segundaParte = enganchado.slice(indiceEnganchado + 1);

                temas[i] = (primeraParte.length === 1) ? primeraParte[0] : primeraParte;

                if(segundaParte.length > 0) {
                    if(segundaParte.length === 1) {
                        temas.splice(i + 1, 0, segundaParte[0]);
                    } else {
                        temas.splice(i + 1, 0, segundaParte);
                    };
                };
                break;
            };
        };
    };

    listaTemas.innerHTML = '';
    generarLista();
}



listaTemas.addEventListener('click', function(event) {
    const botonEliminar = event.target.closest('.botonEliminar');
    const botonLink = event.target.closest('.botonLink');
    const botonUnLink = event.target.closest('.botonUnLink');

    if(botonEliminar) {
        const temaABorrar = botonEliminar.parentElement.id;
        borrarTema(temaABorrar);
    } else if (botonLink) {
        const tema = botonLink.parentElement.id;
        engancharTemas(tema);
    } else if (botonUnLink) {
        const tema = botonUnLink.parentElement.id;
        desengancharTema(tema);
    };
});

listaDisponibles.addEventListener('click', function(event) {
    const botonReciclar = event.target.closest('.botonReciclar');

    if(botonReciclar) {
        const temaAReciclar = botonReciclar.parentElement.id;
        reciclarTema(temaAReciclar);
    };
});

//generar texto plano

function generarTextoPlano() {
    let textoPlano =  `${tituloLista.toUpperCase()}\n\n`;

    temas.forEach((tema, index) => {
        const orden = index + 1;

        if(Array.isArray(tema)) {
            textoPlano += `${orden}. ${tema.join(' - ')}\n`;
        } else {
            textoPlano += `${orden}. ${tema}\n`;
        };
    });

    return textoPlano;

    //console.log(textoPlano);
};

//copiar al portapapeles
function copiarAlPortapapeles() {
    const texto = generarTextoPlano();
    navigator.clipboard.writeText(texto)
      .then(() => alert('Texto copiado al portapapeles!'))
      .catch(err => alert('Error al copiar: ' + err));
};


//generar pdf
function imprimirPDF() {
    const texto = generarTextoPlano();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(35);

    const lineas = doc.splitTextToSize(texto, 180);

    doc.text(lineas, 10, 10);

    doc.save('lista-temas-barbacoaj-15-años.pdf');
};

//copiar al portapapeles
function copiarAlPortapapeles() {
    const texto = generarTextoPlano();  // O variable global
    navigator.clipboard.writeText(texto)
      .then(() => alert('Texto copiado al portapapeles!'))
      .catch(err => alert('Error al copiar: ' + err));
};


const botonImprimir = document.getElementById('botonImprimir');
const botonCopiar = document.getElementById('botonCopiar');

botonImprimir.addEventListener('click', imprimirPDF);
botonCopiar.addEventListener('click', copiarAlPortapapeles);

//sortableJS
const sortable = Sortable.create(listaTemas, {
  animation: 150,
  onEnd: actualizarOrdenTemas
});

//para actualizar orden temas
function actualizarOrdenTemas() {
  const nuevosTemas = [];

  listaTemas.querySelectorAll(':scope > li').forEach(li => {
    const id = li.id;
    if(id.includes('-')) {
      nuevosTemas.push(id.split('-'));
    } else {
      nuevosTemas.push(id);
    };
  });

  temas = nuevosTemas;

  generarTextoPlano();
};

//instrucciones

const modal = document.getElementById('modalInstrucciones');
const link = document.getElementById('instruccionesLink');
const cerrar = modal.querySelector('.cerrar');

link.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
});

cerrar.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
  }
});
