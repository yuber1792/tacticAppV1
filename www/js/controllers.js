angular.module('starter.controllers', [])

.controller('ingresoController', function($scope ,$cordovaCamera ,$ionicModal , $timeout ,$http ,Scopes ,$window, $ionicTabsDelegate ,$state,$ionicPopup , $cordovaBarcodeScanner ,$cordovaSQLite) {

    Scopes.store('ingresoController', $scope);
        $scope.dataLocal =  JSON.parse(window.localStorage['json'] || '{}');
        console.log($scope.dataLocal);


       $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
    $scope.contadorLocal =  window.localStorage.getItem("contadorLocal");
    console.log("cantidad inicial = " +   $scope.contadorLocal  ) ;
    $scope.jsonMain = [];
    $scope.componentes = {};
    $scope.jsonIngreso = {};
    $scope.componentes.botonFotoIngreso = true ; 
    $scope.componentes.comboCliente = true ; 
    $scope.componentes.comboBodega = true ; 
    $scope.componentes.comoboProveedores = true;
    $scope.componentes.comboCiudadOrigen = true;
    $scope.componentes.botonFotoInicioDescarga = true ; 
    $scope.componentes.comboTransportadora = true ;  
    $scope.componentes.comboVehiculo = true ; 
    $scope.componentes.campoPlacaVehiculo = true ; 
    $scope.componentes.campoPlacaRemolque = true ; 
    $scope.componentes.campoNumeroPrecinto = true ; 
    $scope.componentes.botonFotoPrecinto = true ;
    $scope.componentes.checkProductoImportado = true ; 
    $scope.componentes.checkPlastico = true ; 
    $scope.componentes.checkRentas  =true ; 
    $scope.componentes.fotoFinalDescargue = true ; 
    $scope.componentes.loginOK = "0" ; 
    $scope.componentes.botonFinalizar = true;
    $scope.componentes.imagenIngreso = true ; 
    $scope.componentes.botonAgregarProducto = true; 
    $scope.jsonIngreso.ip ="192.168.10.15";
    $scope.jsonIngreso.puerto ="8090";
    $scope.jsonIngreso.verUsuario  = false ; 
    $scope.jsonIngreso.nuevaEntrada = true ; 
    $scope.jsonIngreso.login = false ; 
    $scope.jsonIngreso.cerrarSesion = true ; 
    $scope.jsonIngreso.showReporte = false ; 
    $scope.jsonIngreso.showSalida = false ; 
    $scope.jsonIngreso.showDescargas = false ; 
    $scope.jsonIngreso.showProductos = false ; 
    $scope.jsonIngreso.tabIngresoValida = false ;
    $scope.jsonIngreso.bodega ="";



      $scope.activarComponentes = function(){
      
            $scope.componentes.botonFotoIngreso = false ; 
            $scope.componentes.comboCliente = false ; 
            $scope.componentes.comboBodega = false ; 
            $scope.componentes.comoboProveedores = false;
            $scope.componentes.comboCiudadOrigen = false;
            $scope.componentes.botonFotoInicioDescarga = false ; 
            $scope.componentes.comboTransportadora = false ;  
            $scope.componentes.comboVehiculo = false ; 
            $scope.componentes.campoPlacaVehiculo = false ; 
            $scope.componentes.campoPlacaRemolque = false ; 
            $scope.componentes.campoNumeroPrecinto = false ; 
            $scope.componentes.botonFotoPrecinto = false ;
            $scope.componentes.checkProductoImportado = false ; 
            $scope.componentes.checkPlastico = false ; 
            $scope.componentes.checkRentas  =false ; 
            $scope.componentes.fotoFinalDescargue = false ; 
            $scope.componentes.tabDescarga = false ; 
            $scope.componentes.tabSalida =false ;
            $scope.componentes.loginOK = "1" ; 
           // $scope.desactivaFinal = Scopes.get('salidaController').desactivaFinalizacion ;
            if( Scopes.get('salidaController') != undefined )
            {
              Scopes.get('salidaController').desactivaFinalizacion = false ; 
            }
      };
   
       
      $ionicModal.fromTemplateUrl('templates/MiCuenta.html', {
       scope: $scope
      }).then(function(modalCuenta) {
        $scope.modalCuenta = modalCuenta;
      });
     
     

 
      $scope.abrirMiCuenta = function() {
         
            $scope.modalCuenta.show();
      };

      
      $scope.cerrarMiCuenta = function() {
         
            $scope.modalCuenta.hide();
      };

            //ventana  modal  de  login  

      $ionicModal.fromTemplateUrl('templates/login.html', {
       scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

 
      $scope.closeLogin = function() {

            $scope.modal.hide();
      };

      
      $scope.login = function() {
         
            $scope.modal.show();
      };

       $scope.doLogin = function() {
     //    console.log('Doing login', $scope.loginData);
      $http.defaults.useXDomain = true;
        $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/login?usuario='+$scope.jsonIngreso.usuario+'&pwd='+$scope.jsonIngreso.clave)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);
              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               $scope.jsonRespuesta = response.data;
                  $scope.bodegas  =   $scope.jsonRespuesta.bodegas;
               if($scope.jsonRespuesta.ok){
                  console.log($scope.jsonRespuesta);
                   $scope.jsonIngreso.verUsuario  = true ; 
                  $scope.jsonIngreso.nuevaEntrada = false ; 
                  $scope.jsonIngreso.login = true ; 
                   $scope.jsonIngreso.cerrarSesion = false ; 
                   $scope.jsonIngreso.nombres = $scope.jsonRespuesta.usuario.nombres;
                   $scope.jsonIngreso.apellidos = $scope.jsonRespuesta.usuario.apellidos;
                  $scope.closeLogin();

                          console.log("bodega login = " + $scope.jsonIngreso.bodega );
               } else
               {
                 alert("Usuario  o clave  incorrecto");

               }

             
                //alert(response.data);
                
         });
            
              
      
      };

      $scope.cerrarSesion = function (){
            $scope.jsonIngreso.login = false ; 
            $scope.jsonIngreso.cerrarSesion = true ;
            $scope.jsonIngreso.verUsuario  = false ;  
            $window.location.reload(true);

      }
      $scope.nuevaEntrada = function(){
        
            $scope.jsonIngreso.showSalida = true ; 
            $scope.jsonIngreso.showDescargas = true ; 
            $scope.jsonIngreso.showProductos = true ; 
            $scope.bodegas  =   $scope.jsonRespuesta.bodegas;
            $scope.jsonIngreso.fechaInicio = new moment().format("L ,h:mm:ss a");
            $scope.activarComponentes();
             $scope.jsonIngreso.nuevaEntrada = true ; 
            console.log($scope.jsonIngreso.showSalida);
      }

      $scope.cargaClientes = function(){
        console.log('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/clientes-x-bodega?bodega='+ $scope.jsonIngreso.bodega);
            $http.defaults.useXDomain = true;
        $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/clientes-x-bodega?bodega='+ $scope.jsonIngreso.bodega)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.clientesXbodega = response.data;
                       console.log("bodega  ws = " + $scope.jsonIngreso.bodega );
         });
      };

      $scope.cargaProveedores = function(){
          
          if ($scope.jsonIngreso.cliente === "ENTEC"){
           
               $scope.proveedoresData = [
                                           {"id":"0" , "texto":"ENTEC"}
                                       ];

          }
             if ($scope.jsonIngreso.cliente === "AMBEV"){
                 $scope.proveedoresData = [
                                            {"id":"0",  "texto":"AMBEV"}
                                         ];
          }
        $http.defaults.useXDomain = true;
        $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/ciudades-x-cliente?cliente='+ $scope.jsonIngreso.cliente)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.ciudadOrigenData = response.data;
         });
              console.log("llama a proveedores");
              console.log('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/proveedores-x-cliente?cliente='+ $scope.jsonIngreso.cliente);
          $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/proveedores-x-cliente?cliente='+ $scope.jsonIngreso.cliente)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.proveedoresData = response.data;
         });

      };
      

      $scope.ambiente  = [ 
                            {"id":"0" , "ip" : "192.168.10.15" ,"puerto":"8090" , "nombre":"Inglaterra"} , 
                            {"id":"0" , "ip" : "192.168.100.52" ,"puerto":"8090" , "nombre":"Turquia"} ,
                             {"id":"0" , "ip" : "http://satelite.tacticlogistics.com" ,"puerto":"8090" , "nombre":"Publico"} 
                                                    
                         ]

      $scope.asignarAmbiente = function (id){
              
              if($scope.jsonIngreso.ambiente === "Inglaterra"){

               // alert("entra : "+$scope.jsonIngreso.ambiente);
                   $scope.jsonIngreso.ip ="192.168.10.15";
                   $scope.jsonIngreso.puerto ="8090";
              }
               if($scope.jsonIngreso.ambiente === "Albam"){

               // alert("entra : "+$scope.jsonIngreso.ambiente);
                   $scope.jsonIngreso.ip ="192.170.112.207";
                   $scope.jsonIngreso.puerto ="8080";
              }
               if($scope.jsonIngreso.ambiente === "Turquia"){

               // alert("entra : "+$scope.jsonIngreso.ambiente);
                   $scope.jsonIngreso.ip ="192.168.100.52";
                   $scope.jsonIngreso.puerto ="8090";
              }
               if($scope.jsonIngreso.ambiente === "Publico"){

               // alert("entra : "+$scope.jsonIngreso.ambiente);
                   $scope.jsonIngreso.ip ="satelite.tacticlogistics.com";
                   $scope.jsonIngreso.puerto ="8090";
              }
              console.log("ip = " +   $scope.jsonIngreso.ip);
              console.log("puerto = " +   $scope.jsonIngreso.puerto);


      }
      /*  $scope.ciudadOrigenData = [
                                  {"id":"0" , "texto":"Proveedor 1"},
                                  {"id":"2",  "texto":"Proveedor 2"}
                                ];*/

       /*  $scope.bodegas= [
                                   {"id":"0", "texto":"BODEGA BOGOTA"},  
                                   {"id":"1", "texto":"BODEGA MONTEVIDEO"},  
                                   {"id":"2", "texto":"BOG-CEDI SIBERIA 1"},  
                                   {"id":"3", "texto":"CEDI BARRANQUILLA METORTEX 01"},  
                                   {"id":"4", "texto":"CEDI BOGOTA CALLE 19"},  
                                   {"id":"5", "texto":"CLO-ARROYOHONDO"},  
                                   {"id":"6", "texto":"CLO-TERMINAL LOGISITCO"},  
                                   {"id":"7", "texto":"CTG ZONA FRANCA"},  
                                   {"id":"8", "texto":"MDE-LA TABLAZA"},  
                                   {"id":"9", "texto":"MTV02-BODEGA MONTEVIDEO 2"},  
                                   {"id":"10", "texto":"PARQUIAMERICAS MAMONAL KM6"},  
                                   {"id":"11", "texto":"STM-PARQUE INDUSTRIAL SANTA CRUZ"},  
                                   {"id":"12", "texto":"ZONA FRANCA BOGOTA"}  ];
      */

    $scope.fotoIngreso = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_ingreso = "data:image/jpeg;base64," + imageData;
            $scope.imgSola = imageData ; 
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }


