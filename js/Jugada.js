class Jugada {
    constructor(name, lvl, points){
        this._name = name;
        this._lvl = lvl; 
        this._points = points; 
    }

    get name (){
        return this._name;
    }

    get lvl (){
        return this._lvl;
    }
    
    get points (){
        return this._points;
    }

    set name(value){
        this._name = value ; 
    }

    set lvl(value){
        this._lvl = value ; 
    }

    set points(value){
        this._points = value ; 
    }



}