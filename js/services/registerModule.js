/**
 * Sebuah modul yang berisi sebuah service yang berlaku sebagai Factory yang menghasilkan semua
 * tipe register yang digunakan
 * @module registerModule
 */
/**
 * registerService berguna sebagai Factory yang menghasilkan semua tipe register yang digunakan
 * @class registerService
 * @constructor
 */
var registerModule = angular.module('registerModule',[]);
registerModule.service('registerService',[function(){
    var self = this;
    /**
     * Menampung semua kelas RegisterInfo dan turunannya
     * @property registers
     * @type Object
     */
    self.registers = {};
    /**
     * Mengembalikan objek RegisterInfo
     * @method addRegister
     * @param {String} title nama dari register
     * @param {Number} value nilai awal dari register
     * @param {Number} left posisi x register
     * @param {Number} top posisi y register
     * @param {Number} bits ukuran register dalam bits
     * @return {RegisterInfo} objek dari RegisterInfo
     */
    self.addRegister = function(title,value,left,top,bits){
        var newreg = new RegisterInfo(title,value,left,top,bits);
        self.registers[newreg.name] = newreg;
        return newreg;
    }
    /**
     * Mengembalikan objek RamInfo
     * @method addRam
     * @param {Number} value nilai awal dari register
     * @param {Number} left posisi x register
     * @param {Number} top posisi y register
     */
    self.addRam = function(value,left,top){
        var newreg = new RamInfo(value,left,top);
        self.registers[newreg.name] = newreg;
        return newreg;
    }
    /**
     * Mengembalikan objek CuInfo
     * @method addCU
     * @param {Number} left posisi x register
     * @param {Number} top posisi y register
     */
    self.addCU = function(left,top){
        var newreg = new CuInfo(left,top);
        self.registers[newreg.name] = newreg;
        return newreg;
    }
    /**
     * Mengebamlikan objek BdInfo
     * @method adBD
     * @param {Number} left posisi x register
     * @param {Number} top posisi y register
     */
    self.addBD = function(left,top){
        var newreg = new BdInfo(left,top);
        self.registers[newreg.name] = newreg;
        return newreg;
    }
}]);