//    var canvas = document.getElementById('signatureCanvas');
   //var signaturePad = new SignaturePad(canvas);
  
    //logica para las validadiones 


     $scope.validacion = function(nombre) {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'El  campo '+nombre+' es  obligatorio !!!'
         });

         alertPopup.then(function(res) {
          //
           console.log('Alerta confirmacion');
         });
        };
      $scope.verificarTabIngreso  =  function(){
        
          if($scope.jsonIngreso.imgURI_ingreso === undefined){
                //$scope.validacion('Foto ingreso');
                // $scope.jsonIngreso.tabIngresoValida = false ; 
                //$ionicTabsDelegate.select(0);
                // return;
          }
          console.log("bodega = " + $scope.jsonIngreso.bodega );
          if($scope.jsonIngreso.bodega === ""){
                $scope.validacion('Bodega');
                 $scope.jsonIngreso.tabIngresoValida = false ; 
                 //return;
          }
          console.log("documento = " + $scope.jsonIngreso.numeroDocumento );
          if($scope.jsonIngreso.numeroDocumento === undefined){
                $scope.validacion('Numero documento cliente');
                 $scope.jsonIngreso.tabIngresoValida = false ; 
                 //return;
          }
          console.log("cliente = " + $scope.jsonIngreso.cliente );
          if($scope.jsonIngreso.cliente === undefined){
                $scope.validacion('Cliente');
                 $scope.jsonIngreso.tabIngresoValida = false ; 
                // return;
          }
           console.log("ciuda = " + $scope.jsonIngreso.ciudadOrigen );
           if($scope.jsonIngreso.ciudadOrigen === undefined){
                $scope.validacion('Ciudad origen');
                 $scope.jsonIngreso.tabIngresoValida = false ; 
                // return;
          }
      }

       $scope.seleccionarTab = function (index , nombre){
          //  if(nombre === "descarga"){
          //      console.log("Entra a validar  tab en descarga");
         //       $scope.verificarTabIngreso();
         //       if($scope.jsonIngreso.tabIngresoValida)
          //      {
                     $state.go("tab."+nombre);
                    $ionicTabsDelegate.select(index);

           //     }
          //  }
            
      }


         $scope.showAlert = function(texto) {
           var alertPopup = $ionicPopup.alert({
             title: 'info',
             template: texto
           });

           alertPopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
         };

           $scope.insert = function(placa , jsonData) {

                 $scope.showAlert("inicia insert" + placa + " -----" + jsonData );
                 console.log("inicia insert" + placa + " -----" + jsonData ) ;
                var query = "INSERT INTO recepcion (placa, jsonData) VALUES (?,?)";
                $scope.showAlert("carga consulta");
                $cordovaSQLite.execute(db, query, [placa, jsonData]).then(function(res) {
                $scope.showAlert("INSERT ID -> " + res.insertId);
                    console.log("INSERT ID -> " + res.insertId);
                
                }, function (err) {
                         console.log("error = " +  err);
                    $scope.showAlert("error = " +  err);
                });
           }
          $scope.pedirPlaca = function() {
                $scope.data = {};

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                   //$scope.myPopup = $ionicPopup.show({
                  template: '<input type="text" ng-model="data.placa">',
                  title: 'Nuevo ingreso',
                  subTitle: 'Indique las placas del vehiculo',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancelar' },
                    {
                      text: '<b>Guardar</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                        if ($scope.data.placa != "") {
                                      $scope.jsonMain =  $scope.jsonMain.concat([{
                                        usuario : "",
                                        clave: "", 
                                        imagenIngreso: "",
                                        fechaInicio: "",
                                        cliente: "",
                                        numeroDocumentoCliente: "",
                                        bodega: "",
                                        proveedores: "" ,
                                        ciudadOrigen:  "",
                                        imagenInicioDescarga:  "",
                                        transportadora  : "",
                                        vehiculo : "",
                                        placaVehiculo : $scope.data.placa,
                                        placaRemolque : "",
                                        numeroPrecinto : "",
                                        fotoPrecinto : "",
                                        documentosProductoImportado : "",
                                        documentosProductoNacional : "",
                                        plasticos : "",
                                        numeroTornaguia :"", 
                                        fondoCuenta : "" , 
                                        fotoTornaguia : "",
                                        productos:"",
                                        fotoSalida: "",
                                        fechaFinRegistro : new moment().format("L ,h:mm:ss a")
                                 }]);
                         $scope.insert($scope.data.placa,$scope.jsonMain);
                       
                        } else {
                          return $scope.data.wifi;
                        }
                      }
                    }
                  ]
                });

                myPopup.then(function(res) {
                  console.log('Tapped!', res);
                  // myPopup.close();
                });

               
                $timeout(function() {
                   //close the popup after 3 seconds for some reason
                    myPopup.close();
                }, 10000);
           };
})




