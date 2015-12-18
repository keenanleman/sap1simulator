/**
 * Merupakan kelas turunan dari kelas RegisterInfo, yang digunakan untuk membuat register ram
 * @class RamInfo
 * @constructor
 * @param {String} value nilai awal register
 * @param {String} left posisi x register
 * @param {String} top posisi y register
 * @module RegisterInfoPseudoModule
 */
var RamInfo = function(value,left,top){
    RegisterInfo.call(this,'RAM',value,left,top,8);
    /**
     * Merupakan tempat menyimpan isi dari ram
     * @property memory
     * @type Object
     */
    this.memory = [];
    /**
     * Mereset nilai dari semua address di RAM menjadi nol
     * @method resetRam
     */
	this.resetRam = function(){
		for(var i = 0;i < 16;++i){
			this.memory[i] = {displayAddress : 'R' + i,decimal : 0, binary : '0000 0000'};
		}
		this.value = value;
		this.display = '0000 0000';
	}
	this.resetRam();
    /**
     * Merupakan method override
     * Mengeset nilai pada tempat yang ditunjuk pointer RAM
     * @method setData
     * @param {RegisterInfo} reginfo register yang di gunakan sebagai sumber data
     */
    this.setData = function(reginfo){
        this.value = this.memory[reginfo.value].decimal;
        this.display = this.memory[reginfo.value].binary;
    }

    /**
     * Merupakan method override
     * Mengembalikan data yang sedang ditunjuk oleh pointer RAM
     * @method getData
     * @param {RegisterInfo} reginfo register yang di gunakan sebagai sumber data
     * @return {Number}
     */
    this.getData = function(){
        return this.memory[this.value].decimal;
    }
    /**
     * Memasukan data pada RAM
     * @method insert
     */
    this.insert = function(address, value){
         this.memory[address].decimal = value;
         this.memory[address].binary = util.convertToBin({value : parseInt(value),bits : 8});
    }
}

util.extends(RamInfo,RegisterInfo);
