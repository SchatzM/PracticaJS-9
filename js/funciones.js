/**
 * Práctica 12
 * Detector de DNI falsos
 * Brian Passos
 */

'use strict';

// Objeto global que almacena los diversos elementos con los que interactuaremos
const	elemento = {
			formularioComprobar: document.body.querySelector ('form[name="comprobarDNI"]'), // Elemento del formulario principal
			nombreUsuario: document.body.querySelector ('input[name="nombreUsuario"]'), // Elemento input donde el usuario introduce el nombre de la persona
			númeroDNI: document.body.querySelector ('input[name="númeroDNI"]'), // Elemento input donde el usuario introduce el número de DNI
			botónFormulario: document.body.querySelector ('button[name="comprobarDatos"]') // Elemento botón que inicia el procesamiento de los datos introducidos
		},
		registrarEventos = () => { // Función que registra los diferentes eventos utilizados
			elemento.formularioComprobar.addEventListener ('submit', (evento) => { // Evento ejecutado al pulsar el botón 'comprobar' dentro del formulario
				evento.preventDefault(); // Función que evita que la página se recargue al pulsar el botón (funcionalidad por defecto de los formularios)
				let usuario = new Usuario (); // Instancia de la clase Usuario que contiene la estructura de los datos y métodos que obtienen y procesan los datos introducidos en el formulario

				usuario.procesarDatos(); // Inicia el proceso de obtención y procesamiento de los datos introducidos en el formulario
			});

			elemento.formularioComprobar.addEventListener ('click', () => { // Evento ejecutado al hacer click sobre el formulario y sus elementos
				restaurarEstadoFormulario	(); // Llamamos a la función que restaura ciertos valores de algunos elementos a su estado original (si han sido modificados)
			});
		},
		obtenerLetraDNI = (númeroDNI) => { // Función para obtener la letra correspondiente al número de DNI dado
			const ordenLetras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E","T"]; // Letras posibles para DNI en orden especificado

			return ordenLetras [númeroDNI % (ordenLetras.length-1) /** Obviamos la última letra, la cual se repite */];	// Obtenemos de array 'ordenletras' la letra correspondiente
																														// según el resto de la operación módulo 23
																														// (cantidad de letras diferentes en array) del númeroDNI
		},
		alertaDatos = (booleano) => { // Función que modifican el aspecto de algunos elementos del DOM según el tipo de resultado obtenido en la función que procesa la información sobre el DNI comprobado
			let elementosAlerta = document.body.querySelectorAll ('.alertaColor'); // Obtenemos todos los elementos con la clase asignada para las alertas 'alertaColor'

			Object.entries (elementosAlerta).forEach (([llave, elemento]) => { // Iteramos entre todos los elementos de alerta
				booleano ? elemento.classList.add ('is-success', 'has-background-success') : elemento.classList.add ('is-danger', 'has-background-danger'); // Añadimos las clases que denotan éxito/correcto/sin fallos (fondo y borde verde) o las de error (fondo y borde rojo)
			});

			elemento.botónFormulario.innerText = booleano ? 'correcto' : 'incorrecto'; // Cambiamos el texto del botón
			elemento.botónFormulario.disabled = true; // Desactivamos el botón para evitar llamadas consecutivas

			return booleano ? console.info ('Datos correctos') : console.error ('Datos incorrectos'); // Mostramos en consola si los datos son correctos o no
		},
		restaurarEstadoFormulario = () => { // Función que restaura el aspecto de los elementos modificados por la función 'alertaDatos' a sus valores originales
			let elementosARestaurar = document.body.querySelectorAll ('.is-danger, .is-success'); // Obtenemos los elementos con las clases que modifican el aspecto en 'alertaDatos'

			Object.entries (elementosARestaurar).forEach (([llave, elemento]) => { // Iteramos entre los elementos
				elemento.classList.remove ('is-danger', 'has-background-danger', 'is-success', 'has-background-success'); // Eliminamos las clases pertinentes para restaurar el aspecto original de los elementos
			});

			elemento.botónFormulario.innerText = 'comprobar'; // Restaura el texto original del botón
			elemento.botónFormulario.disabled = false; // Reactivamos el botón
		};
class Usuario { // Clase que incluye la estructura de los datos y método para obtener y procesar los datos proporcionados a través del formulario principal
	constructor (
		nombre = this.obtenerDatos ().nombreUsuario,
		DNI = this.obtenerDatos ().númeroDNI.toUpperCase ()
	) {
		this.nombre = nombre;
		this.DNI = DNI;
	};

	obtenerDatos () { // Obtiene los valores de los elementos input del formulario
		let	valorElemento = { // Objeto que almacena los datos obtenidos
				nombreUsuario: elemento.nombreUsuario.value,
				númeroDNI: elemento.númeroDNI.value
			};

		return valorElemento; // Devuelve los datos obtenidos
	};

	procesarDatos () { // Inicia el proceso de obtención y procesamiento de los datos del formulario
		let	DNI = this.DNI, // Almacena DNI (número y letra)
			númeroDNI = DNI.substring (0, DNI.length-1), // Separamos los números de la letra del DNI
			letraDNI = DNI.slice (-1).toUpperCase (), // Separamos la letra del DNI
			letraDNICorrecta = obtenerLetraDNI (númeroDNI); // Obtenemos la letra correspondiente al número usando nuestra función para ello

		console.info (`Nombre: ${this.nombre} con DNI número ${this.DNI}; según nuestro sistema le corresponde la letra: ${letraDNICorrecta}.`); // Mostramos un resumen de los datos en consola

		return (letraDNI == letraDNICorrecta) ? alertaDatos (true) : alertaDatos (false); // Llama a la función que modifica el aspecto de algunos elementos dependiendo de si el DNI es correcto o no
	};
};


registrarEventos (); // Registramos eventos ligados al formulario