.controller('descargaController',function($scope,$cordovaCamera , Scopes ,$http , $ionicPopup ,$window ,$state ,$ionicTabsDelegate){
     Scopes.store('descargaController', $scope);
     $scope.jsonIngreso  = Scopes.get('ingresoController').jsonIngreso;
     $scope.jsonDescarga = {};
     $scope.jsonDescargas = {};
      $scope.activarComponentesDescarga = function(){

            $scope.componentes.botonFotoInicioDescarga = false ; 
            $scope.componentes.comboTransportadora = false ;  
            $scope.componentes.comboVehiculo = false ; 
            $scope.componentes.campoPlacaVehiculo = false ; 
            $scope.componentes.campoPlacaRemolque = false ; 
            $scope.componentes.campoNumeroPrecinto = false ; 
            $scope.componentes.botonFotoPrecinto = false ;
            $scope.componentes.checkProductoImportado = false ; 
            $scope.componentes.checkPlastico = false ; 
            $scope.componentes.checkRentas  =false ; 
           
      };
     
     $scope.desactivaProdductoCheck = function(nombre){
            $scope.nom = nombre;
           if($scope.nom === "nacional"){

            $scope.jsonDescarga.productoNacionalCheck = true;
            $scope.jsonDescarga.info = false ; 
           }
            if($scope.nom === "importado"){
              $scope.jsonDescarga.productoNacionalCheck = false;
            $scope.jsonDescarga.info = true ; 

           }
     }
      $scope.jsonDescarga.plasticos = false;
      $scope.jsonDescarga.rentas = false; 
      $scope.desactivaRentaPlastico = function(nombre){
        
       
          $scope.nom = nombre;
         
           if($scope.nom === "plas"){
               
               $scope.jsonDescargas.rentas = false;               
              $scope.jsonDescargas.plasticos = true;
            
           }
           
            if($scope.nom === "renta"){
                
            $scope.jsonDescargas.plasticos = false;
            $scope.jsonDescargas.rentas = true; 

           }
     }

        

          $scope.productoImportado= [
                                   {"id":"0", "texto":"BL" , checked: false},  
                                   {"id":"1", "texto":"Remesa" , checked: false },  
                                   {"id":"2", "texto":"Factura" , checked: false},                                                                    
                                   {"id":"3", "texto":"Declaración de importación", checked: false}  
                                   ];

          $scope.productoNacional= [
                                   {"id":"0", "texto":"Copia de orden de compra" , checked: false},  
                                   {"id":"1", "texto":"Factura original" , checked: false },  
                                   {"id":"2", "texto":"Copia de factura" , checked: false},     
                                   {"id":"3", "texto":"Guía de embarque" , checked: false},                                                                  
                                   {"id":"4", "texto":"Packing list", checked: false}  
                                   ];

          $scope.plasticos= [
                                                                              
                                   {"id":"0", "texto":"Certificado de calidad", checked: false}  
                                   ];

        $http.defaults.useXDomain = true;
        $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/transportadoras')
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.transportadora = response.data;
         });
          /*$scope.transportadora= [
                                   {"id":"0", "texto":"TCC"},  
                                   {"id":"1", "texto":"JOALCO"},  
                                   {"id":"2", "texto":"SURAMERICANA"},  
                                   {"id":"3", "texto":"COORDINADORA MERCANTIL SA"},  
                                   {"id":"4", "texto":"TRANSPORTES CENTRO VALLE"},  
                                   {"id":"5", "texto":"COLTANQUES"},  
                                   {"id":"6", "texto":"CATALUÑA TRANSPORTES DE CARGA"},  
                                   {"id":"7","texto":"OTRO"}  ];*/
           $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/tipos-vehiculos')
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.tipoVehiculo = response.data;
         });                         
        /* $scope.tipoVehiculo= [
                                   {"id":"0", "texto":"TRACTOMULA CONTENEDOR"},  
                                   {"id":"1", "texto":"TRACTOMULA CARROCERIA"},  
                                   {"id":"2", "texto":"TRACTOMULA FURGONADA"},  
                                   {"id":"3", "texto":"PATINETA"},  
                                   {"id":"4", "texto":"DOBLE TROQUE"},  
                                   {"id":"5", "texto":"SENCILLO"},  
                                   {"id":"6", "texto":"TURBO"},  
                                   {"id":"7", "texto":"CARRY"},  
                                   {"id":"8", "texto":"LUV"},  
                                   {"id":"9", "texto":"OTRO"}
                               ];*/


        $scope.fotoAntesDescarga = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_antes_descarga = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
       }


        $scope.fotoPiso = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_piso = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
       }

     $scope.fotoPrecinto = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_precinto = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

     $scope.fotoTornaguia = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_tornaguia = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
           

})

