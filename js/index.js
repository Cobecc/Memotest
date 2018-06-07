/*
El juego de memotest deberá cumplir las siguientes consignas:

1- Tener un tablero de 12 fichas (6 pares)
2- Deben acomodarse las fichas de forma aleatoria, cada vez que se inicie un nuevo juego.
3- Al completar todos los pares mostrar un mensaje de ganó. 
4- Permitir ingresar el nombre del jugador al iniciar el juego
5- Tener 24 oportunidades, si no descubre todo el tablero en esa cantidad perderá.

*/

var par = 8;
var cantCards = (par * 2);
var totalTurns= 0 ; 	

var tablero = new Tablero(par);
genRank();

function nombreUsuario(){
    
    var usuarioNombre = document.getElementById('nJugador').value;
    var input = document.getElementById('resu');
    
    if(usuarioNombre == ""){
       input.textContent='Por favor ingrese un nombre.';
        bandera = false;
       
    }else{
        input.textContent='Buena suerte ' + usuarioNombre + ' !';
        bandera = true;
        tablero.cooldownCarta = false;
        tablero.bandera = true;
        tablero.nombre = usuarioNombre;
        dificultad();
        tablero.showTurnosRestantes();
    }
   
}
function dificultad(){

	var radios = document.getElementsByName('lvl');
    var valor = 0;
    
 	for(var x = 0; x < radios.length; x++) {
        console.log(radios[x].checked);
        if(radios[x].checked){
            switch (x) {
                case 0:
                    valor = (par * 2.5);        
                    tablero.dificultad = "facil"
                    break;
                case 1:
                    valor = (par * 2);        
                    tablero.dificultad = "intermedio"
                    break;
                case 2:
                    valor = (par * 1.5);        
                    tablero.dificultad = "dificil"
                    break;

                default:
                    break;
            }
        }
    }
    this.tablero.turnos = valor;
}

function genRank(){
    var items = JSON.parse(localStorage.getItem('rank'));
    console.log(items);
    var tabla = document.getElementById('ranking');
    var titulos = document.createElement('tr');
    var nombre = document.createElement('th');
    var dif = document.createElement('th');
    var puntos = document.createElement('th');
    nombre.textContent = "Nombre";
    dif.textContent = "Dificultad";
    puntos.textContent = "Puntos";
    titulos.appendChild(nombre);
    titulos.appendChild(dif);
    titulos.appendChild(puntos);


    tabla.appendChild(titulos);
    if(items !== null){
        items.forEach(rank => {
        console.log(items);  
        var row = document.createElement('tr');
        tabla.appendChild(row);
        var nombre = document.createElement('td');
        var dif = document.createElement('td');
        var puntos = document.createElement('td');
        
        nombre.textContent = rank._name;
        dif.textContent = rank._lvl;
        puntos.textContent = rank._points;
        row.appendChild(nombre);
        row.appendChild(dif);
        row.appendChild(puntos);

        });
    }
   
    
 

}

//listener para el boton

var cargar = document.getElementById('cargar');
cargar.addEventListener('click',nombreUsuario)

var reset = document.getElementById('reset');
reset.addEventListener('click', function(){
    tablero.resetTablero();
});
