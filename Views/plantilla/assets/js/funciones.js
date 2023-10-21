

$(document).ready(function() {

/*var map = L.map('map').setView([13.04614026813303, -86.90305150146241], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">FarmApp</a>'
}).addTo(map);

*/

$('#table').DataTable({
    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
    "language":{
        "sSearch":"Buscar",
        "lengthMenu":"Mostrar _MENU_ registros",
        "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
        "zeroRecords":"No se encuentran resultados",
        "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
        "oPaginate":{
            "sNext":"Siguiente",
            "sPrevious":"Anterior"
        }        
    } 
     
    }); 

    
$("#busquedas").on("keyup",function(){
    var busq=$("#busquedas").val();

    console.log(busq);

    $.ajax({
        url:"mapa/busquedas/",
        type:'POST',
        data:{'busq':busq},
        success:function(resultado){
            console.log("enviado");
            $("#prueba").html(resultado);
        }  
        });




    });


/* Funcio para mandar datos al controlador para ingresar datos de farmacia a la base de datos, cuando se haga el envio del formulario*/
$("#formagregarfarmacia").on("submit",function(e){
    var duexo=$("#duexo").val();
    var nombre=$("#nombre").val();
    var registro=$("#registro").val();
    var telefono=$("#telefono").val();
    var abierto=$("#abierto").val();
    var cierre=$("#cierre").val();
    var direccion=$("#direccion").val();
    var latitud=$("#latitud").val();
    var longitud=$("#longitud").val();


    e.preventDefault();
    $.ajax({
        url:'farmacia/insertarfarmacia/',
        type:'post',
        data:{'duexo':duexo,'nombre':nombre,'registro':registro,'direccion':direccion,
    'latitud':latitud,'longitud':longitud,'telefono':telefono,
    'abierto':abierto,'cierre':cierre},
    success:function(respuesta){
        $('#modalfarm').modal('hide');
        $("#table").DataTable().destroy();
      $("#table tbody").html(respuesta);
      $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
        "language":{
            "sSearch":"Buscar",
            "lengthMenu":"Mostrar _MENU_ registros",
            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "zeroRecords":"No se encuentran resultados",
            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            }        
        }
        
        });  

        $('#formagregarfarmacia')[0].reset();

        Swal.fire(
            'Se registro la farmacia con exito',
            'en el sistema',
            'success'
        )


    }
    ,error:function(){
        console.log('Error');
    }



}); 



});

/* Funciones para editar farmacia*/

/*funcion para cargar informacion en el modal para editar farmacia*/
$("#table").on("click",".btEditarfarmacia",function(){
    var datos= JSON.parse($(this).attr('data-farmacia'));
    $("#idfarm").val(datos['id_farmacia']);
    $("#duexoup").val(datos['regente_id_regente']);
    $("#nombreup").val(datos['nombre']);
    $("#registroup").val(datos['registro']);
    $("#telefonoup").val(datos['telefono']);
    $("#abiertoup").val(datos['hora_abre']);
    $("#cierreup").val(datos['hora_cierre']);
    $("#direccionup").val(datos['direccion']);
    $("#latitudup").val(datos['latitud']);
    $("#longitudup").val(datos['longitud']);
    
    });
    
    /*fucnion para realizar actualizacion con el modal actu usuario*/
    
    $("#formeditarfarmacia").submit(function(e){
        var idfarm=$("#idfarm").val();
        var duexoup=$("#duexoup").val();
        var nombreup=$("#nombreup").val();
        var registroup=$("#registroup").val();
        var telefonoup=$("#telefonoup").val();
        var abiertoup=$("#abiertoup").val();
        var cierreup=$("#cierreup").val();
        var direccionup=$("#direccionup").val();
        var latitudup=$("#latitudup").val();
        var longitudup=$("#longitudup").val();
    
    e.preventDefault();
    
    $.ajax({
        url:'farmacia/editarfarmacia/',
        type:'post',
        data:{'idfarm':idfarm,'duexoup':duexoup,'nombreup':nombreup,'registroup':registroup,'direccionup':direccionup,
        'latitudup':latitudup,'longitudup':longitudup,'telefonoup':telefonoup,
        'abiertoup':abiertoup,'cierreup':cierreup},
        success:function(respuesta){
            $('#modalfarmup').modal('hide');
            $("#table").DataTable().destroy();
            $("#table tbody").html(respuesta);
            $('#table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true,rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                "language":{
                    "sSearch":"Buscar",
                    "lengthMenu":"Mostrar _MENU_ registros",
                    "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                    "zeroRecords":"No se encuentran resultados",
                    "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                    "oPaginate":{
                        "sNext":"Siguiente",
                        "sPrevious":"Anterior"
                    }        
                }
                
                });  
    
            Swal.fire(
                'Se actualizo con exito!',
                'el registro',
                'success'
            )
    
        }
    
    
    
    
    });
    
    
    });
    
