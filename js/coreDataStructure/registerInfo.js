/**
 * Merupakan kelas yang membuat objek-objek register-register umum
 * @class RegisterInfo
 * @constructor
 * @param {String} title name register
 * @param {String} value nilai awal register
 * @param {String} left posisi x register
 * @param {String} top posisi y register
 * @param {String} bits ukuran register dalam bit
 * @module RegisterInfoPseudoModule
 */
var RegisterInfo = function(title,value,left,top,bits){
    /**
     * Menyimpan nama dari register untuk di tampilkan pada dom
     * @property title
     * @type String
     */
    this.title = title;
    /**
     * Menyimpan nama dari register untuk dapat diakses dari kelas Register
     * @property name
     * @type String
     */
    this.name = title.toLowerCase();
    /**
     * Menyimpan nilai dari register dalam bentuk binary
     * @property display
     * @type String
     */
    this.display = util.convertToBin({value : value, bits : bits});
    /**
     * Menyimpan ukuran dari register dalam bit
     * @property bits
     * @type Number
     */
    this.bits = bits;
    /**
     * Menyimpan nilai dari register dalam bentuk desimal
     * @property value
     * @type Number
     */
    this.value = value;
    /**
     * Menyimpan posisi x dari register
     * @property left
     * @type Number
     */
    this.left = left;
    /**
     * Menyimpan posisi y dari register
     * @property top
     * @type Number
     */
    this.top = top;
    /**
     * Mengeset data atau nilai pada register
     * @method setData
     * @param {RegisterInfo} reginfo register yang di gunakan sebagai sumber data
     * @param {Number} EtoF bagian 4-bit pertama jika bernilai satu dan 4-bit terakhir jika bernilai dua,
     * dari 8 bit data yang akan dipindahkan ke register 4-bit, tidak di gunakan jika perpindahan data
     * antara dua register berukuran sama.
     */
    this.setData = function(reginfo,EtoF){
        if(EtoF){
            var dataBin = util.splitBits(reginfo);
            if(EtoF === 1){
                this.value = dataBin.first.value;
                this.display = dataBin.first.display;
            }else if(EtoF === 2){
                this.value = dataBin.second.value;
                this.display = dataBin.second.display;
            }
        }else {
            this.value = reginfo.value;
            this.display = util.convertToBin(reginfo);
        }
    }
    /**
     * Mengambil data dari register
     * @method getData
     * @return {Number} data dari register
     */
    this.getData = function(){
        return this.value;
    }
    /**
     * Mengeset register dengan nol
     * @method resetToZero
     */
	this.resetToZero = function(){
		this.value = 0;
		this.setData(this);
	}
    /**
     * Mengambil data dari register dalam bentuk binary
     * @method getDisplay
     * @return {String} data register dalam bentuk binary
     */
    this.getDisplay = function(){
        return this.display;
    }
}