.controller('productosController', function($scope, Scopes , $ionicModal,$http,$cordovaCamera ,$ionicPopup) {

    Scopes.store('productosController', $scope);
    $scope.agregaProducto =  false ;
     $scope.jsonIngreso  = Scopes.get('ingresoController').jsonIngreso;

     $scope.fotoNovedad = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_novedad= "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
      }

       $scope.noNovedad = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'No se agregaran novedades a este producto !!!'
         });

         alertPopup.then(function(res) {
          //
           console.log('Alerta confirmacion');
         });
        };

        $scope.cantidadesNoCorrectas = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'La cantidad de averías debe ser menor o igual que la cantidad esperadas'
         });

         alertPopup.then(function(res) {
          //
           console.log('Alerta confirmacion');
         });
        };

     $scope.productos =[];
     $scope.productoAdd = {};
     $scope.productoAdd.novedades="";
     $scope.productoAdd.descripcioNovedad="";
     $scope.productoAdd.cantidadEsperada= 0;
     $scope.productoAdd.cantidadRecibida= 0;
     $scope.productoAdd.cantidadSobrante= 0;
     $scope.productoAdd.cantidadFaltante= 0;
     $scope.productoAdd.cantidadDisponible= 0;
     $scope.productoAdd.cantidadAveria= 0;

    $scope.AgregarProducto = function() {

        if($scope.productoAdd.producto === "" || 
           $scope.productoAdd.cantidadEsperada === "" || 
           $scope.productoAdd.cantidadRecibida === "" || 
           $scope.productoAdd.cantidadFaltante === "" || 
           $scope.productoAdd.UnidadMedida === ""     ||
           $scope.productoAdd.cantidadSobrante === "" ||
           $scope.productoAdd.cantidadAveria ==="") {
            alert("Se deben llenar todos los campos requeridos");

        }else{
            $scope.resultadoCantidades =  $scope.productoAdd.cantidadEsperada - $scope.productoAdd.cantidadRecibida ; 
            console.log($scope.productoAdd.producto); 
          if($scope.agregarNovedades){
              
              for (var i=0; i<$scope.novedades.length; i++){
                    if($scope.novedades[i].checked){

                       $scope.productoAdd.novedades += "," +  $scope.novedades[i].texto;
                    }


              }
             // alert($scope.productoAdd.novedades.substring(1, $scope.productoAdd.novedades.length) );
               $scope.productos =  $scope.productos.concat([{
                            producto:$scope.productoAdd.producto.codigo,   
                            productoNombre:$scope.productoAdd.producto.nombreLargo, 
                            nombre :    $scope.productoAdd.producto.codigo +", "+$scope.productoAdd.producto.nombreLargo,                        
                            unidadMedida:$scope.productoAdd.unidadMedida,
                            loteSugerido:$scope.productoAdd.lote,
                            estadoInventario:$scope.productoAdd.estadoInventario ,
                            cantidadEsperada: $scope.productoAdd.cantidadEsperada,
                            cantidadRecibida: $scope.productoAdd.cantidadRecibida,
                            cantidadFaltantes: $scope.productoAdd.cantidadFaltante,
                            cantidadAverias: $scope.productoAdd.cantidadAveria,
                            cantidadSobrante: $scope.productoAdd.cantidadSobrante,
                            cantidadDisponible: $scope.productoAdd.cantidadDisponible,
                            novedades: $scope.productoAdd.novedades.substring(1, $scope.productoAdd.novedades.length),
                            descripcionNovedad : $scope.productoAdd.descripcionNovedad,
                            fotoNovedad :$scope.imgURI_novedad
                          }]);
                $scope.cerrarProductos(); 
          }else{
               $scope.productos =  $scope.productos.concat([{
                                producto:$scope.productoAdd.producto.codigo,   
                                productoNombre:$scope.productoAdd.producto.nombreLargo, 
                                nombre :    $scope.productoAdd.producto.codigo +", "+$scope.productoAdd.producto.nombreLargo,                        
                                unidadMedida:$scope.productoAdd.unidadMedida,
                                loteSugerido:$scope.productoAdd.lote,
                                estadoInventario:$scope.productoAdd.estadoInventario,                              
                                cantidadEsperada: $scope.productoAdd.cantidadEsperada,
                                cantidadRecibida: $scope.productoAdd.cantidadRecibida,
                                cantidadFaltantes: $scope.productoAdd.cantidadFaltante,
                                cantidadAverias: $scope.productoAdd.cantidadAveria,
                                cantidadSobrante: $scope.productoAdd.cantidadSobrante,
                                cantidadDisponible: $scope.productoAdd.cantidadDisponible,
                                novedades: $scope.productoAdd.novedades,
                                descripcionNovedad : $scope.productoAdd.descripcionNovedad,
                                fotoNovedad :$scope.imgURI_novedad                              
                              }]);
               $scope.cerrarProductos(); 
          }
          $scope.agregaProducto =  false ;
           
       }
      }; 


        $scope.eliminarProducto = function(index){
           $scope.productos.splice(index, 1);
       };
        $scope.productoSeleccionado = {};
          $scope.productoSeleccionado.novedades = {};
          $scope.productoSeleccionado.mostrarEdicion = false  ;
        $scope.editarProducto = function(index){
           $scope.productoSeleccionado.id = index ;
            $scope.productoSeleccionado.producto = $scope.productos[index].producto;
            $scope.productoSeleccionado.productoNombre = $scope.productos[index].productoNombre;
            $scope.productoSeleccionado.nombre = $scope.productos[index].nombre ;
            $scope.productoSeleccionado.unidadMedida = $scope.productos[index].unidadMedida;
            $scope.productoSeleccionado.loteSugerido = $scope.productos[index].loteSugerido;
            $scope.productoSeleccionado.estadoInventario = $scope.productos[index].estadoInventario;
            $scope.productoSeleccionado.cantidadEsperada = $scope.productos[index].cantidadEsperada;
            $scope.productoSeleccionado.cantidadRecibida = $scope.productos[index].cantidadRecibida;
            $scope.productoSeleccionado.cantidadFaltantes = $scope.productos[index].cantidadFaltantes;
            $scope.productoSeleccionado.cantidadDisponible = $scope.productos[index].cantidadDisponible;
            $scope.productoSeleccionado.cantidadSobrante = $scope.productos[index].cantidadSobrante;
            $scope.productoSeleccionado.cantidadAverias = $scope.productos[index].cantidadAverias;
            $scope.productoSeleccionado.novedades = $scope.productos[index].novedades;
            $scope.productoSeleccionado.descripcionNovedad = $scope.productos[index].descripcionNovedad;
            $scope.productoSeleccionado.fotoNovedad = $scope.productos[index].fotoNovedad;
            //$scope.modal1.show();
             $scope.productoSeleccionado.mostrarEdicion = true  ;
       };
       $scope.finalizarEdicion = function(){
           console.log("id seleccionado "  +$scope.productoSeleccionado.id );
           console.log($scope.productoSeleccionado.producto.nombre);
           console.log($scope.productoSeleccionado);
            //$scope.productoSeleccionado.producto = $scope.productoSeleccionado.producto;
            $scope.productoSeleccionado.productoNombre = $scope.productoSeleccionado.producto.nombreLargo;
            $scope.productoSeleccionado.nombre = $scope.productoSeleccionado.producto.nombre ;
            $scope.productos[$scope.productoSeleccionado.id] =  $scope.productoSeleccionado;
            //$scope.modal1.hide();
             $scope.productoSeleccionado.mostrarEdicion = false  ;

       }

        $scope.fotoNovedadEdicion = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.productoSeleccionado.imgURI_novedad= "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
      }

    $scope.productoAdd.mostrarCantidadesFaltantes = false ;
    $scope.productoAdd.mostrarCantidadesSobrantes = false ; 
       $scope.calcularProductos =  function(){
        $scope.productoAdd.mostrarCantidades = true ; 
        $scope.resultadoCantidades =  $scope.productoAdd.cantidadEsperada - $scope.productoAdd.cantidadRecibida ; 
          if( $scope.productoAdd.cantidadAveria >  $scope.productoAdd.cantidadEsperada ){
              $scope.cantidadesNoCorrectas();
              return;

          }
          if( $scope.resultadoCantidades === 0 ){
              $scope.productoAdd.cantidadFaltante = 0 ;
              $scope.productoAdd.cantidadSobrante = 0 ; 
              $scope.productoAdd.cantidadDisponible =  $scope.productoAdd.cantidadRecibida  -  $scope.productoAdd.cantidadAveria;
              console.log("no  tiene  novedades");
          }
          if( $scope.resultadoCantidades  > 0 ){
              $scope.productoAdd.cantidadFaltante = $scope.resultadoCantidades;
              $scope.productoAdd.cantidadSobrante = 0 ; 
              $scope.productoAdd.cantidadDisponible =  $scope.productoAdd.cantidadRecibida  -  $scope.productoAdd.cantidadAveria;

             console.log("Si  tiene  novedades por faltantes ");
          }
           if( $scope.resultadoCantidades < 0  ){
            $scope.productoAdd.cantidadSobrante = $scope.productoAdd.cantidadRecibida  -  $scope.productoAdd.cantidadEsperada  ;
              $scope.productoAdd.cantidadFaltante  =  0 ; 
              $scope.productoAdd.cantidadDisponible =  $scope.productoAdd.cantidadRecibida  -  $scope.productoAdd.cantidadAveria;
             console.log("Si  tiene  novedades por sobrantes ");
          }

       }


       $scope.agregarNovedades =  false; 
    $scope.verificarNovedades = function (){


      if( $scope.productoAdd.cantidadSobrante != 0 ||  $scope.productoAdd.cantidadFaltante != 0  ||  $scope.productoAdd.cantidadAveria ){
             
 
             $scope.agregarNovedades =  true ; 
      }else{

       $scope.noNovedad();
      }

    }
      

       //ventana  modal  de producto

      $ionicModal.fromTemplateUrl('templates/AgregarProducto.html', {
       scope: $scope
      }).then(function(modal1) {
        $scope.modal1 = modal1;
      });

 
      $scope.cerrarProductos = function() {

        $scope.modal1.hide();
      };

      
      $scope.abrirProductos = function() {
        console.log('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/productos-x-cliente-x-bodega?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente +'&bodega='+Scopes.get('ingresoController').jsonIngreso.bodega);
          $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/productos-x-cliente-x-bodega?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente +'&bodega='+Scopes.get('ingresoController').jsonIngreso.bodega)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
                 console.log("no sirve");
            
              })
              .then(function(response){
                console.log("exitoso");
               $scope.productosTotales = response.data;
               


         });    
        
        for (var i=0; i<$scope.novedades.length; i++){
                   $scope.novedades[i].checked = false ;
         }
         $scope.productoAdd.lote= "";
         $scope.productoAdd.cantidadEsperada= "";
         $scope.productoAdd.cantidadRecibida= "";
         $scope.productoAdd.cantidadSobrante= "";
         $scope.productoAdd.cantidadFaltante= "";
         $scope.productoAdd.cantidadDisponible= "";
         $scope.productoAdd.cantidadAveria= "";
         $scope.productoAdd.unidadMedida= "";
         $scope.productoAdd.producto= "";
         $scope.productoAdd.estadoInventario= "";
         $scope.productoAdd.novedades="";
         $scope.productoAdd.descripcionNovedad="";
         $scope.agregarNovedades = false;
         $scope.productoAdd.nove = false ;
          $scope.agregaProducto =  true ;
         $scope.imgURI_novedad = undefined;
       // $scope.modal1.show();
      };
        console.log('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/productos-x-cliente-x-bodega?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente +'&bodega='+Scopes.get('ingresoController').jsonIngreso.bodega);
       $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/productos-x-cliente-x-bodega?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente +'&bodega='+Scopes.get('ingresoController').jsonIngreso.bodega)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.productosTotales = response.data;
               


         });      

              $scope.productoSeleccionado.agregarNovedades =true
      $scope.verificarNovedadesEdicion = function (){

         $scope.productoSeleccionado.agregarNovedades =  true ; 
      if( $scope.productoSeleccionado.cantidadSobrante != 0 ||  $scope.productoSeleccionado.cantidadFaltante != 0  ||  $scope.productoSeleccionado.cantidadAveria ){
             
 
             $scope.productoSeleccionado.agregarNovedades =  true ; 
      }else{
         $scope.productoSeleccionado.agregarNovedades =  false ; 
       $scope.noNovedad();
      }

    }


      $scope.calcularProductosEdicion =  function(){
        $scope.productoSeleccionado.mostrarCantidades = true ; 
        $scope.productoSeleccionado.resultadoCantidades =  $scope.productoSeleccionado.cantidadEsperada - $scope.productoSeleccionado.cantidadRecibida ; 
        console.log("Resultado " +         $scope.productoSeleccionado.resultadoCantidades)
          if( $scope.productoSeleccionado.cantidadAverias >  $scope.productoSeleccionado.cantidadEsperada ){
              $scope.cantidadesNoCorrectas();
              return;
          }
          if( $scope.productoSeleccionado.resultadoCantidades === 0 ){
              $scope.productoSeleccionado.cantidadFaltantes = 0 ;
              $scope.productoSeleccionado.cantidadSobrante = 0 ; 
              $scope.productoSeleccionado.cantidadDisponible =  $scope.productoSeleccionado.cantidadRecibida  -  $scope.productoSeleccionado.cantidadAverias;
              console.log("no  tiene  novedades edicion ");
          }
          if( $scope.productoSeleccionado.resultadoCantidades  > 0 ){
            console.log("Valor de  =  " +   $scope.productoSeleccionado.resultadoCantidades);
              $scope.productoSeleccionado.cantidadFaltantes = $scope.productoSeleccionado.resultadoCantidades;
              $scope.productoSeleccionado.cantidadSobrante = 0 ; 
              $scope.productoSeleccionado.cantidadDisponible =  $scope.productoSeleccionado.cantidadRecibida  -  $scope.productoSeleccionado.cantidadAverias;
             console.log("Si  tiene  novedades por faltantes edicion");
          }
           if( $scope.productoSeleccionado.resultadoCantidades < 0  ){
              $scope.productoSeleccionado.cantidadSobrante = $scope.productoSeleccionado.cantidadRecibida  -  $scope.productoSeleccionado.cantidadEsperada  ;
              $scope.productoSeleccionado.cantidadFaltantes  =  0 ; 
              $scope.productoSeleccionado.cantidadDisponible =  $scope.productoSeleccionado.cantidadRecibida  -  $scope.productoSeleccionado.cantidadAverias;
              console.log("Si  tiene  novedades por sobrantes edicion ");
          }

       }

     /*  $scope.productosTotales = [
                                  {"id":"0" , "texto":"Producto 0"},
                                  {"id":"1" , "texto":"Producto 1"},
                                  {"id":"2" , "texto":"Producto 2"},
                                  {"id":"3" , "texto":"Producto 3"},
                                  {"id":"4" , "texto":"Producto 4"},
                                  {"id":"5" , "texto":"Producto 5"},
                                  {"id":"6",  "texto":"Producto 6"}
                                ];*/
          $scope.novedades = {};
          $scope.cargaUnidades = function (){
            console.log($scope.productoAdd.producto.codigo);
            console.log('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/unidades-x-producto-x-cliente?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente+'&producto='+$scope.productoAdd.producto.codigo);

             $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/unidades-x-producto-x-cliente?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente+'&producto='+$scope.productoAdd.producto.codigo)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.unidadesMedida = response.data;
             });      


