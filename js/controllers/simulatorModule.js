/**
 * Sebuah module berisi sebuah controller yaitu simulationCtrl controller yang
 * berguna untuk berinteraksi langsung dengan DOM dan animasi DOM.
 * @module simulatorModule
 */
var simulatorModule = angular.module('simulatorModule',['registerModule','schedulerModule']);
/**
 * simulatorCtrl merupakan sebuah controller yang dipangil oleh DOM sebegai sebuah constructor,
 * controller ini berguna sebagai DOM generator, DOM controller, dan jembatan antara DOM dan
 * model data.
 * @class simulatorCtrl
 * @constructor
 */
simulatorModule.controller('simulatorCtrl',['$scope','$rootScope','$q','$compile','registerService','schedulerService',
function($scope,$rootScope,$q,$compile,registerService,schedulerService){
    /**
     * Pengaturan kecepatan animasi
     * @property animationSpeed
     * @type Number
     */
    var self = $scope;
    self.animationSpeed = 1200
    /**
     * Pengaturan delay animasi
     * @property masterDelay
     * @type Number
     */
    self.masterDelay = 500;
    /**
     * Event slide dari speedSlider yang mengatur kecepatan animasi
     * @event slide
     */
    speedSlider.on('slide',function(event,ui){
        self.masterDelay = 1750 - ui.value;
        self.animationSpeed = ui.value;
        self.$digest();
    });
    var bus = $('.busBox').offset();
    /**
     * Sebagai objek yang menampung register
     * @property reg
     * @type Object
     */
    self.reg = {};
    /**
     * Dijalankan ketika instruksi LDA di gunakan,
     * melakukan instruksi tergantung dari state method ini dipanggil dan dipandu oleh 'schedulerService'
     * @method lda
     * @return {Promise}
     */
    self.lda = function(){
        var q = $q.defer();
        if(schedulerService.currentState < 5) self.generalInstruction().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else if(schedulerService.currentState == 5) self.T5_LDA().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else setTimeout(function(){
            schedulerService.nextState();
            q.resolve()
        },self.masterDelay);
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi HALT di gunakan, dan dipandu oleh 'schedulerService'
     * melakukan instruksi tergantung dari state method ini dipanggil dan dipandu oleh 'schedulerService'
     * @method halt
     * @return {Promise}
     */
    self.halt = function(){
        var q = $q.defer();
        if(schedulerService.currentState < 3) self.generalInstruction().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else if(schedulerService.currentState == 3) self.T3().then(function(){
            schedulerService.pauseScheduler();
			$rootScope.$broadcast('simulationEnded');
			self.running = false;
            q.resolve();
        })
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi OUT di gunakan, dan dipandu oleh 'schedulerService'
     * melakukan instruksi tergantung dari state method ini dipanggil dan dipandu oleh 'schedulerService'
     * @method out
     * @return {Promise}
     */
    self.out = function(){
        var q = $q.defer();
        if(schedulerService.currentState < 4) self.generalInstruction().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else if(schedulerService.currentState == 4) self.T4_OUT().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else setTimeout(function(){
            schedulerService.nextState();
            q.resolve();
        },self.masterDelay);
        return q.promise;
    }

    /**
     * Dijalankan ketika instruksi ADD atau SUB di gunakan, dan dipandu oleh 'schedulerService'
     * melakukan instruksi tergantung dari state method ini dipanggil dan dipandu oleh 'schedulerService'
     * @method cal
     * @param {boolean} plus jika bernilai true maka operasi ADD dijalankan jika false maka operasi SUB yang akan dijalankan
     * @return {Promise}
     */
    self.cal = function(plus){
        var q = $q.defer();
        var q = $q.defer();
        if(schedulerService.currentState < 5) self.generalInstruction(plus).then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else if(schedulerService.currentState == 5) self.T5_CAL(plus).then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        else if(schedulerService.currentState == 6) self.T6_CAL().then(function(){
            schedulerService.nextState();
            q.resolve();
        })
        return q.promise;
    }
    /**
     * Dijalankan ketika sebuah instruksi memiliki state yang sama, maka akan dijalankan
     * sebuah method umum saja , dan dipandu oleh 'schedulerService'
     * @method generalInstruction
     * @return {Promise}
     */
    self.generalInstruction = function(){
        var q = $q.defer();
        if(schedulerService.currentState == 0) setTimeout(function(){q.resolve()},self.masterDelay);
        else if(schedulerService.currentState == 1) self.T1().then(function(){q.resolve();})
        else if(schedulerService.currentState == 2) self.T2().then(function(){q.resolve();})
        else if(schedulerService.currentState == 3) self.T3().then(function(){q.resolve();})
        else if(schedulerService.currentState == 4) self.T4().then(function(){q.resolve();})
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi-instruksi berada pada state T1
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T1
     * @return {Promise}
     */
    self.T1 = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.pc.moveData(self.reg.mar,true,true)
        .then(function(){
            q.resolve();
        })
        self.reg.cu.info.ep();
        self.reg.cu.info.not_lm();
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi-instruksi berada pada state T2
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T2
     * @return {Promise}
     */
    self.T2 = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.pc.increment()
        setTimeout(function(){
            q.resolve();
        },self.masterDelay);
        self.reg.cu.info.cp();
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi-instruksi berada pada state T3
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T3
     * @return {Promise}
     */
    self.T3 = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.not_ce();
        self.reg.cu.info.not_li();
        self.reg.mar.moveData(self.reg.ram,false,true)
        .then(function(){
            return self.reg.ram.moveData(self.reg.ir,true,true)
        })
        .then(function(){
            return self.reg.ir.moveData(self.reg.cu,false,false,1)
        })
        .then(function(){
            q.resolve();
        })
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi-instruksi berada pada state T4, kecuali instruksi OUT
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T4
     * @return {Promise}
     */
    self.T4 = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.not_lm();
        self.reg.cu.info.not_ei();
        self.reg.ir.moveData(self.reg.mar,true,true,2)
        .then(function(){
            return self.reg.mar.moveData(self.reg.ram,false,true);
        })
        .then(function(){
            q.resolve();
        });
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi LDA berada pada state T5
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T5_LDA
     * @return {Promise}
     */
    self.T5_LDA = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.not_la();
        self.reg.cu.info.not_ce();
        self.reg.ram.moveData(self.reg.acc,true,true)
        .then(function(){
            q.resolve();
        });
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi OUT berada pada state T4
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T4_OUT
     * @return {Promise}
     */
    self.T4_OUT = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.ea();
        self.reg.cu.info.not_lo();
        self.reg.acc.moveData(self.reg.or,true,true)
        .then(function(){
            return self.reg.or.moveData(self.reg.bd,false,true);
        })
        .then(function(){
            q.resolve();
        });
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi ADD atau SUB berada pada state T5
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T5_CAL
     * @param {boolean} plus jika bernilai true maka operasi ADD dijalankan jika false maka operasi SUB yang akan dijalankan
     * @return {Promise}
     */
    self.T5_CAL = function(plus){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.not_ce();
        self.reg.cu.info.not_lb();
        self.reg.ram.moveData(self.reg.rb,true,true)
        .then(function(){
            return self.addRegsTo(self.reg.acc,self.reg.rb,self.reg.alu,plus);
        })
        .then(function(){
            q.resolve();
        });
        return q.promise;
    }
    /**
     * Dijalankan ketika instruksi ADD atau SUB berada pada state T6
     * melakukan animasi, perpindahan data, dan perubahan register CU
     * @method T6_CAL
     * @return {Promise}
     */
    self.T6_CAL = function(){
        var q = $q.defer();
        self.reg.cu.info.reset_cu();
        self.reg.cu.info.not_la();
        self.reg.cu.info.eu();
        self.reg.alu.moveData(self.reg.acc,true,true)
        .then(function(){
            q.resolve();
        });
        return q.promise;
    }
    /**
     * Digunakan untuk membuat animasi dan perpindahan data, dari hasil sum atau substract dari
     * dua buah register dan menyimpannya ke register lain
     * @method addRegsTo
     * @param {Register} reg1 register pertama dari 2 register yang akan di sum atau substract
     * @param {Register} reg2 register pertama dari 2 register yang akan di sum atau men-substract
     * @param {Register} dest register dimana hasil akan disimpan
     * @param {boolean} plus jika bernilai true maka data akan di sum dan jika false maka data akan di substract
     * @return {Promise}
     */
    self.addRegsTo = function(reg1,reg2,dest,plus){
        var q = $q.defer();
        reg1.createCarrier()
        .then(function(carrierBox1){
            carrierBox1.animate({ top : dest.dataDom.offset().top - 10 },self.masterDelay)
            .animate({opacity : 0},self.masterDelay,function(){
                carrierBox1.remove();
            });
        });
        reg2.createCarrier()
        .then(function(carrierBox2){
            carrierBox2.animate({ top : dest.dataDom.offset().top - 10 },self.masterDelay)
            .animate({opacity : 0},self.masterDelay,function(){
                carrierBox2.remove();
                if(plus)dest.info.setData({value : reg1.info.value + reg2.info.value, bits : 8});
                else dest.info.setData({value : reg1.info.value - reg2.info.value, bits : 8});
                self.$digest()
                q.resolve();
            });
        });
        return q.promise;
    }
    /**
     * Model yang menyimpan instruksi yang sedang dijalankan
     * @property currentIns
     * @type {String}
     */
    self.currentIns = '';
    /**
     * Model yang menyimpan state yang sedang berjalan
     * @property state
     * @type {Number}
     */
	self.state = 0;
	 /**
     * Sebuah objek yang menyimpan log dari hasil simulasi
     * @property logs
     * @type Array
     */
	self.logs = [];
    /**
     * Model yang menyimpan status dari simulasi
     * @property running
     * @type {boolean}
     */
	self.running = false;
    /**
     * Method yang memulai simulasi di simulationCtrl
     * @method startSimulation
     */
    self.startSimulation = function(){
        schedulerService.startScheduler();
		self.running = true;
        self.sentinel();
    }
    /**
     * Method yang menghentikan simulasi di simulationCtrl
     * @method pauseSimulation
     */
    self.pauseSimulation = function(){
        schedulerService.pauseScheduler();
		self.running = false;
    }
    /**
     * Method yang me-reset simulasi di simulationCtrl
     * @method resetSimulation
     */
    self.resetSimulation = function(){
        schedulerService.resetScheduler();
		self.reg.ram.info.resetRam();
		self.reg.cu.info.reset_cu();
		self.keys = [];
		var keys = Object.keys(this.reg);
		for(var i = 0;i < keys.length;++i){
			if(keys[i] !== 'ram' && keys[i] !== 'cu')this.reg[keys[i]].info.resetToZero();
		}
    }
    /**
     * Membuat animasi sambungan antara dua register
     * @method registerToRegisterConnection
     * @param {Register} reg1 register yang akan disambungkan ke register kedua
     * @param {Register} reg2 register yang akan disambungkan ke register pertama
     * @param {String} title tulisan/judul yang akan ditampilkan
     * @param {String} direction arah dari jalur, ke kiri atau ke kanan ['left','right']
     */
    self.registerToRegisterConnection = function(reg1,reg2,title,direction){
        var up = '&#x2191;';
        var down = '&#x2193;';
        var pos1 = reg1.dom.offset();
        var pos2 = reg2.dom.offset();
        var height = Math.abs(pos2.top - pos1.top);
        var connector = registerConnector.clone();
        if(direction === 'up') title += up;
        else if(direction === 'down') title = title + down;
        connector.find('.connectorTitle').css({
            top : '50%'
        }).html(title);
        connector.css({
            height : height,
            top : pos1.top,
            left : pos1.left + 35,
            width : '25px'
        });
        simulatorWindow.append(connector);
    }
    /**
     * Membuat animasi sambungan antara bus dengan register
     * @method busConnection
     * @param {Register} reg register yang akan disambungkan ke bus
     * @param {String} title tulisan/judul yang akan ditampilkan
     * @param {String} align tempat register berada, di sebelah kiri bus atau kanan ['left','right']
     * @param {String} direction arah dari jalur, ke kiri atau ke kanan ['left','right']
     */
    self.busConnection = function(reg,title,align,direction){
        var right = '&#x2192;';
        var left = '&#x2190;';
        var pos = reg.dom.position();
        var startX = 0;
        if(align ===  'left') startX = pos.left + 57;
        else if(align === 'right') startX = busBox.position().left + 92;
        var width = Math.abs(busBox.position().left - pos.left);
        var connector = registerConnector.clone();
        if(direction === 'right') title += right;
        else if(direction === 'left') title = left + title;
        connector.find('.connectorTitle').html(title);
        connector.css({
            height : '15px',
            top : pos.top + 14,
            left : startX,
            width : width
        });
        simulatorWindow.append(connector);
    }
    /**
     * Membuat animasi sambungan ganda antara bus dengan register
     * @method doubleBusConnection
     * @param {Register} reg register yang akan disambungkan ke bus
     * @param {String} title1 tulisan/judul yang akan ditampilkan pada jalur pertama
     * @param {String} title2 tulisan/judul yang akan ditampilkan pada jalur ke dua
     * @param {String} align tempat register berada, di sebelah kiri bus atau kanan ['left','right']
     * @param {String} direction1 arah dari jalur pertama, ke kiri atau ke kanan ['left','right']
     * @param {String} direction2 arah dari jalur kedua, ke kiri atau ke kanan ['left','right']
     */
    self.doubleBusConnection = function(reg,title1, title2,align,direction1, direction2){
        var right = '&#x2192;';
        var left = '&#x2190;';
        var pos = reg.dom.position();
        var width = Math.abs(busBox.position().left - pos.left);
        var connector = registerConnector.clone();
        var startX = 0;
        if(align ===  'left') startX = pos.left + 57;
        else if(align === 'right') startX = busBox.position().left + 92;
        if(direction1 === 'right') title1 += right;
        else if(direction1 === 'left') title1 = left + title1;
        connector.find('.connectorTitle').html(title1);
        simulatorWindow.append(connector);
        connector.css({
            height : '15px',
            top : pos.top + 6,
            left : startX,
            width : width
        });
        connector = connector.clone();
        if(direction2 === 'right') title2 += right;
        else if(direction2 === 'left') title2 = left + title2;
        connector.find('.connectorTitle').html(title2);
        simulatorWindow.append(connector);
        connector.css({
            height : '15px',
            top : pos.top + 24,
            left : startX,
            width : width
        });
    }
    var keys = [];
   
    /**
     * Merupakan method yang secara langsung mengendalikan method-method animasi dan perpindahan data
     * secara synchronous, dan di pandu oleh flag-flag dari 'schedulerService'
     * @method sentinel
     */
    self.sentinel = function(){
        if(schedulerService.status == false){
            return;
        }
        var cmd = schedulerService.getCurrentInstruction();
		self.currentIns = cmd;
		self.state = schedulerService.currentState;
		var cIdx = self.logs.push({title : self.currentIns + ' T' + self.state}) - 1;
        self.logs[cIdx].body = [];
        var logCallback = function(){ keys.forEach(function(key){
                self.logs[cIdx].body.push({name : self.reg[key].info.title, display : self.reg[key].info.getDisplay()});
            });
        }
        cmd = cmd.split(' ')[0]
        if(cmd == 'LDA') self.lda().then(function(){
            logCallback();
            self.sentinel()
        });
        else if(cmd == 'ADD') self.cal(true).then(function(){
            logCallback();
            self.sentinel()
        });
        else if(cmd == 'SUB') self.cal(false).then(function(){
            logCallback();
            self.sentinel()
        });
        else if(cmd == 'OUT') self.out().then(function(){
            logCallback();
            self.sentinel()
        });
        else if(cmd == 'HALT') self.halt().then(function(){
            logCallback();
            self.sentinel()
        });
    }
    /**
     * Merupakan event-listener dari event 'startSimulation', yang akan memulai simulasi
     * @event startSimulation
     */
    $rootScope.$on('startSimulation',function(event){
        keys = Object.keys(self.reg);
        self.startSimulation();
    })
    /**
     * Merupakan event-listener dari event 'pauseSimulation', yang akan menghentikan simulasi
     * @event pauseSimulation
     */
    $rootScope.$on('pauseSimulation',function(event){
        self.pauseSimulation();
		console.log(self.logs);
    })
    /**
     * Merupakan event-listener dari event 'resetSimulation', yang akan me-reset simulasi
     * @event resetSimulation
     */
    $rootScope.$on('resetSimulation',function(event){
        self.resetSimulation();
    })

    /**
     * Kelas Register merupakan kelas wrapper dari kelas RegisterInfo yang memberikan
     * kelas RegisterInfo kemampuan untuk berinteraksi langsung dengan DOM dan animasi DOM
     * @class Register
     * @method addReg
     * @param {String} type tipe register yang akan dibuat
     * @param {String} title nama register yang akan dibuat
     * @param {String} value nilai awal register
     * @param {String} left posisi x register
     * @param {String} top posisi y register
     * @param {String} bit ukuran register dalam bit
     * @constructor
     */
    var addReg = function(type,title,value,left,top,bits){
        var newreg = {};
        /**
         * Merupakan property yang menampung kelas RegisterInfo
         * @property info
         * @module RegisterInfoPseudoModule
         * @type RegisterInfo
         */
        if(type === 'reg') newreg.info = registerService.addRegister(title,value,left,top,bits);
        else if(type === 'ram') newreg.info = registerService.addRam(value,left,top);
        else if(type === 'cu') newreg.info = registerService.addCU(left,top);
        else if(type === 'bd') newreg.info = registerService.addBD(left,top);
        /**
         * Menyimpan DOM untuk register yang di construct
         * @property dom
         * @type Object
         */
        newreg.dom = registerBoxTemplate.clone();
        newreg.dom.find('.registerTitle').html(title);
        newreg.dom.css({left : newreg.info.top, top : newreg.info.left});
        /**
         * Menyimpan DOM untuk register yang di construct
         * @property dataDom
         * @type Object
         */
        newreg.dataDom = newreg.dom.find('.registerData');
        newreg.dataDom.attr('ng-bind','reg.' + newreg.info.name + '.info.getDisplay()');
        newreg.dom.appendTo(simulatorWindow);
        $compile(newreg.dom)(self);
        /**
         * Membuat DOM 'data carrier' sebagai animasi perpindahan data
         * @method createCarrier
         * @param {Number} EtoF bagian 4-bit pertama jika bernilai satu dan 4-bit terakhir jika bernilai dua,
         * dari 8 bit data yang akan dipindahkan ke register 4-bit, tidak di gunakan jika perpindahan data
         * antara dua register berukuran sama.
         */
        newreg.createCarrier = function(EtoF){
            var q = $q.defer();
            var carrierBox = newreg.dataDom.clone();
            var pos = newreg.dataDom.offset();
            var size = {width : newreg.dataDom.width() ,height : newreg.dataDom.height()};
            carrierBox.addClass('carrierBox');
            carrierBox.css({
                opacity:0,
                top : pos.top - 14,
                left : pos.left - 14,
                height : size.height,
                width : size.width
            });
            if(EtoF){
                var dataBin = util.splitBits(newreg.info);
                if(EtoF === 1){
                    carrierBox.html(dataBin.first.display);
                }else{
                    carrierBox.html(dataBin.second.display);
                }
            }else{
                carrierBox.html(newreg.info.display);
            }
            simulatorWindow.append(carrierBox);
            carrierBox.animate({opacity:1},self.masterDelay,function(){
                q.resolve(carrierBox);
            });
            return q.promise;
        }
        /**
         * Membuat animasi dan perpindahan data ke register lain
         * @method moveData
         * @param {Register} reg register tempat data akan dipindahkan
         * @param {boolean} useBus jika bernilai true maka animasi perpindahan data akan melewati bus dan sebaliknya
         * @param {boolean} real jika bernilai false maka data tidak akan dipindahkan melainkan hanya membuat animasinya saja
         * @param {Number} EtoF bagian 4-bit pertama jika bernilai satu dan 4-bit terakhir jika bernilai dua,
         * dari 8 bit data yang akan dipindahkan ke register 4-bit, tidak di gunakan jika perpindahan data
         * antara dua register berukuran sama.
         */
        newreg.moveData = function(reg,useBus,real,EtoF){
            var q = $q.defer();
            newreg.createCarrier(EtoF)
            .then(function(carrierBox){
                if(useBus)carrierBox.animate({ left : bus.left + 20 },self.masterDelay);
                carrierBox.animate({ top : reg.dataDom.offset().top - 14 },self.masterDelay);
                if(useBus)carrierBox.animate({left : reg.dataDom.offset().left - 14},self.masterDelay);
                carrierBox.animate({opacity : 0},self.masterDelay,function(){
                    carrierBox.remove();
                    if(real)reg.info.setData(newreg.info,EtoF);
                    self.$digest();
                    q.resolve();
                });
            });
            return q.promise;
        }
        /**
         * Menambahkan 1 pada register
         * @method increment
         */
        newreg.increment = function(){
            newreg.info.value++;
            newreg.info.setData(newreg.info);
        }
        self.reg[newreg.info.name] = newreg;
    }
    /**
     * Melakukan instansiasi register-register
     * @method init
     */
    self.init = function(){
        addReg('reg','PC',0,'10%','5%',4);
        addReg('reg','MAR',0,'25%','5%',4);
        addReg('ram','RAM',0,'40%','5%',4);
        addReg('reg','IR',0,'55%','5%',8);
        addReg('cu','CU',0,'70%','5%',4);
        addReg('reg','ACC',0,'10%','70%',8);
        addReg('reg','ALU',0,'25%','70%',8);
        addReg('reg','RB',0,'40%','70%',8);
        addReg('reg','OR',0,'55%','70%',8);
        addReg('bd','BD',0,'70%','70%',8);
        self.registerToRegisterConnection(self.reg.mar, self.reg.ram,'8','down');
        self.busConnection(self.reg.pc,'4','left','right');
        self.busConnection(self.reg.mar,'4','left','left');
        self.busConnection(self.reg.ram,'8','left','right');
        self.registerToRegisterConnection(self.reg.ir, self.reg.cu,'4','down');
        self.doubleBusConnection(self.reg.ir,'8','4','left','left','right');
        self.doubleBusConnection(self.reg.acc,'8','8','right','right','left');
        self.busConnection(self.reg.alu,'8','right','left');
        self.registerToRegisterConnection(self.reg.acc, self.reg.alu,'8','down');
        self.registerToRegisterConnection(self.reg.alu, self.reg.rb,'8','up');
        self.busConnection(self.reg.rb,'8','right','right');
        self.busConnection(self.reg.or,'8','right','right');
        self.registerToRegisterConnection(self.reg.or, self.reg.bd,'8','down');
    }
    self.init();
}]);

