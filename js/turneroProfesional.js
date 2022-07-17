//Trayendo formulario del dom
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const disciplinaInput = document.getElementById("disciplina");
const profesionalInput = document.getElementById("profesional");
const telefonoInput = document.getElementById("telefono");
const fechaInput = document.getElementById("fecha");
const horaInput = document.getElementById("hora");
const consultaInput = document.getElementById("consulta");

//UI
const formulario = document.getElementById("nueva-cita");
const contenedorCitas = document.getElementById("citas");

let editando;

//Creando eventos
eventListeners();
function eventListeners() {
  nombreInput.addEventListener("change", datosPaciente);
  apellidoInput.addEventListener("change", datosPaciente);
  disciplinaInput.addEventListener("change", datosPaciente);
  profesionalInput.addEventListener("change", datosPaciente);
  telefonoInput.addEventListener("change", datosPaciente);
  fechaInput.addEventListener("change", datosPaciente);
  horaInput.addEventListener("change", datosPaciente);
  consultaInput.addEventListener("change", datosPaciente);
  formulario.addEventListener("submit", nuevaCita);
}
//Objeto con la informacion del paciente
const pacientesObj = {
  nombre: "",
  apellido: "",
  disciplina: "",
  profesional: "",
  telefono: "",
  fecha: "",
  hora: "",
  consulta: "",
};
//se agregan datos al objetos que el usuario va completando
function datosPaciente(e) {
  pacientesObj[e.target.name] = e.target.value;
 
}