/*****************************/

               $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/estados-inventario-x-producto-x-cliente?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente+'&producto='+$scope.productoAdd.producto)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.estadoInventarios = response.data;
             });      


               /* $scope.estadoInventarios = [
                                  {"id":"0" , "texto":"Destruccion"},
                                  {"id":"1" , "texto":"Devoluciones"},
                                  {"id":"2" , "texto":"Disponible"},
                                  {"id":"3" , "texto":"En auditoria"},
                                  {"id":"4" , "texto":"Incompleto"},
                                  {"id":"5" , "texto":"No conforme"},
                                  {"id":"6" , "texto":"No disponible"},
                                  {"id":"7" , "texto":"Off  grade"},
                                 {"id":"8" , "texto":"Off  grade Incompleto"},
                                  {"id":"9" , "texto":"Proximo  a vencer"},
                                  {"id":"10", "texto":"Publicidad"},
                                  {"id":"11", "texto":"Sin nacionalizar"},
                                  {"id":"12", "texto":"Vencido"}
                                ];*/

/********************************/
               console.log('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/tipos-novedades-ingreso-x-producto-x-cliente?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente+'&producto='+$scope.productoAdd.producto);
               $http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/tipos-novedades-ingreso-x-producto-x-cliente?cliente='+Scopes.get('ingresoController').jsonIngreso.cliente+'&producto='+$scope.productoAdd.producto)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.novedades = response.data;
             });      

          

            /* $scope.novedades= [
                                   {"id":"0", "texto":"Daño en puerto" , checked: false},  
                                   {"id":"1", "texto":"Daño en origen" , checked: false },  
                                   {"id":"2", "texto":"Daño en cargue" , checked: false},  
                                   {"id":"3", "texto":"Daño en descargue" , checked: false},  
                                   {"id":"4", "texto":"Daño en transporte" , checked: false},  
                                   {"id":"5", "texto":"Faltante" , checked: false},  
                                   {"id":"6", "texto":"Sobrante" , checked: false},  
                                   {"id":"7", "texto":"Troque" , checked: false},  
                                   {"id":"8", "texto":"El lote no coincide con el de los documentos" , checked: false},                                       
                                   {"id":"12", "texto":"otro", checked: false}  ];*/


  /*************************************************************/        
       


      /* $scope.unidadesMedida = [
                                  {"id":"0" , "texto":"BOLSA GRANDE"},
                                  {"id":"1" , "texto":"BULTO"},
                                  {"id":"2" , "texto":"CAJA"},
                                  {"id":"3" , "texto":"KILO"},
                                  {"id":"4" , "texto":"PALET"},
                                  {"id":"5" , "texto":"UNIDAD"}
                                ];*/

       /* $http.get('http://'+$scope.jsonIngreso.ip+':'+$scope.jsonIngreso.puerto+'/novedades')
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.unidadesMedida = response.data;
         });   */

     }

       

})

