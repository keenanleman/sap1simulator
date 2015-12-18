/**
 * Sebuah modul yang berisi sebuah service yang berlaku sebagai pemandu jalannya simulasi
 * @module schedulerModule
 */
/**
 * schedulerService berguna sebagai pemandu jalannya simulasi
 * @class schedulerModule
 * @constructor
 */
var schedulerModule = angular.module('schedulerModule',[]);
schedulerModule.service('schedulerService',[function(){
    /**
     * Menyimpan index instruksi yang sedang berjalan
     * @property currentInstruction
     * @type Number
     */
    this.currentInstruction = 0;
    /**
     * Menyimpan state yang sedang berjalan
     * @property currentState
     * @type Number
     */
    this.currentState = 0;
    /**
     * Status simulasi
     * @property status
     * @type Boolean
     */
    this.status = false;
    /**
     * Array dari instruksi
     * @property instructions
     * @type Array
     */
    this.instructions = [];
    /**
     * Memasukan instruksi-instruksi ke dalam scheduler
     * @method setInstructions
     * @param {Array} instructions merupakan array dari instruksi
     */
    this.setInstructions = function(instructions){
        this.instructions = instructions;
    }
    /**
     * Mengeset index currentInstruction untuk me-load instruksi selanjutnya
     * @method nextInstruction
     */
    this.nextInstruction = function(){
        this.currentInstruction += 1;
    }
    /**
     * Mengeset index currentState untuk me-load state selanjutnya
     * @method nextState
     */
    this.nextState = function(){
        if(this.currentState == 6){
            this.currentState = 0;
            this.nextInstruction();
        }else{
            this.currentState += 1;
        }
    }
    /**
     * Memulai scheduler
     * @method startScheduler
     */
    this.startScheduler = function(){
        this.status = true;
    }
    /**
     * Mereset schedulerService
     * @method resetScheduler
     */
    this.resetScheduler = function(){
        this.currentInstruction = 0;
        this.currentState = 0;
    }
    /**
     * Menghentikan scheduler
     * @method pauseScheduler
     */
    this.pauseScheduler = function(){
        this.status = false;
    }
    /**
     * Mengembalikan instruksi yang sedang berjalan
     * @method pauseScheduler
     */
    this.getCurrentInstruction = function(){
        return this.instructions[this.currentInstruction];
    }
}]);

