# Simple As Possible-1 Simulator

### INSTALL

> bower install

### Penggunaan Library
Program kami ditulis dengan bahasa pemograman __JavaScript__ dan __HTML__ dan __CSS__ sebagai media. Kami menggunakan 4 _library_:
- [AngularJS](http://angularjs.org): Pengolahan data.
- [JQuery](http://jquery.com): Animasi.
- [JQueryUI](http://jqueryui.com): Animasi.
- [Bootstrap](http://getbootstrap.com): Sebagai layout manager dan _styling_ library.

### Struktur Folder Program

- `doc` folder dokumentasi program, dibuat dengan too __yuidoc__
- `bower_components` berisi _library_ yang kami install dengan `bower` package manager
- `bower_components/angularjs` AngularJS library
- `bower_components/jquery` JQuery library
- `bower_components/jqueryui` JQueryUI library
- `bower_components/bootstrap` Bootstrap library
- `css` berisi file __.css__ untuk melakukan _styling_
- `fonts` berisi font yang kami gunakan
- `js` berisi kode program __JavaScript__
- `js/controllers` berisi controller-controller program
- `js/coreDataStructure` berisi data struktur dasar
- `js/services` berisi service-service yang kami gunakan
- `js/utility` berisi _utility_ dasar
- `sapApp.html` file __HTML__ utama
- `config` berisi konfigurasi program
- `Contoh input dan output.docx` mekanisme SAP-1
- `README.md` file readme dengan __markdown__
- `README.pdf` file readme pdf


### Dokumentasi Program
Dokumentasi dari program kami hasilkan dengan tool __yuidoc__ dan dapat diakses dengan membuka file [doc/index.html](doc/index.html)


## Penggunaan Program

- Untuk memulai aplikasi, pengguna dapat membuka file `sapApp.html`, untuk hasil terbaik kami menggunakan __Mozilla Firefox__ atau __Google Chrome Web Browser__ dengan resolusi yang di rekomendasikan minimal __1440x900__.

- Pengguna dapat mengevaluasi ekspresi dengan memasukan ekspresi pada kolom __Expression__ dan menekan tombol __Evaluate__ untuk mengevaluasi ekspresi yang dimasukan.

- Setelah pengevaluasian ekspresi maka akan muncul tombol __Run__ dan __Pause__ yang dapat digunakan untuk memulai dan menghentikan simulasi.

- Pengguna dapat melakukan penyuntingan terhadap instruksi yang dihasilkan dari proses evaluasi dengan menekan tombol __Edit__ pada bagian bawah kolom __Instructions__.

- Selama proses penyuntingan berlangsung pengguna tidak dapat memulai simulasi, maka tombol __Run__ dan __Pause__ akan disembunyikan.

- Setelah proses penyuntingan selesai pengguna dapat menekan kembali tombol __Edit__ untuk mengakhiri proses penyuntingan. Maka tombol __Run__ dan __Pause__ akan kembali ditampilkan.

- Pengguna dapat menekan tombol __Run__ untuk memulai simulasi, selama simulasi berlangsung, penguna tidak dapat melakukan penyuntingan, pengguna dapat melakukan penyuntingan ketika simulasi dihentikan dengan tombol __Pause__.

- Tombol __Reset__ berfungsi mengosongkan RAM dan mengembalikan nilai register kepada nilai awal.

- Pengguna dapat melihat _log_ dari simulasi terakhir maupun yang sedang berjalan dengan menekan tombol __Log__.

- Kecepatan animasi dapat diatur dengan menggeser _slider_ __Animation Speed__ ke kiri untuk memperlambat jalannya animasi, dan ke kanan untuk mempercepat jalannya animasi.

- Tombol __About__ digunakan untuk menampilkan informasi dari penulis program ini.
