/**
 * Merupakan kelas turunan dari kelas RegisterInfo, yang secara spesifik
 * digunakan untuk membuat register Binary Display
 * @class BdInfo
 * @constructor
 * @param {Number} left posisi x dari register
 * @param {Number} top posisi y dari register
 * @module RegisterInfoPseudoModule
 * @extends RegisterInfo
 */
var BdInfo = function(left,top){
    RegisterInfo.call(this,'BD',0,left,top,8);
    /**
     * Method override,
     * method ini di override dari kelas RegisterInfo karena Binary Display akan menunjukan angka dalam format desimal melainkan binary
     * @method getDisplay
     * @return {String} nilai desimal dari register
     */
    this.getDisplay = function(){
        return this.value.toString();
    }
}

util.extends(BdInfo,RegisterInfo);
