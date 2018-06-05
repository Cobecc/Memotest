class Rank {

    constructor(points){
        this._points = points;   
    }
        
    multiplyPoints(){
        var turnosRestantes = tablero._turnos;
        var pts = 0; 

            if(turnosRestantes>0){
                pts = (turnosRestantes * 100);   
            }else{
                tablero.checkearCartas(carta);
            }
        this._points = pts;
    }

    storageItem(){
        $(document).ready(function(){

            $('#cargar').click(function(){
                // dato del Inputs 
                var nombre = document.getElementById('nJugador').value;
                var dif = document.getElementsByClassName('boton').value;
                var puntosGanados = multiplyPoints();

                localStorage.setItem("Jugador",nombre);
                localStorage.getItem("Jugador");
                
                localStorage.setItem("Dificultad",dif);
                localStorage.setItem("Puntos",puntosGanados);
            
            });

        })        
            
        

    }


}

var name = localStorage.getItem("nJugador");
var puntos = localStorage.getItem(this._points);
document.getElementById("nJugador").value;
document.getElementById('Points');