<?php

class regenteModel extends Model{
   
 
    function __contruct()
    {
        parent::__contruct();



    }


   

    public function insertarreg($nom,$apell,$sex,$tel,$corr,$nombreu,$clave,$imagen){
    $this->_db->prepare('insert into regente(nombres,apellidos,sexo,telefono,correo,nombre_usuario,clave,imagen_reg)
    values(:nom,:apell,:sex,:tel,:corr,:nombreu,:clave,:imagen_reg)')->execute(array('nom'=>$nom,
    'apell'=>$apell,'sex'=>$sex,'tel'=>$tel,'corr'=>$corr
    ,'nombreu'=>$nombreu,'clave'=>$clave, 'imagen_reg'=>$imagen ));

    $priv="regente";
    $this->_db->prepare('insert into usuario(nombre_usuario,password,privilegio)
    values(:nombreu,:clave,:priv)')->execute(array('nombreu'=>$nombreu,
    'clave'=>$clave,'priv'=>$priv));


    }

    public function insertarimagenreg($nombres,$apellidos,$sexo,$telefono,$correo,$nombreu,$clave,$imagen){
        $this->_db->prepare('insert into regente(nombres,apellidos,sexo,telefono,correo,nombre_usuario,clave,imagen_reg)
        values(:nombres,:apellidos,:sexo,:telefono,:correo,:nombreu,:clave,:imagen)')->execute(array('nombres'=>$nombres,
        'apellidos'=>$apellidos,'sexo'=>$sexo,'telefono'=>$telefono,'correo'=>$correo
        ,'nombreu'=>$nombreu,'clave'=>$clave,'imagen'=>$imagen));}


    public function editareg($idr,$nombresu,$apellidosu,$sexou,$telefonou,$correou,$nombreup,$claveu,$imagenu){
    return $this->_db->prepare("update regente set
    nombres=:nombresu,apellidos=:apellidosu,sexo=:sexou,telefono=:telefonou,correo=:correou,nombre_usuario=:nombreup,
    clave=:claveu,imagen_reg=:imagenu where id_regente=:idr")
    ->execute(array('nombresu'=>$nombresu,
    'apellidosu'=>$apellidosu,'sexou'=>$sexou,'telefonou'=>$telefonou,'correou'=>$correou,'nombreup'=>$nombreup,'claveu'=>$claveu,'imagenu'=>$imagenu,'idr'=>$idr));
    }

    public function editaregente($idr,$nombresu,$apellidosu,$sexou,$telefonou,$correou,$nombreup,$claveu){
        return $this->_db->prepare("update regente set
        nombres=:nombresu,apellidos=:apellidosu,sexo=:sexou,telefono=:telefonou,correo=:correou,nombre_usuario=:nombreup,
        clave=:claveu where id_regente=:idr")
        ->execute(array('nombresu'=>$nombresu,
        'apellidosu'=>$apellidosu,'sexou'=>$sexou,'telefonou'=>$telefonou,'correou'=>$correou,'nombreup'=>$nombreup,'claveu'=>$claveu,'idr'=>$idr));
        }


    public function obtenerregente(){
        return $this->_db->query("select *from regente")->fetchAll();
    }

  




public function borrareg($idreg){
    $this->_db->prepare('delete from regente where id_regente=:idreg')
    ->execute(array('idreg'=>$idreg));

}




}







?>