/* Funcion para eliminar farmacia*/

$("#table").on("click",".btBorrarfarmacia",function(){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrá recuperar los datos!",
        icon: 'warning',
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#428bca',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminarlo!',
        cancelButtonText: 'No, cancelar',

        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){
            var idfarmacia=$(this).attr('data-borrarfarmacia');

            $.ajax({
                url:'farmacia/borrarfarmacia/',
                type:"POST",
                data:{'idfarmacia':idfarmacia},
                success:function(respuesta){
                    $("#table").DataTable().destroy();
                    $("#table tbody").html(respuesta);
                    $('#table').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ],
                        responsive: true,rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        "language":{
                            "sSearch":"Buscar",
                            "lengthMenu":"Mostrar _MENU_ registros",
                            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                            "zeroRecords":"No se encuentran resultados",
                            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                            "oPaginate":{
                                "sNext":"Siguiente",
                                "sPrevious":"Anterior"
                            }        
                        }
                        
                        });  
                    Swal.fire(
                        'Borrado',
                        'El registro a sido eliminado',
                        'success'
                    )

                    
                }
            });



            


        }
        else if (
            result.dismiss === Swal.DismissReason.cancel
          ){
            Swal.fire(
            'cancelado',
            'el registro esta a salvo',
            'error'
    
            )
    
          }

    });


});






/* Funcion para mandar datos al controlador para ingresar datos de farmacos a la base de datos, cuando se haga el envio del formulario*/
$("#formagregarfarmaco").on("submit",function(e){

    var farmacia=$("#farmacia").val();
    var nombremedico=$("#nombremedico").val();
    var nombrecomercial=$("#nombrecomercial").val();
    var laboratorio=$("#laboratorio").val();
    var estado=$("#estado").val();
    var peso=$("#peso").val();
    var volumen=$("#volumen").val();
    var vencimiento=$("#vencimiento").val();
    var tipo=$("#tipo").val();
    var cantidad=$("#cantidad").val();
    var precio=$("#precio").val();
    var delivery=$("#delivery").val();
    var aplica=$("#aplica").val();
    var precauciones=$("#precauciones").val();
    var reacciones=$("#reacciones").val();
    var interacciones=$("#interacciones").val();
    var extension=$("#user_image").val().split('.').pop().toLowerCase();;
console.log(extension);
if(extension != '')
  {
   if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
   {
    alert("Invalid Image File");
    $('#user_image').val('');
    return false;
   }
  } 

    e.preventDefault();
    $.ajax({
        url:'farmaco/insertarfarmaco/',
        type:'post',
        data:new FormData(this),
        contentType:false,
        processData:false,
    success:function(respuesta){
  
        $('#modalfarmco').modal('hide');
        $("#table").DataTable().destroy();
      $("#table tbody").html(respuesta);
      $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
        "language":{
            "sSearch":"Buscar",
            "lengthMenu":"Mostrar _MENU_ registros",
            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "zeroRecords":"No se encuentran resultados",
            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            }        
        }
        
        });  

        $('#formagregarfarmaco')[0].reset();

        Swal.fire(
            'Se registro el farmaco con exito',
            'en el sistema',
            'success'
        )


    }
    ,error:function(){
        console.log('Error');
    }



}); 



});



/* Funciones para editar farmacos*/

