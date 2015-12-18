/**
 * Module utama aplikasi, sebagai tempat semua modul saling berinteraksi
 * @module sapApp
 */

var sapApp = angular.module('sapApp',[
    'controlModule',
    'simulatorModule',
    'parserModule',
    'registerModule',
    'schedulerModule'
]);
