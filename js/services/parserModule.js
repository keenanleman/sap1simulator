/**
 * Sebuah module berisi sebuah service yaitu  parserService yang
 * berguna untuk meninterpretasikan ekspresi menjadi source code dan juga merubah bentuk source menjadi
 * bentuk binary.
 * @module parserModule
 */
var parserModule = angular.module('parserModule',[]);
/**
 * parserService berguna untuk meninterpretasikan expresi menjadi source code dan juga merubah bentuk source menjadi
 * bentuk binary. Selain itu parserService juga meninterpretasikan operasi-operasi sehingga mudah di simulasikan
 * @class parserService
 * @constructor
 */
parserModule.service('parserService',[function(){
    /**
     * Sebuah method utility yang digunakan dalam proses parsing, method ini berguna untuk
     * menghilangkan semua anggota array yang kosong
     * @method stripEmpty
     * @param {Array} arr Array yang akan diproses
     * @return {Array} array yang telah diproses
     */
    function stripEmpty(arr){
        var newarr = [];
        for(var i = 0;i < arr.length;++i){
            if(arr[i] != '') newarr.push(arr[i]);
        }
        return newarr;
    }
    /**
     * Menghasilkan bentuk String dari perintah LDA dengan parameternya
     * @method genLDA
     * @param {Number} arr parameter dari instruksi LDA
     * @return {String} bentuk String dari instruksi LDA
     */
    function genLDA(param){
        var cmd = "LDA R" + param;
        return cmd;
    }
    /**
     * Menghasilkan bentuk String dari perintah OUT
     * @method genOUT
     * @return {String} bentuk String dari instruksi OUT
     */
    function genOUT(){
        var cmd = "OUT";
        return cmd;
    }
    /**
     * Menghasilkan bentuk String dari perintah HALT
     * @method genHALT
     * @return {String} bentuk String dari instruksi HALT
     */
    function genHALT(){
        var cmd = "HALT";
        var value = 240;
        return cmd;
    }
    /**
     * Menghasilkan bentuk String dari perintah ADD atau SUB dengan parameternya
     * @method genOPS
     * @param {Number} arr parameter dari instruksi ADD atau SUB
     * @param {boolean} plus jika bernilai true maka akan di generate instruksi ADD dan jika false maka akan
     * digenerate instruksi SUB.
     * @return {String} bentuk String dari instruksi ADD atau SUB
     */
    function genOPS(param,plus){
        var cmd= "";
        if(plus){
            cmd = 'ADD' + ' R' + param;
        }else{
            cmd = 'SUB' + ' R' + param;
        }
        return cmd;
    }
    /**
     * Meng-intepretasi ekspresi menjadi source code yang mudah diproses
     * @method parseExpression
     * @param {String} line ekspresi yang akan di proses
     * @return {Object} objek yang berisi source code dan nilai instruksi
     */
    this.parseExpression = function(line){
        var sourceCode = [];
        var values = line.split(/[^0-9]/);
        var operators = line.split(/[^+-]/);
        values = stripEmpty(values);
        operators = stripEmpty(operators);
        if(values.length + operators.length + 3 > 16) return null;
        if(values.length > 7) return null;

        var absoluteVal = [];
        for(var i = 0;i < 16;++i) absoluteVal[i] = 0;

        /* insert Data */
        for(var i = 0,d = firstDataIndex;i < values.length;++i,++d){
            absoluteVal[d] = parseInt(values[i]);
        }
        /* insert instruction */
        /* insert lda */
        sourceCode.push(genLDA(firstDataIndex));
        for(var i = 0,j = firstDataIndex + 1;i < operators.length;++i,++j){
            if(operators[i] == '+') {sourceCode.push(genOPS(j,true));}
            else if(operators[i] == '-') sourceCode.push(genOPS(j,false));
        }
        sourceCode.push(genOUT(operators.length + 1));
        sourceCode.push(genHALT(operators.length + 2));
        return {sourceCode : sourceCode, data :absoluteVal}
    }
    /**
     * Merubah bentuk source code kedalam bentuk binary
     * @method parseSourceCode
     * @param {Array} lines merupakan array dari source code
     * @return {Array} array yang berisi source code yang telah berbentuk binary
     */
    this.parseSourceCode = function(lines){
        var code = lines;
        var values = [];
        for(var i = 0;i < lines.length;++i){
            if(code[i] === '') continue;
            var cmd = code[i].split(' ');
            if(cmd[0]=== 'LDA'){
                values.push(parseInt(cmd[1].substring(1)));
            }else if(cmd[0] === 'ADD'){
                values.push(parseInt(cmd[1].substring(1)) + 16);
            }else if(cmd[0] === 'SUB'){
                values.push(parseInt(cmd[1].substring(1))+ 32);
            }else if(cmd[0] === 'OUT' ){
                values.push(parseInt(224));
            }else if(cmd[0] === 'HALT'){
                values.push(parseInt(240));
            }
        }
        return values;
    }
    /**
     * Merubah source code berbentuk teks panjang menjadi Array dari setiap barisnya
     * @method parseRawToLines
     * @param {Array} lines teks source code
     * @return {Array} array yang berisi source code yang telah di pecah menjadi array
     */
    this.parseRawToLines = function(rawCode){
        var sourceCode= rawCode.split('\n');
        return sourceCode;
    }
}]);