/*funcion para cargar informacion en el modal para editar farmacos*/
$("#table").on("click",".btEditarfarmaco",function(){
    var datos= JSON.parse($(this).attr('data-farmacos'));
    $("#idfarmaco").val(datos['id_farmaco']);
    $("#farmaciaeditar").val(datos['farmacia_id_farmacia']);
    $("#nombremedicoA").val(datos['nombre_medico']);
    $("#nombrecomercialA").val(datos['nombre_comercial']);
    $("#laboratorioA").val(datos['laboratorio']);
    $("#estadoA").val(datos['estado']);
    $("#pesoA").val(datos['peso']);
    $("#volumenA").val(datos['volumen']);
    $("#vencimientoA").val(datos['fecha_de_vencimiento']);
    $("#tipoA").val(datos['tipo']);
    $("#cantidadA").val(datos['cantidad']);
    $("#precioA").val(datos['precio']);
    $("#deliveryA").val(datos['delivery']);
    $("#aplicaA").val(datos['aplicacion']);
    $("#precaucionesA").val(datos['precauciones']);
    $("#reaccionesA").val(datos['reacciones']);
    $("#interaccionesA").val(datos['interacciones']);
    $("#user_uploaded_image").val(datos['interacciones']);
   $("#user_uploaded_image").html(datos['imagen']);
   $("#probando").attr("src",'Views/plantilla/assets/img/'+datos['imagen']);

   
   
    });
    
    /*fucnion para realizar actualizacion con el modal actu farmacos*/
    
    $("#formeditarfarmaco").submit(function(e){
        var idfarmaco=$("#idfarmaco").val();
        var farmaciaeditar=$("#farmaciaeditar").val();
        var nombremedicoA=$("#nombremedicoA").val();
        var nombrecomercialA=$("#nombrecomercialA").val();
        var laboratorioA=$("#laboratorioA").val();
        var estadoA=$("#estadoA").val();
        var pesoA=$("#pesoA").val();
        var volumenA=$("#volumenA").val();
        var vencimientoA=$("#vencimientoA").val();
        var tipoA=$("#tipoA").val();
        var cantidadA=$("#cantidadA").val();
        var precioA=$("#precioA").val();
        var deliveryA=$("#deliveryA").val();
        var aplicaA=$("#aplicaA").val();
        var precaucionesA=$("#precaucionesA").val();
        var reaccionesA=$("#reaccionesA").val();
        var interaccionesA=$("#interaccionesA").val();
        var user_imageA=$("#user_imageA").val();
        var extension=$("#user_imageA").val().split('.').pop().toLowerCase();;
        console.log(extension);
        if(extension != '')
          {
           if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
           {
            alert("Invalid Image File");
            $('#user_imageA').val('');
            return false;
           }
          } 
    
    e.preventDefault();
    
    $.ajax({
        url:'farmaco/editarfarmaco/',
        type:'post',
        data:new FormData(this),
        contentType:false,
        processData:false,
        success:function(respuesta){
            $('#modalactualizarfarmacos').modal('hide');
            $("#table").DataTable().destroy();
            $("#table tbody").html(respuesta);
            $('#table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true,rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                "language":{
                    "sSearch":"Buscar",
                    "lengthMenu":"Mostrar _MENU_ registros",
                    "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                    "zeroRecords":"No se encuentran resultados",
                    "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                    "oPaginate":{
                        "sNext":"Siguiente",
                        "sPrevious":"Anterior"
                    }        
                }
                
                });  
    
            Swal.fire(
                'Se actualizo el registro con exito!',
                'el registro',
                'success'
            )
    
        }
    
    
    
    
    });
    
    
    });


/* Funcion para eliminar Farmacos*/

$("#table").on("click",".btBorrarfarmaco",function(){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrá recuperar los datos!",
        icon: 'warning',
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#428bca',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminarlo!',
        cancelButtonText: 'No, cancelar',

        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){
            var idfarmacoborrar=$(this).attr('data-borrarfarmaco');

            $.ajax({
                url:'farmaco/borrarfarmaco/',
                type:"POST",
                data:{'idfarmacoborrar':idfarmacoborrar},
                success:function(respuesta){
                    $("#table").DataTable().destroy();
                    $("#table tbody").html(respuesta);
                    $('#table').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ],
                        responsive: true,rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        "language":{
                            "sSearch":"Buscar",
                            "lengthMenu":"Mostrar _MENU_ registros",
                            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                            "zeroRecords":"No se encuentran resultados",
                            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                            "oPaginate":{
                                "sNext":"Siguiente",
                                "sPrevious":"Anterior"
                            }        
                        }
                        
                        });  
                    Swal.fire(
                        'Borrado',
                        'El registro a sido eliminado',
                        'success'
                    )

                    
                }
            });



            


        } else if (
            result.dismiss === Swal.DismissReason.cancel
          ){
            Swal.fire(
            'cancelado',
            'el registro esta a salvo',
            'error'
    
            )
    
          }

    });


});
    





