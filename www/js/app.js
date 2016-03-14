
var ionicSelect = angular.module('ionicSelect',[]);

ionicSelect.directive('ionSelect',function(){
    'use strict';
    return{
        restrict: 'EAC',
        scope: {
           label:'@',
            labelField:'@',
            provider:'=',
            ngModel: '=?',
            ngValue: '=?',
           
        },
         require: '?ngModel',
         transclude : false,
         replace: false,
        template:
                    //'<div class="selectContainer">'
                        //'<label class="item item-input item-stacked-label">' 
                           // +'<span class="input-label">{{label}}</span>'
                            '<div class="item item-input-inset">'
                                +'<label class="item-input-wrapper">'
                                    +'<i class="icon ion-ios7-search placeholder-icon"></i>'
                                    +'<input id="filtro" type="search"  ng-model="ngModel" ng-value="ngValue" ng-keydown="onKeyDown()"/>'
                                +'</label>'
                                +'<button class="button button-small button-clear" ng-click="open()">'
                                    +'<i class="icon ion-chevron-down"></i>'
                                +'</button>'
                            +'</div>' 
                        //'</label>'
                        +'<div class="optionList padding-left padding-right" ng-show="showHide">'
        +'<ion-scroll>'
                            +'<ul class="list">'
        +'<li class="item" ng-click="selecionar(item)" ng-repeat="item in provider | filter:ngModel">{{item[labelField]}}</li>'                    
                            +'</ul>'
        +'</ion-scroll>'
                        +'</div>'    
                    +'</div>'
             ,
        link: function (scope, element, attrs,ngModel) {
            scope.ngValue = scope.ngValue !== undefined ? scope.ngValue :'item';
            
            scope.selecionar = function(item){
                ngModel.$setViewValue(item);
                scope.showHide = false;
            };
            
            element.bind('click',function(){
                element.find('input').focus();
            });
            
            scope.open = function(){
                
                  scope.ngModel = "";  
                return scope.showHide=!scope.showHide;
            };
            
            scope.onKeyDown = function(){
                scope.showHide = true;
                if(!scope.ngModel){
                     scope.showHide = false;
                }
            }
            
            scope.$watch('ngModel',function(newValue){
                if(newValue)
           element.find('input').val(newValue[scope.labelField]);
               
            });
        },
    };
});// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova','ionicSelect'])



.run(function($ionicPlatform ,$rootScope , $ionicPopup) {

      $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
     if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Sin conexión",
                        content: "El dispositivo no tien conexion a internet toda  la información se alamcenara localmente."
                    })
                    .then(function(result) {
                        if(!result) {
                          console.log('contacto a internet');
                           // ionic.Platform.exitApp();
                        }
                    });
                }
      }



      

   db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS "+
                                       "recepcion ("+
                                                    "id integer primary key,"+
                                                    "placa text,"+
                                                    "jsonData text"+                                                   
                                                  ")");
  /* $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS "+
                                       "recepcion ("+
                                                    "id integer primary key,"+
                                                    "usuario text,"+
                                                    "clave text,"+
                                                    "imagenIngreso text,"+
                                                    "fechaInicio text,"+
                                                    "cliente text,"+
                                                    "numeroDocumentoCliente text,"+
                                                    "bodega text,"+
                                                    "proveedores text,"+
                                                    "ciudadOrigen text,"+
                                                    "imagenInicioDescarga text,"+
                                                    "transportadora text,"+
                                                    "vehiculo text,"+
                                                    "plavaVehiculo text,"+
                                                    "placaRemolque text,"+
                                                    "numeroPrecinto text,"+
                                                    "fotoPrecinto text,"+
                                                     "documentosProductoImportado text,"+
                                                     "documentosProductoNacional text,"+
                                                     "plasticos text,"+
                                                     "numeroTornaguia text,"+
                                                     "fondoCuenta text,"+
                                                     "fotoTornaguia text,"+
                                                     "productos text,"+
                                                     "fotoSalida text,"+
                                                     "fechaFinRegistro text"+
                                                  ")");
*/

  });
})




.config(function($stateProvider, $urlRouterProvider ,$ionicConfigProvider ) {
    $ionicConfigProvider.tabs.position('bottom');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
        controller: "ingresoController"
  })

  // Each tab has its own nav history stack:

  .state('tab.ingreso', { 
    url: '/ingreso',
    views: {
      'tab-ingreso': {
        templateUrl: 'templates/Ingreso.html',
        controller: 'ingresoController'
      }
    }
  })

  .state('tab.descarga', {
      url: '/descarga',
      views: {
        'tab-descarga': {
          templateUrl: 'templates/Descarga.html',
          controller: 'descargaController'
        }
      }
    })

  .state('tab.productos', {
      url: '/productos',
      views: {
        'tab-productos': {
          templateUrl: 'templates/Productos.html',
          controller: 'productosController'
        }
      }
    })
  .state('tab.reporte', {
      url: '/reporte',
      views: {
        'tab-reporte': {
          templateUrl: 'templates/Reporte.html',
          controller: 'reporteController'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {    
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.salida', {
    url: '/salida',
    views: {
      'tab-salida': {
        templateUrl: 'templates/Salida.html',
        controller: 'salidaController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/ingreso');

});