//Clases
class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    // console.log(this.citas);
  }

  eliminarCita(id) {
 
    this.citas = this.citas.filter((cita) => cita.id !== id); 
  }

  editarCita(citaActualizada) { 
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita) 
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    //se crea el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    //agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    //Mensaje de error
    divMensaje.textContent = mensaje;

    //Agregar al DOM
    document
      .getElementById("contenido")
      .insertBefore(divMensaje, document.getElementById("agregar-cita"));

    // Quitar alerta despues de 3s

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas({ citas }) {
  

    this.limpiarHTML();

    citas.forEach((cita) => {
      const {
        nombre,
        apellido,
        disciplina,
        profesional,
        telefono,
        fecha,
        hora,
        consulta,
        id,
      } = cita; //aqui vamos a extrar de la cita actual el objeto actual. Agregamos el id que nos va a permitir eliminar o editar una cita

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id; //agregamos un atributo personalizado

      //scripting de los elementos de la cita
      const nombreParrafo = document.createElement("p");
      nombreParrafo.innerHTML = `<span class="font-weight-bolder">Nombre:</span> ${nombre}`;
      const apellidoParrafo = document.createElement("p");
      apellidoParrafo.innerHTML = `<span class="font-weight-bolder">Apellido:</span> ${apellido}`;
      const disciplinaParrafo = document.createElement("p");
      disciplinaParrafo.innerHTML = `<span class="font-weight-bolder">Disciplina:</span> ${disciplina}`;
      const profesionalParrafo = document.createElement("p");
      profesionalParrafo.innerHTML = `<span class="font-weight-bolder">Profesional:</span> ${profesional}`;
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono:</span> ${telefono}`;
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha:</span> ${fecha}`;
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora:</span> ${hora}`;
      const consultaParrafo = document.createElement("p");
      consultaParrafo.innerHTML = `<span class="font-weight-bolder">Consulta:</span> ${consulta}`;

      //Boton para eliminar citas

      const btnEliminar = document.createElement("button");
      btnEliminar.onclick = () => eliminarCita(id);
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = "Eliminar";

      //Boton editar cita
      const btnEditar = document.createElement("button");
      btnEditar.onclick = () => editarCita(cita);
      btnEditar.classList.add("btn", "btn-primary");
      btnEditar.innerHTML = "Editar";

      //Agregar al HTML
      divCita.appendChild(nombreParrafo);
      divCita.appendChild(apellidoParrafo);
      divCita.appendChild(disciplinaParrafo);
      divCita.appendChild(profesionalParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(consultaParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      //Agregar las citas al HTML
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

//valida y agrega una nueva cita a la clase de citas

function nuevaCita(e) {
  e.preventDefault();

  //Extraer la informacion del objeto cita
  const {
    nombre,
    apellido,
    disciplina,
    profesional,
    telefono,
    fecha,
    hora,
    consulta,
  } = pacientesObj;

  //validar
  if (
    nombre === "" ||
    apellido === "" ||
    disciplina === "" ||
    profesional === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    consulta === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    //Pasar el objeto de la cita a edicion

    administrarCitas.editarCita ({...pacientesObj})

    //Regresar el texto del boton a su estado original
   formulario.querySelector('button[type="submit"]').textContent =
    "Crear Cita";

//Quitar modo edicion
    editando = false
  } else {
      //generar un id unico
    pacientesObj.id = Date.now();
     //Creando una nueva cita//contiene el arreglo con las citas
    administrarCitas.agregarCita({ ...pacientesObj });
    //Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agrego correctamente");

  }
 

  //Validar objeto reiniciado
  reiniciarObjeto();

  //Reinicia el formulario
  formulario.reset();

 
  ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
  pacientesObj.nombre = "";
  pacientesObj.apellido = "";
  pacientesObj.disciplina = "";
  pacientesObj.profesional = "";
  pacientesObj.telefono = "";
  pacientesObj.fecha = "";
  pacientesObj.hora = "";
  pacientesObj.consulta = "";
}
function eliminarCita(id) {
  //Eliminar Cita
  administrarCitas.eliminarCita(id);
  //Muestre un mensaje
  ui.imprimirAlerta("La cita se elimino correctamente");
  //Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

//Cargar datos y modos de edicion
function editarCita(cita) {
  const {
    nombre,
    apellido,
    disciplina,
    profesional,
    telefono,
    fecha,
    hora,
    consulta,
    id
  } = cita;

  //Llenar los inputs

  nombreInput.value = nombre;
  apellidoInput.value = apellido;
  disciplinaInput.value = disciplina;
  profesionalInput.value = profesional;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  consultaInput.value = consulta;

  //Llenar el objeto
  pacientesObj.nombre = nombre;
  pacientesObj.apellido = apellido;
  pacientesObj.disciplina = disciplina;
  pacientesObj.profesional = profesional;
  pacientesObj.telefono = telefono;
  pacientesObj.fecha = fecha;
  pacientesObj.hora = hora;
  pacientesObj.consulta = consulta;
  pacientesObj.id = id;

  //Cambiar el texto del boton
  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";

  editando = true;
}

let profesionales = [
    {
        nombre: 'Constanza',
        profesion: 'Psicologia'
    },
    {
        nombre: 'Daniela',
        profesion: 'Psicologia'
    },
    {
        nombre: 'Melanie',
        profesion: 'Fonoaudiologia'
    },
    {
        nombre: 'Luciana',
        profesion: 'Psicomotricista'
    },
    {  nombre: 'Paola',
    profesion: 'Psicopedagogia'}
]

function cargarDisciplina()
{
    let especialidades = ["Psicologia", "Fonoaudiologia", "Psicomotricista", "Psicopedagogia"];
    for(let i in especialidades)
    { 
        document.getElementById("disciplina").innerHTML += "<option value='"+especialidades[i]+"'>"+especialidades[i]+"</option>"; 

    }
}

function cargarProfesionales()
{
    for(let i in profesionales)
    { 
        document.getElementById("profesional").innerHTML += "<option value='"+profesionales[i].nombre+"'>"+profesionales[i].nombre+"</option>"; 

    }
}

function obtenerValorSeleccionado(){
var select = document.getElementById('profesiones');
var value = select.options[select.selectedIndex].value;
console.log(value);
}

function update() {
    document.getElementById("profesional").innerHTML = "";
    let select = document.getElementById('disciplina');
    let option = select.options[select.selectedIndex];
    filtroProfesionales = profesionales.filter((el) => el.profesion === option.value);
    if(filtroProfesionales.length == 0) {
        document.getElementById("profesional").innerHTML = "<option>No contamos con profesionales para esa especialidad</option>";
    } else {
    
        for(let i in filtroProfesionales)
        {   
            document.getElementById("profesional").innerHTML += "<option value='"+filtroProfesionales[i].nombre+"'>"+filtroProfesionales[i].nombre+"</option>"; 
    
        }
    }
}

async function asyncLocalStorage () {
  let loginJson = JSON.parse(localStorage.getItem("usuarios"));
  const contenido = document.getElementById('administrarCitas');
  console.log(loginJson);
  contenido.innerHTML = `
  <h2 id="administra" class="mb-4">Administra tus Citas ${loginJson[0].nombre} ${loginJson[0].apellido}</h2>
  `
  }

function mostrarNombreusuario(resultado) {
  const contenido = document.getElementById('administrarCitas');
  contenido.innerHTML = `
  <h2 id="administra" class="mb-4">Administra tus Citas</h2>
  `
}

cargarDisciplina();
cargarProfesionales();
asyncLocalStorage();
