YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BdInfo",
        "CuInfo",
        "RamInfo",
        "Register",
        "RegisterInfo",
        "controlCtrl",
        "parserService",
        "registerService",
        "schedulerModule",
        "simulatorCtrl",
        "util"
    ],
    "modules": [
        "RegisterInfoPseudoModule",
        "controlModule",
        "parserModule",
        "registerModule",
        "sapApp",
        "schedulerModule",
        "simulatorModule"
    ],
    "allModules": [
        {
            "displayName": "controlModule",
            "name": "controlModule",
            "description": "Sebuah module berisi sebuah controller yaitu controlCtrl controller yang\nberguna sebagai interface untuk berinteraksi dengan simulasi/simulationCtrl controller."
        },
        {
            "displayName": "parserModule",
            "name": "parserModule",
            "description": "Sebuah module berisi sebuah service yaitu  parserService yang\nberguna untuk meninterpretasikan ekspresi menjadi source code dan juga merubah bentuk source menjadi\nbentuk binary."
        },
        {
            "displayName": "RegisterInfoPseudoModule",
            "name": "RegisterInfoPseudoModule",
            "description": "Objek util\nobjek yang berisi method-method utility, untuk mengolah data dan melakukan penurunan kelas"
        },
        {
            "displayName": "registerModule",
            "name": "registerModule",
            "description": "Sebuah modul yang berisi sebuah service yang berlaku sebagai Factory yang menghasilkan semua\ntipe register yang digunakan"
        },
        {
            "displayName": "sapApp",
            "name": "sapApp",
            "description": "Module utama aplikasi, sebagai tempat semua modul saling berinteraksi"
        },
        {
            "displayName": "schedulerModule",
            "name": "schedulerModule",
            "description": "Sebuah modul yang berisi sebuah service yang berlaku sebagai pemandu jalannya simulasi"
        },
        {
            "displayName": "simulatorModule",
            "name": "simulatorModule",
            "description": "Sebuah module berisi sebuah controller yaitu simulationCtrl controller yang\nberguna untuk berinteraksi langsung dengan DOM dan animasi DOM."
        }
    ],
    "elements": []
} };
});