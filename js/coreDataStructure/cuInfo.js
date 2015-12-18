/**
 * Merupakan kelas turunan dari kelas RegisterInfo, yang secara spesifik
 * digunakan untuk membuat register CU
 * @class CuInfo
 * @constructor
 * @param {Number} left posisi x dari register
 * @param {Number} left posisi y dari register
 * @module RegisterInfoPseudoModule
 * @extends RegisterInfo
 */
var CuInfo = function(left,top){
    RegisterInfo.call(this,'CU',995,left,top,8);
    /**
     * Method override, method kosong ini di override agar mampu mempertahankan
     * sifat register CU namun mampu berinteraksi dengan kelas wrapper Register
     * @method setData
     * @param reginfo reginfo tidak digunakan
     */
    this.setData = function(reginfo){/* empty */}
    /**
     * Method override, method kosong ini di override agar mampu mempertahankan
     * sifat register CU namun mampu berinteraksi dengan kelas wrapper Register
     * @method getData
     * @return 0 tidak digunakan
     */
    this.getData = function(){/* always zero */ return 0;}
    /**
     * Me-reset nilai dari register CU
     * @method reset_cu
     */
    this.reset_cu = function(){
        this.display = '0011 1110 0011';
    }
    /**
     * Merubah sinyal cp menjadi 1
     * @method cp
     */
    this.cp = function(){
        this.display = this.display.replaceAt(0,'1');
    }
    /**
     * Merubah ep menjadi 1
     * @method ep
     */
    this.ep = function(){
        this.display = this.display.replaceAt(1,'1');
    }
    /**
     * Merubah lm menjadi 0
     * @method not_lm
     */
    this.not_lm = function(){
        this.display = this.display.replaceAt(2,'0');
    }
    /**
     * Merubah ce menjadi 0
     * @method not_ce
     */
    this.not_ce = function(){
        this.display = this.display.replaceAt(3,'0');
    }
    /**
     * Merubah li menjadi 0
     * @method not_li
     */
    this.not_li = function(){
        this.display = this.display.replaceAt(5,'0');
    }
    /**
     * Merubah ei menjadi 0
     * @method not_ei
     */
    this.not_ei = function(){
        this.display = this.display.replaceAt(6,'0');
    }
    /**
     * Merubah la menjadi 0
     * @method not_la
     */
    this.not_la = function(){
        this.display = this.display.replaceAt(7,'0');
    }
    /**
     * Merubah ea menjadi 1
     * @method ea
     */
    this.ea = function(){
        this.display = this.display.replaceAt(8,'1');
    }
    /**
     * Merubah su menjadi 1
     * @method su
     */
    this.su = function(){
        this.display = this.display.replaceAt(10,'1');
    }
    /**
     * Merubah eu menjadi 1
     * @method eu
     */
    this.eu = function(){
        this.display = this.display.replaceAt(11,'1');
    }
    /**
     * Merubah lb menjadi 0
     * @method lb
     */
    this.not_lb = function(){
        this.display = this.display.replaceAt(12,'1');
    }
    /**
     * Merubah lo menjadi 0
     * @method lo
     */
    this.not_lo = function(){
        this.display = this.display.replaceAt(13,'1');
    }
    this.reset_cu();
}

util.extends(CuInfo,RegisterInfo);