/* Funcion para mandar datos al controlador para ingresar datos de regentes a la base de datos, cuando se haga el envio del formulario*/
$("#formagregarregentes").on("submit",function(e){

    var nombres=$("#nombres").val();
    var apellidos=$("#apellidos").val();
    var sexo=$("#sexo").val();
    var telefono=$("#telefono").val();
    var correo=$("#correo").val();
    var nombreu=$("#nombreu").val();
    var clave=$("#clave").val();
    var extension=$("#regen_image").val().split('.').pop().toLowerCase();
    console.log(extension);
if(extension != '')
  {
   if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
   {
    alert("Invalid Image File");
    $('#regen_image').val('');
    return false;
   }
  } 

    e.preventDefault();
    $.ajax({
        url:'regente/insertarregente/',
        type:'post',
        data:new FormData(this),
        contentType:false,
        processData:false,
    success:function(respuesta){
        $('#modalregente').modal('hide');
        $("#table").DataTable().destroy();
      $("#table tbody").html(respuesta);
      $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
        "language":{
            "sSearch":"Buscar",
            "lengthMenu":"Mostrar _MENU_ registros",
            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "zeroRecords":"No se encuentran resultados",
            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            }        
        }
        
        });  

        $('#formagregarregentes')[0].reset();

        Swal.fire(
            'Se registro el regente con exito',
            'en el sistema',
            'success'
        )


    }
    ,error:function(){
        console.log('Error');
    }



}); 



});

/* Funciones para editar*/

/*funcion para cargar informacion en el modal para editar regente*/
$("#table").on("click",".btEditarregente",function(){
    var datos= JSON.parse($(this).attr('data-regente'));
    $("#idregen").val(datos['id_regente']);
    $("#nombresu").val(datos['nombres']);
    $("#apellidosu").val(datos['apellidos']);
    $("#sexou").val(datos['sexo']);
    $("#telefonou").val(datos['telefono']);
    $("#correou").val(datos['correo']);
    $("#nombreup").val(datos['nombre_usuario']);
    $("#claveu").val(datos['clave']);
    $("#user_uploaded_image").html(datos['imagen_reg']);
   $("#probando").attr("src",'Views/plantilla/assets/img/'+datos['imagen_reg']);
   var idr=$("#idregen").val();
    console.log(idr);
    });
    
    /*fucnion para realizar actualizacion con el modal actu regente*/
    
    $("#formeditarregentes").submit(function(e){
        $("#idregen").attr("disabled", false);
        var idregen=$("#idregen").val();
        var nombresu=$("#nombresu").val();
        var apellidosu=$("#apellidosu").val();
        var sexou=$("#sexou").val();
        var telefonou=$("#telefonou").val();
        var correou=$("#correou").val();
        var nombreup=$("#nombreup").val();
        var claveu=$("#claveu").val();
        var regen_imageu=$("#regen_imageu").val();
        var extension=$("#regen_imageu").val().split('.').pop().toLowerCase();;

        console.log(extension);
        if(extension != '')
          {
           if(jQuery.inArray(extension, ['gif','png','jpg','jpeg']) == -1)
           {
            alert("Invalid Image File");
            $('#regen_imageu').val('');
            return false;
           }
          } 
    
    e.preventDefault();
    $.ajax({
        url:'regente/editaregente/',
        type:'post',
        data:new FormData(this),
        contentType:false,
        processData:false,
        success:function(respuesta){
            $('#modaleditarregente').modal('hide');
            $("#table").DataTable().destroy();
            $("#table tbody").html(respuesta);
            $('#table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                responsive: true,rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                "language":{
                    "sSearch":"Buscar",
                    "lengthMenu":"Mostrar _MENU_ registros",
                    "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                    "zeroRecords":"No se encuentran resultados",
                    "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                    "oPaginate":{
                        "sNext":"Siguiente",
                        "sPrevious":"Anterior"
                    }        
                }
                
                });  
    
            Swal.fire(
                'Se actualizo con exito!',
                'el registro',
                'success'
            )
    
        }
    
    
    
    
    });

    
    
    });
    

/* Funcion para eliminar regente*/

$("#table").on("click",".btBorrarregente",function(){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrá recuperar los datos!",
        icon: 'warning',
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#428bca',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminarlo!',
        cancelButtonText: 'No, cancelar',

        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){
            var idreg=$(this).attr('data-borraregente');

            $.ajax({
                url:'regente/borraregente/',
                type:"POST",
                data:{'idreg':idreg},
                success:function(respuesta){
                    $("#table").DataTable().destroy();
                    $("#table tbody").html(respuesta);
                    $('#table').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ],
                        responsive: true,rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        "language":{
                            "sSearch":"Buscar",
                            "lengthMenu":"Mostrar _MENU_ registros",
                            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                            "zeroRecords":"No se encuentran resultados",
                            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                            "oPaginate":{
                                "sNext":"Siguiente",
                                "sPrevious":"Anterior"
                            }        
                        }
                        
                        });  
                    Swal.fire(
                        'Borrado',
                        'El registro a sido eliminado',
                        'success'
                    )

                    
                }
            });



            


        }
        else if (
            result.dismiss === Swal.DismissReason.cancel
          ){
            Swal.fire(
            'cancelado',
            'el registro esta a salvo',
            'error'
    
            )
    
          }

    });


});

