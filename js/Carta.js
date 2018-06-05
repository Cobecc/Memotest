class Carta {

	get img() {
		return this._img;
	}
	
	set img(value) {
		this._img = value;
	}
	
	get id() {
		return this._id;
	}
	
	set id(value) {
		this._id = value;
	}
	
	get flip() {
		return this._flip;
	}
	
	set flip(value) {
		this._flip = value;
	}
	

	constructor(img = "" , id = 0){
		this._img = img;
		this._id = id;
		this._flip = false;
	}


	cartaClickeada(){
		if(this.flip == false){
			this.flip = true;
		}
	}

}

