/**
 * Práctica 12
 * Detector de DNI falsos
 * Brian Passos
 */

'use strict';

const	elemento = {
			formularioComprobar: document.body.querySelector ('form[name="comprobarDNI"]'),
			nombreUsuario: document.body.querySelector ('input[name="nombreUsuario"]'),
			númeroDNI: document.body.querySelector ('input[name="númeroDNI"]'),
			botónFormulario: document.body.querySelector ('button[name="comprobarDatos"]')
		},
		registrarEventos = () => {
			elemento.formularioComprobar.addEventListener ('submit', (e) => {
				e.preventDefault();
				let usuario = new Usuario ();

				usuario.procesarDatos();
			});

			elemento.númeroDNI.addEventListener ('click', () => {
				restaurarEstadoFormulario	();
			});

			elemento.nombreUsuario.addEventListener ('click', () => {
				restaurarEstadoFormulario	()
			});
		},
		obtenerLetraDNI = (númeroDNI) => {
			const ordenLetras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E","T"]; // Letras posibles para DNI en orden especificado

			return ordenLetras [númeroDNI % (ordenLetras.length-1) /** Obviamos la última letra, la cual se repite */];	// Obtenemos de array 'ordenletras' la letra correspondiente
																														// según el resto de la operación módulo 23
																														// (cantidad de letras diferentes en array) del númeroDNI
		},
		alertaDatos = {
			correcta: () => {
				let elementosAlerta = document.body.querySelectorAll ('.alertaColor');

				Object.entries (elementosAlerta).forEach (([llave, elemento]) => {
					elemento.classList.add ('is-success', 'has-background-success');
				});

				elemento.botónFormulario.innerText = 'correcto';
				elemento.botónFormulario.disabled = true;

				console.info ('Datos correctos.');
			},
			incorrecta: () => {
				let elementosAlerta = document.body.querySelectorAll ('.alertaColor');

				Object.entries (elementosAlerta).forEach (([llave, elemento]) => {
					elemento.classList.add ('is-danger', 'has-background-danger');
				});

				elemento.botónFormulario.innerText = 'incorrecto';
				elemento.botónFormulario.disabled = true;

				console.error ('Datos incorrectos.');
			}
		},
		restaurarEstadoFormulario = () => {
			let elementosARestaurar = document.body.querySelectorAll ('.is-danger, .is-success');

			Object.entries (elementosARestaurar).forEach (([llave, elemento]) => {
				elemento.classList.remove ('is-danger', 'has-background-danger', 'is-success', 'has-background-success');
			});

			elemento.botónFormulario.innerText = 'comprobar';
			elemento.botónFormulario.disabled = false;
		};
class Usuario {
	constructor (
		nombre = this.obtenerDatos ().nombreUsuario,
		DNI = this.obtenerDatos ().númeroDNI.toUpperCase ()
	) {
		this.nombre = nombre;
		this.DNI = DNI;
	};

	obtenerDatos () {
		let	valorElemento = {
				nombreUsuario: elemento.nombreUsuario.value,
				númeroDNI: elemento.númeroDNI.value
			};

		return valorElemento;
	};

	procesarDatos () {
		let	DNI = this.DNI,
			númeroDNI = DNI.substring (0, DNI.length-1),
			letraDNI = DNI.slice (-1).toUpperCase (),
			letraDNICorrecta = obtenerLetraDNI (númeroDNI);

		console.info (`Nombre: ${this.nombre} con DNI número ${this.DNI}; según nuestro sistema le corresponde la letra: ${letraDNICorrecta}.`);

		return (letraDNI == letraDNICorrecta) ? alertaDatos.correcta () : alertaDatos.incorrecta ();
	};
};


registrarEventos ();
