class Tablero {

	get pares() {
		return this._pares;
	}
	
	set pares(value) {
		this._pares = value;
	}
	
	get turnos() {
		return this._turnos;
	}
	
	set turnos(value) {
		this._turnos = value;
	}
	
	get tema() {
		return this._tema;
	}
	
	set tema(value) {
		this._tema = value;
	}
	
	get cartas() {
		return this._cartas;
	}
	
	set cartas(value) {
		this._cartas = value;
	}
	
	get dorso() {
		return this._dorso;
	}
	
	set dorso(value) {
		this._dorso = value;
	}
	
	get ultimaCarta() {
		return this._ultimaCarta;
	}
	
	set ultimaCarta(value) {
		this._ultimaCarta = value;
	}
	
	get cooldownCarta() {
		return this._cooldownCarta;
	}
	
	set cooldownCarta(value) {
		this._cooldownCarta = value;
	}
	
	get bandera() {
		return this._bandera;
	}
	
	set bandera(value) {
		this._bandera = value;
	}
	
	get nombre() {
		return this._nombre;
	}
	
	set nombre(value) {
		this._nombre = value;
	}
	
	get dificultad() {
		return this._dificultad;
	}
	
	set dificultad(value) {
		this._dificultad = value;
	}
	

	
	constructor (pares, tema = "flores"){
		this._pares = pares;
		this._turnos = 0;
		this._tema = tema;
		this._cartas = [];
		this._dorso = "dorso.png";
		this._ultimaCarta = new Carta();
		this._ultimaCarta.id = 0;
		this._cooldownCarta = true;
		this._bandera =false;
		// this._ranking = ranking;
		this._nombre = "";
		this._dificultad = "";
		this.generarTablero();
	}

	generarTablero() {	
		
		for (var i = 1; i <= this.pares ; i++) {
			var nombreCarta = this.tema + i + ".jpg";
			var carta = new Carta(nombreCarta, i); // img , id } parametro this.img  y parametro this.id
			this.cartas.push(carta);
		}

		this.cartas.forEach(carta => {
			let duplicado = new Carta(carta.img, carta.id + this.pares);
			this.cartas.push(duplicado);
		});

		this.randomArray();

		this.initRender();
		
	}

	randomArray(){  //randomiza el tablero

		for(var u = this.cartas.length - 1; u > 0;u--){
			var c = Math.floor(Math.random()*(u+1));
			var temp = this.cartas[u];
			this.cartas[u] = this.cartas[c];
			this.cartas[c] = temp;
		}

	}

	initRender(){ 

		var section = document.getElementById('tablero');
		var main = section.parentNode;
		main.removeChild(section);
		section = document.createElement('section');
		main.appendChild(section);
		section.id = 'tablero';
			
		this.cartas.forEach(carta => {
			let _this = this;
			
    		var newdiv = document.createElement('div');
			newdiv.id = carta.id;
			
			newdiv.addEventListener("click", function(){ //callback

				if(!_this.cooldownCarta && !carta.flip){
					carta.cartaClickeada();
					_this.checkearCartas(carta);
					_this.animarCarta(carta);
					
					//_this.renderTablero(); //render cuando clickeas
				}

			});
		
			
			section.appendChild(newdiv);
			var newimg = document.createElement('img');
			newimg.className = ('card turnCSS');
			newimg.setAttribute("height", "150");
			newimg.setAttribute("width", "150");
			newdiv.appendChild(newimg);	

		});	

		this.renderTablero(); //Primer render

	}

	renderTablero(){  // muestra el trablero

		this.cartas.forEach(carta => {

			var imgs = document.getElementById(carta.id).getElementsByTagName('img');
			if (imgs.length > 0) {
				var img = imgs[0];
				img.setAttribute("src", "res/" + (carta.flip ? carta.img : this.dorso)); // es un If resumido para cosas chicas,  (condicion ? verdadero : falso)
			}

		});	

		if(this.bandera){
			this.showTurnosRestantes();
		}

	}

	checkearCartas(carta){  // revisa las cartas si matchean o no

		if (this.ultimaCarta.id == 0){
			this.ultimaCarta = carta;
			return;
		}

		let _this = this;
		this.turnos--;
		this.showTurnosRestantes();

		if(this.turnos == 0){
			alert("¡Has perdido!¡Suerte para la próxima!")
		}

		if(this.ultimaCarta.img == carta.img){ 
			this.ultimaCarta.flip = true; 
			carta.flip = true;
			this.ultimaCarta = new Object();
			this.ultimaCarta.id = 0;
			this.checkwin();
		}else{
			this.cooldownCarta = true;
			setTimeout(function(){ //callback 
				_this.resetearCartas(carta);
			}, 650);
		}
	
	}

	resetearCartas(carta) { // vuelve a dar vuelta las cartas

		this.ultimaCarta.flip = false; 
		carta.flip = false;
		this.animarCarta(carta);
		this.animarCarta(this.ultimaCarta);
		this.ultimaCarta = new Carta();
		this.ultimaCarta.id = 0;
		this.cooldownCarta = false;

	}

	showTurnosRestantes(){

		var turnos = document.getElementById('turnosRestantes');

		if (this.bandera == true){
			turnosRestantes.textContent='Tienes '+ this.turnos +' restantes.'
		}

	}

	checkwin(){

		var flipeadas = 0; 

		this.cartas.forEach(carta => {
			if(carta.flip){
				flipeadas++;

			}
		});

		if(flipeadas == this.cartas.length){

			var jugada = new Jugada(this.nombre, this.dificultad, this.turnos * 100)

			var currentRanks = JSON.parse(localStorage.getItem("rank"));

			if (!currentRanks) {
				currentRanks = [];
			}

			currentRanks.push(jugada); // empuja la informacion al array

			currentRanks.forEach(rank => {
				console.log(rank);
			});

			localStorage.setItem("rank", JSON.stringify(currentRanks));
			
			setTimeout(function(){ //callback 
				alert("¡Has ganado! Gracias por jugar");
			}, 500);
			
		}

	}

	resetTablero() {
		this.cartas.forEach(carta => {
			carta.flip = false;
		});

		this.randomArray();
		this.initRender();
	
	}

	animarCarta(carta){
		var imgCarta = document.getElementById(carta.id).getElementsByTagName('img')[0];
		let src = "res/" + (carta.flip ? carta.img : this.dorso);
		$(imgCarta)
        .addClass("flipping")
        .bind("transitionend webkittransitionend", function () { 
		this.src = src;
        $(this)
            .unbind("transitionend webkittransitionend")
            .removeClass("flipping")
    })
	}
	
	
	
}