/* Funcion para mandar datos al controlador para ingresar datos de usuario a la base de datos, cuando se haga el envio del formulario*/
$("#formagregarusuario").submit(function(e){

    var nombreU=$("#nombreusuario").val();
    var claveU=$("#claveu").val();
    var privilegio=$("#privilegio").val();



    e.preventDefault();
    $.ajax({
        url:'usuario/insertarusuario/',
        type:'post',
        data:{'nombreU':nombreU,'claveU':claveU,'privilegio':privilegio},
    success:function(respuesta){
        $('#modalusuario').modal('hide');
        $("#table").DataTable().destroy();
      $("#table tbody").html(respuesta);
      $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
        "language":{
            "sSearch":"Buscar",
            "lengthMenu":"Mostrar _MENU_ registros",
            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "zeroRecords":"No se encuentran resultados",
            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            }        
        }
        
        });  

        $('#formagregarusuario')[0].reset();

        Swal.fire(
            'Se registro el regente con exito',
            'en el sistema',
            'success'
        )


    }
    ,error:function(){
        console.log('Error');
    }



}); 



});

/*funcion para cargar informacion en el modal para editar regente*/
$("#table").on("click",".btEditarusuario",function(){
    var datos= JSON.parse($(this).attr('data_usuario'));
    $("#idusuario").val(datos['id_usuario']);
    $("#nombreusuarioA").val(datos['nombre_usuario']);
    $("#claveuA").val(datos['password']);
    $("#privilegioA").val(datos['privilegio']);
    });

    
/* Funcion para mandar datos al controlador para ingresar datos de usuario a la base de datos, cuando se haga el envio del formulario*/
$("#formeditarusuario").on("submit",function(e){
    var idusuario=$("#idusuario").val();
    var nombreusuarioA=$("#nombreusuarioA").val();
    var claveuA=$("#claveuA").val();
    var privilegioA=$("#privilegioA").val();


    e.preventDefault();
    $.ajax({
        url:'usuario/editarusua/',
        type:'post',
        data:{'idusuario':idusuario,'nombreusuarioA':nombreusuarioA,'claveuA':claveuA,'privilegioA':privilegioA},
    success:function(respuesta){
        $('#formeditarusuario').modal('hide');
        $("#table").DataTable().destroy();
      $("#table tbody").html(respuesta);
      $('#table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true,rowReorder: {
            selector: 'td:nth-child(2)'
        },
        "language":{
            "sSearch":"Buscar",
            "lengthMenu":"Mostrar _MENU_ registros",
            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
            "zeroRecords":"No se encuentran resultados",
            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
            "oPaginate":{
                "sNext":"Siguiente",
                "sPrevious":"Anterior"
            }        
        }
        
        });  

        $('#formagregarusuario')[0].reset();

        Swal.fire(
            'Se registro el regente con exito',
            'en el sistema',
            'success'
        )


    }
    ,error:function(){
        console.log('Error');
    }



}); 



});
/* Funcion para eliminar usuario*/

$("#table").on("click",".btBorrarusuario",function(){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrá recuperar los datos!",
        icon: 'warning',
        confirmButtonColor: '#d9534f',
        cancelButtonColor: '#428bca',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminarlo!',
        cancelButtonText: 'No, cancelar',

        reverseButtons:true
    }).then((result)=>{
        if(result.isConfirmed){
            var idusu=$(this).attr('data_borrarusuario');
console.log(idusu);
            $.ajax({
                url:'usuario/borrarusuario/',
                type:"POST",
                data:{'idusu':idusu},
                success:function(respuesta){
                    $("#table").DataTable().destroy();
                    $("#table tbody").html(respuesta);
                    $('#table').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                        ],
                        responsive: true,rowReorder: {
                            selector: 'td:nth-child(2)'
                        },
                        "language":{
                            "sSearch":"Buscar",
                            "lengthMenu":"Mostrar _MENU_ registros",
                            "infoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros",
                            "zeroRecords":"No se encuentran resultados",
                            "info":"Mostrando registros del _START_ al _END_ de un _TOTAL_ de registros",
                            "oPaginate":{
                                "sNext":"Siguiente",
                                "sPrevious":"Anterior"
                            }        
                        }
                        
                        });  
                    Swal.fire(
                        'Borrado',
                        'El registro a sido eliminado',
                        'success'
                    )

                    
                }
            });



            


        }
        else if (
            result.dismiss === Swal.DismissReason.cancel
          ){
            Swal.fire(
            'cancelado',
            'el registro esta a salvo',
            'error'
    
            )
    
          }

    });


});

});