.controller('salidaController', function($scope, $cordovaCamera ,Scopes , $ionicPopup ,$http ,$window ,$ionicLoading ,$location) {

        

      //registra  el scope local en   el array  SCOPES 
      Scopes.store('salidaController', $scope);
       $scope.jsonIngreso  = Scopes.get('ingresoController').jsonIngreso;
        $scope.jsonMain = [];
         $scope.jsonMainTodos = [];
        $scope.resultadoInfo = false;
         $scope.desactivaFinalizacion = false ; 

       $scope.fotoFinalDescargue = function() {
        var options = { 
            quality : 80, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
         $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI_salida = "data:image/jpeg;base64," + imageData;
           // $scope.imgSola = imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }   


     $scope.loading = function() {
        $ionicLoading.show({
          template: 'Cargando...'
        });
      };
      $scope.closeLoading = function(){
        $ionicLoading.hide();
      };
$scope.productoImportado = {};
$scope.productoImportado.datos= "";
      //crea el json grande  
      $scope.fin = function (){
      

       // alert(Scopes.get('descargaController').jsonDescarga.transportadoraData);
       if (Scopes.get('descargaController').jsonDescarga.info){
           
            for (var i=0; i< Scopes.get('descargaController').productoImportado.length; i++){
                    if(Scopes.get('descargaController').productoImportado[i].checked){

                       $scope.productoImportado.datos += "," +   Scopes.get('descargaController').productoImportado[i].texto;
                    }


              }
              $scope.productoImportado.datos = $scope.productoImportado.datos.substring(1, $scope.productoImportado.datos.length)
             // alert($scope.productuctoImportado.datos);

       }
      $scope.plasticos = {};
      $scope.plasticos.datos ="";
        if (Scopes.get('descargaController').jsonDescarga.plasticos){
             for (var i=0; i< Scopes.get('descargaController').plasticos.length; i++){
                    if(Scopes.get('descargaController').plasticos[i].checked){

                      $scope.plasticos.datos += "," +   Scopes.get('descargaController').plasticos[i].texto;
                    }


              }
             $scope.plasticos.datos = $scope.plasticos.datos.substring(1, $scope.plasticos.datos.length);

        }

        $scope.productosNacionales= {};
        $scope.productosNacionales.datos = "";
           if (Scopes.get('descargaController').jsonDescarga.productoNacionalCheck){
                for (var i=0; i< Scopes.get('descargaController').productoNacional.length; i++){
                    if(Scopes.get('descargaController').productoNacional[i].checked){

                      $scope.productosNacionales.datos += "," +   Scopes.get('descargaController').productoNacional[i].texto;
                    }


              }
              $scope.productosNacionales.datos = $scope.productosNacionales.datos.substring(1,$scope.productosNacionales.datos.length);


           }
           //valida si es  nacional  o importado para saber  cual enviar respectivamente
           if(Scopes.get('descargaController').jsonDescarga.productoNacionalCheck){
                 $scope.productoImportado.datos = "";

           }
            if(Scopes.get('descargaController').jsonDescarga.info){
                $scope.productosNacionales.datos = "";

           }
          if (Scopes.get('descargaController').jsonDescarga.plasticos){
                
                  Scopes.get('descargaController').jsonDescargas.numeroTornaguia = "";
                  Scopes.get('descargaController').jsonDescargas.fondoCuenta = ""; 
                  Scopes.get('descargaController').imgURI_tornaguia = undefined ; 

           }

            if (Scopes.get('descargaController').jsonDescargas.rentas){
                $scope.plasticos.datos = "";
            }
           /*$scope.rentas = {};
           $scope.rentas.numeroTornaguia = "";
           $scope.rentas.fondoCuenta= "";

           if (Scopes.get('descargaController').jsonDescargas.rentas){
        
                    $scope.rentas.numeroTornaguia  = Scopes.get('descargaController').jsonDescargas.numeroTornaguia; 
                    $scope.rentas.fondoCuenta= Scopes.get('descargaController').jsonDescargas.fondoCuenta;
          }*/

         $scope.jsonMain =  $scope.jsonMain.concat([{
                            usuario : Scopes.get('ingresoController').jsonIngreso.usuario,
                            clave: Scopes.get('ingresoController').jsonIngreso.clave, 
                            imagenIngreso: Scopes.get('ingresoController').imgURI_ingreso,
                            fechaInicio:  Scopes.get('ingresoController').jsonIngreso.fechaInicio,
                            cliente: Scopes.get('ingresoController').jsonIngreso.cliente,
                            numeroDocumentoCliente: Scopes.get('ingresoController').jsonIngreso.numeroDocumento,
                            bodega: Scopes.get('ingresoController').jsonIngreso.bodega,
                            proveedores: Scopes.get('ingresoController').jsonIngreso.proveedores ,
                            ciudadOrigen:  Scopes.get('ingresoController').jsonIngreso.ciudadOrigen,
                            imagenInicioDescarga:  Scopes.get('descargaController').imgURI_antes_descarga,
                            transportadora  : Scopes.get('descargaController').jsonDescarga.transportadoraData,
                            vehiculo : Scopes.get('descargaController').jsonDescarga.vehiculo,
                            placaVehiculo : Scopes.get('descargaController').jsonDescarga.placaVehiculo,
                            placaRemolque : Scopes.get('descargaController').jsonDescarga.placaRemolque,
                            numeroPrecinto : Scopes.get('descargaController').jsonDescarga.numeroPrecinto,
                            fotoPrecinto : Scopes.get('descargaController').imgURI_precinto,
                            fotoPiso : Scopes.get('descargaController').imgURI_piso,
                            documentosProductoImportado : $scope.productoImportado.datos,
                            documentosProductoNacional : $scope.productosNacionales.datos,
                            plasticos : $scope.plasticos.datos,
                            numeroTornaguia : Scopes.get('descargaController').jsonDescargas.numeroTornaguia , 
                            fondoCuenta : Scopes.get('descargaController').jsonDescargas.fondoCuenta , 
                            fotoTornaguia : Scopes.get('descargaController').imgURI_tornaguia,
                            productos:Scopes.get('productosController').productos,
                            fotoSalida: $scope.imgURI_salida,
                            fechaFinRegistro : new moment().format("L ,h:mm:ss a")
                     }]);

        console.log($scope.jsonMain);
    
      //alert('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/ordenes-ingreso/save?data='+$scope.jsonMain);
       $scope.validacion = function(nombre) {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'El campo '+nombre+' es obligatorio !!!'
         });

         alertPopup.then(function(res) {
         
           console.log('Alerta confirmacion');
         });
        };

         $scope.validacionProducto = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'Se debe seleccionarse producto nacional o importado !!!'
         });

         alertPopup.then(function(res) {
         
           console.log('Alerta confirmacion');
         });
        };

         $scope.validacionNoProducto = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'No se han seleccinado productos!!!'
         });

         alertPopup.then(function(res) {
         
           console.log('Alerta confirmacion');
         });
        };

          $scope.validacionNoProductoRepetido = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'No se han seleccionado productos!!!'
         });

         alertPopup.then(function(res) {
         
           console.log('Alerta confirmacion');
         });
        };

        $scope.declinacion = function() {
         var alertPopup = $ionicPopup.alert({
           title: 'Informacion',
           template: 'No se ha podido guardar la transaccion'
         });

         alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
         });
        };

        $scope.nuevoIngreso = function(){
            Scopes.get('ingresoController').jsonIngreso.nuevaEntrada = false; 
            $window.location.href = '#/app/ingreso';
             Scopes.get('ingresoController').imgURI_ingreso = undefined;
              Scopes.get('ingresoController').jsonIngreso.fechaInicio = "";
              Scopes.get('ingresoController').jsonIngreso.cliente = "";
              Scopes.get('ingresoController').jsonIngreso.numeroDocumento ="";
              Scopes.get('ingresoController').jsonIngreso.bodega ="";
              Scopes.get('ingresoController').jsonIngreso.proveedores ="" ;
              Scopes.get('ingresoController').jsonIngreso.ciudadOrigen ="";
              Scopes.get('descargaController').imgURI_antes_descarga =undefined;
              Scopes.get('descargaController').jsonDescarga.transportadoraData ="";
              Scopes.get('descargaController').jsonDescarga.vehiculo ="";
              Scopes.get('descargaController').jsonDescarga.placaVehiculo ="";
              Scopes.get('descargaController').jsonDescarga.placaRemolque ="";
              Scopes.get('descargaController').jsonDescarga.numeroPrecinto ="";
              Scopes.get('descargaController').imgURI_precinto =undefined;
              $scope.productoImportado.datos = "";
              $scope.productosNacionales.datos = "";
              $scope.plasticos.datos = "";
              Scopes.get('descargaController').jsonDescargas.numeroTornaguia ="" ;
              Scopes.get('descargaController').jsonDescargas.fondoCuenta ="" ;
               Scopes.get('descargaController').jsonDescargas.rentas =false; 
              Scopes.get('descargaController').imgURI_tornaguia = undefined;
               Scopes.get('descargaController').imgURI_piso = undefined;
              Scopes.get('productosController').productos = [];
              $scope.imgURI_salida=undefined;
              $scope.jsonMain = [];
              //reinicia producto seleccionado 
              $scope.desactivarComponentes();
          
                           



        };
         $scope.resultado = [];
         console.log("numero ducmento == " + Scopes.get('ingresoController').jsonIngreso.numeroDocumento);
         console.log("ciudad == " + Scopes.get('ingresoController').jsonIngreso.ciudadOrigen);
         console.log("bodega == " + Scopes.get('ingresoController').jsonIngreso.bodega);
        //$http.post('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/ordenes-ingreso/save?data='+Scopes.get('ingresoController').imgSola)

        $scope.hacerValidacionesCamposVacios();   

      }
        $scope.desactivarComponentes = function(){
      
            Scopes.get('ingresoController').componentes.botonFotoIngreso = true ; 
            Scopes.get('ingresoController').componentes.comboCliente = true ; 
            Scopes.get('ingresoController').componentes.comboBodega = true ; 
            Scopes.get('ingresoController').componentes.comoboProveedores = true;
            Scopes.get('ingresoController').componentes.comboCiudadOrigen = true;
            Scopes.get('ingresoController').componentes.botonFotoInicioDescarga = true ; 
            Scopes.get('ingresoController').componentes.comboTransportadora = true ;  
            Scopes.get('ingresoController').componentes.comboVehiculo = true ; 
            Scopes.get('ingresoController').componentes.campoPlacaVehiculo = true ; 
            Scopes.get('ingresoController').componentes.campoPlacaRemolque = true ; 
            Scopes.get('ingresoController').componentes.campoNumeroPrecinto = true ; 
            Scopes.get('ingresoController').componentes.botonFotoPrecinto = true ;
            Scopes.get('ingresoController').componentes.checkProductoImportado = true ; 
            Scopes.get('ingresoController').componentes.checkPlastico = true ; 
            Scopes.get('ingresoController').componentes.checkRentas  =true ; 
            Scopes.get('ingresoController').componentes.fotoFinalDescargue = true ; 
            Scopes.get('ingresoController').componentes.tabDescarga = true ; 
            Scopes.get('ingresoController').componentes.tabSalida =true ;
            Scopes.get('ingresoController').componentes.loginOK = "0" ; 
            Scopes.get('descargaController').jsonDescarga.productoNacionalCheck = false;
            Scopes.get('descargaController').jsonDescarga.rentas = false;
            Scopes.get('descargaController').jsonDescarga.plasticos = false;
               Scopes.get('descargaController').jsonDescarga.info = false;
                $scope.resultadoInfo = false;
           
                for (var i=0; i< Scopes.get('descargaController').productoNacional.length; i++){
                            Scopes.get('descargaController').productoNacional[i].checked = false;

                }
                 for (var i=0; i< Scopes.get('descargaController').productoImportado.length; i++){
                            Scopes.get('descargaController').productoImportado[i].checked = false;

                }
                  for (var i=0; i< Scopes.get('descargaController').plasticos.length; i++){
                            Scopes.get('descargaController').plasticos[i].checked = false;

                }
         
      };


      $scope.hacerValidacionesCamposVacios = function()
      {
             
            if(Scopes.get('ingresoController').jsonIngreso.ciudadOrigen === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Ciudad origen');
              return; 
            }    

             if(Scopes.get('ingresoController').jsonIngreso.bodega === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Bodega');
              return; 
            }    

             if(Scopes.get('ingresoController').jsonIngreso.cliente === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Cliente');
              return; 
            }    

             if(Scopes.get('ingresoController').jsonIngreso.numeroDocumento === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Numero documento cliente');
              return; 
            }    

            if(Scopes.get('descargaController').jsonDescarga.transportadoraData === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Transportadora');
              return; 
            }   

            if(Scopes.get('descargaController').jsonDescarga.vehiculo === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Vehiculo');
              return; 
            }   

            if(Scopes.get('descargaController').jsonDescarga.placaVehiculo === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Placa vehiculo');
              return; 
            }   

             if(Scopes.get('descargaController').jsonDescarga.numeroPrecinto === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Numero precinto');
              return; 
            }   

          /* if(!Scopes.get('descargaController').componentes.checkProductoNacional && !Scopes.get('descargaController').componentes.checkProductoImportado){
              $scope.desactivaFinalizacion = false;
              $scope.validacionProducto();
              return; 
            }   */

/*             if(Scopes.get('descargaController').componentes.checkProductoNacional && Scopes.get('descargaController').componentes.checkProductoImportado){
              $scope.desactivaFinalizacion = false;
              $scope.validacionProducto();
              return; 
            }   */

            console.log("tamaño =" + Scopes.get('productosController').productos.length);

             if(Scopes.get('productosController').productos === undefined ||  Scopes.get('productosController').productos.length === 0){
              $scope.desactivaFinalizacion = false;
              $scope.validacionNoProducto();
              return; 
            }   
            
            
            if(Scopes.get('ingresoController').imgURI_ingreso === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen ingreso');
              return; 
            } 

            if(Scopes.get('descargaController').imgURI_antes_descarga === undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen antes de descarga');
              return; 
            } 

            if( Scopes.get('descargaController').imgURI_precinto=== undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen precinto');
              return; 
            } 

            if( Scopes.get('salidaController').imgURI_salida=== undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen salida');
              return; 
            } 

           /* if( Scopes.get('descargaController').imgURI_piso=== undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen piso contenedor');
              return; 
            }*/ 
            

            /*

             if( Scopes.get('descargaController').imgURI_tornaguia=== undefined ){
              $scope.desactivaFinalizacion = false;
              $scope.validacion('Imagen tornaguia');
              return; 
            } 

            */
            


            $scope.realizarRegistro();
      }

      $scope.realizarRegistro  =  function ()
      {

           $scope.loading();
             console.log("entra a if "); 
                $http.post('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/ordenes-ingreso/save',$scope.jsonMain)
                      .success(function(data, status, headers, config){
                        //alert("**** SUCCESS ****");
                       // alert(status);

                      })
                      .error(function(data, status, headers, config){
                       // alert("**** Verificar conexion a internet ****");
                       $scope.declinacion();
                      })
                      .then(function(response){

                       $scope.resultado = response.data;
                       
                       // $window.location.reload(true);
                         $scope.resultadoInfo = true;

                        //$scope.confirmacion();
                       $scope.closeLoading();

                 }); 


      }


      $scope.activarComponentesSalida= function(){
          if($scope.componentes.loginOK){
     
            $scope.componentes.fotoFinalDescargue = false ; 
         }else
         {
          console.log("valida");
         }
          
     };

      $scope.showConfirm = function() {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Confirmacion',
           template: ' ¿Esta seguro que desea que desea finalizar la recepción de productos?'
         });

         confirmPopup.then(function(res) {
           if(res) {
           $scope.desactivaFinalizacion = true ; 
             $scope.fin();
             $scope.insertarLocal();

           } else {

             console.log('You are not sure');
           }
         });
       };

          $scope.insertarLocal = function(nombre){
                 console.log("entra alamcenamiento local ");

                 $scope.jsonMainTodos =  Scopes.get('ingresoController').dataLocal.concat([$scope.jsonMain]);
                 $scope.dataLocal = Scopes.get('ingresoController').dataLocal ;   

                 window.localStorage.setItem("json", $scope.jsonMainTodos);
               
                 window.localStorage['json'] = JSON.stringify($scope.jsonMainTodos) ; 
                $scope.dataLocal =  JSON.parse(window.localStorage['json'] || '{}');
                 console.log( $scope.dataLocal );
               
             }




})


