/**
 * Objek util
 * objek yang berisi method-method utility, untuk mengolah data dan melakukan penurunan kelas
 * @class util
 * @module RegisterInfoPseudoModule
 **/
var util = {
	/**
     * Method ini berguna untuk mengkonversi bilangan decimal ke binary
	 * @method convertToBin
     * @param {RegisterInfo} data data register yang akan di konversi
     * @return {String} nilai dari register dalam bentuk binary
	 */
    convertToBin : function(data){
        var binValue = data.value.toString(2);
        if(data.bits === 4){
            while(binValue.length < 4) binValue = '0' + binValue;
        }else if(data.bits === 8){
            while(binValue.length < 8) binValue = '0' + binValue;
            binValue = [binValue.slice(0,4),' ', binValue.slice(4)].join("");
        }
        return binValue;
    },
	/**
     * Method ini berguna untuk mengkonversi nilai register dari  bilangan decimal kedalam 2 x 4bit binary format dan juga decimal
	 * @method splitBits
     * @param {RegisterInfo} data data register yang akan di konversi
     * @return {Object} berisi dua bagian 4bit dalam bentuk binary dan decimal
	 */
    splitBits : function(data){
        var binValue = util.convertToBin(data);
        var firstDisplay = binValue.slice(0,4);
        var secondDisplay = binValue.slice(4);
        var firstValue = parseInt(firstDisplay,2);
        var secondValue = parseInt(secondDisplay,2);
        binValue = {first :{value : firstValue ,display : firstDisplay},second :{ value : secondValue, display : secondDisplay}};
        return binValue;
    },
    /**
     * Method ini berguna untuk menurunkan kelas
     * @method extends
     * @param {Object} ctor merupakan kelas turunan
     * @param {Object} superCtor merupakan kelas yang akan di turunkan
     */
    extends : function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
        });
    }
};
