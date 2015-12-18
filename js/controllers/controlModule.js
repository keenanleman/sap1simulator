/**
 * Sebuah module berisi sebuah controller yaitu controlCtrl controller yang
 * berguna sebagai interface untuk berinteraksi dengan simulasi/simulationCtrl controller.
 * @module controlModule
 */
var controlModule = angular.module('controlModule',['parserModule','registerModule','schedulerModule'])
/**
 * controlCtrl merupakan sebuah controller yang dipangil oleh DOM sebagai sebuah constructor,
 * controller ini merupakan sebuah interface untuk berinteraksi dengan simulationCtrl
 * @class controlCtrl
 * @constructor
 */
controlModule.controller('controlCtrl',['$scope','$rootScope','parserService','registerService','schedulerService',
function($scope,$rootScope,parserService,registerService,schedulerService){
    var self = $scope;
    /**
     * Merupakan model dari TextField expression
     * @property expression
     * @type String
     */
    self.expression = "";
    /**
     * Merupakan model dari TextField instruction
     * @property instruction
     * @type String
     */
    self.instruction = "";
    self.isEdit = false;
	self.running = false;
	self.evaluated = false;
    self.sourceCode = [];
    /**
     * Digunakan tombol edit untuk memberikan user akses terhadap hasil source code yang di generate oleh parser
     * dan memparse kembali hasil perubahan
     * @method editToogle
     */
    self.editToogle = function(){
        if(self.isEdit){
            instructionField.attr('readonly','');
            self.sourceCode = parserService.parseRawToLines(self.instruction);
            values = parserService.parseSourceCode(self.sourceCode);
            for(var i = 0;i < values.length;++i){
               registerService.registers.ram.insert(i,values[i]);
            }
			self.evaluated = true;
            schedulerService.setInstructions(self.sourceCode);
        }else{
			self.evaluated = false;
            instructionField.removeAttr('readonly');
        }
        self.isEdit = !self.isEdit;
    }
    /**
     * Digunakan tombol run untuk memulai simulasi
     * @method run
     */
    self.run = function(){
        /**
         * Sebuah trigger untuk event 'startSimulation', yang akan memulai simulasi
         * @event startSimulation
         */
        $rootScope.$broadcast('startSimulation');
		self.running = true;
    }
    /**
     * Digunakan tombol pause untuk menghentikan simulasi
     * @method pause
     */
    self.pause = function(){
        /**
         * Sebuah trigger untuk event 'pauseSimulation', yang akan menghentikan simulasi
         * @event pauseSimulation
         */
        $rootScope.$broadcast('pauseSimulation');
		self.running = false;
    }
    /**
     * Digunakan tombol reset untuk mereset simulasi,ram,dan register
     * @method reset
     */
    self.reset = function(){
        /**
         * Sebuah trigger untuk event 'resetSimulation', yang akan mereset simulasi,ram,dan register
         * @event resetSimulation
         */
        $rootScope.$broadcast('resetSimulation');
    }
    /**
     * Berjalan ketika event 'simulationEnded' di broadcast
     * @event simulationEnded
     */
	$rootScope.$on('simulationEnded',function(event){
		self.running = false;
	});
    /**
     * Mem-parse expresi yang diberikan oleh user dan mengubahnya menjadi source code dengan mengunakan
     * 'parserService' dari parserModule, dan memasukannya kedalam RAM dan ke dalam 'schedulerService'
     * @method evaluate
     */
    self.evaluate = function(){
        self.sourceCode = [];
        self.instruction = "";
        var res = parserService.parseExpression(self.expression);
        self.sourceCode = res.sourceCode;
        var values = res.data;
        var binRes = parserService.parseSourceCode(self.sourceCode);
        for(var i = 0;i < self.sourceCode.length;++i){
           self.instruction += self.sourceCode[i] + '\n';
           registerService.registers.ram.insert(i,binRes[i]);
        }
        for(var i = firstDataIndex;i < 16;++i){
           registerService.registers.ram.insert(i,values[i]);
        }
		self.evaluated = true;
        schedulerService.setInstructions(self.sourceCode);
    }
}]);