.controller('reporteController', function($scope, $cordovaCamera ,Scopes , $ionicPopup ,$cordovaPrinter ,$location,$http) {

    Scopes.store('reporteController', $scope);
     $scope.jsonIngreso  = Scopes.get('ingresoController').jsonIngreso;
    $scope.jsonReporte=[];
    $scope.info  =  $location.search();
    console.log($scope.info.id);
    console.log($scope.info.token);
    console.log('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/ordenes-ingreso?id='+$scope.info.id+'&token='+$scope.info.token)
       $http.get('http://192.170.112.207:8080/ordenes-ingreso?id='+$scope.info.id+'&token='+$scope.info.token)
        //$http.get('http://'+Scopes.get('ingresoController').jsonIngreso.ip+':'+Scopes.get('ingresoController').jsonIngreso.puerto+'/ordenes-ingreso?id='+$scope.info.id+'&token='+$scope.info.token)
              .success(function(data, status, headers, config){
                //alert("**** SUCCESS ****");
               // alert(status);

              })
              .error(function(data, status, headers, config){
                alert("**** Verificar conexion a internet ****");
            
              })
              .then(function(response){
               
               $scope.jsonReporte = response.data;
              console.log("json reporte " + $scope.jsonReporte);

         }); 



     //registra  el scope local en   el array  SCOPES 
     
      //$scope.jsonReporte = {usuario:"supervisor","clave":"123","imagenIngreso":"data:image/jpeg;base64,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","fechaInicio":"2016-02-08T13:04:45-05:00","cliente":"ENTEC","bodega":"MTV01","proveedores":"ENTEC","ciudadOrigen":"BOGOTA, D.C.","imagenInicioDescarga":"data:image/jpeg;base64,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","transportadora":"COLTANQUES S.A.S.","vehiculo":"SENCILLO","placaVehiculo":"ryy567","placaRemolque":"cf66","numeroPrecinto":"6677","fotoPrecinto":"data:image/jpeg;base64,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","documentosProductoImportado":"Remesa","plasticos":"","productos":[{"producto":"110-213-004","cantidad":"7","unidadMedida":"KILO","loteSugerido":"4","estadoInventario":"NO CONFORME","novedades":"","descripcionNovedad":""}],"fotoSalida":"data:image/jpeg;base64,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","fechaFinRegistro":"2016-02-08T13:06:58-05:00"};
    
      // $scope.jsonReporte ={"usuario":"supervisor"};
       console.log($scope.jsonReporte.usuario);

      $scope.imprimir = function() {
        if($cordovaPrinter.isAvailable()) {
            $cordovaPrinter.print("<html>   <div class='list'>"+
           "<div class='item item-divider'>"+
              "Datos del cliente"+
            "</div>"+
          "<a class='item item-icon-left' href='#'>"+
            "<i class='icon ion-ios-calendar-outline'></i>"+
           "Fecha inicio"+
            "<span class='item-note'>"+
              "{{jsonReporte.fechaInicio}}"+
            "</span>"+
          "</a></div></html>");
        } else {
            alert("Printing is not available on device");;
        }
     }

})