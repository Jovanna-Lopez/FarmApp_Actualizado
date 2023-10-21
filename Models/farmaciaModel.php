<?php

class farmaciaModel extends Model{
   
 
    function __contruct()
    {
        parent::__contruct();



    }


   

    public function insertarfarm($duexo,$nombre,$registro,
    $direccion,$latitud,$longitud,$telefono,$abierto,$cierre){
    $this->_db->prepare('insert into farmacia(nombre,
    registro,direccion,latitud,longitud,telefono,hora_abre,hora_cierre,regente_id_regente)
    values(:nombre,:registro,:direccion,:latitud,:longitud,:telefono
    ,:hora_abre,:hora_cierre,:duexo)')->execute(array('nombre'=>$nombre,
    'registro'=>$registro,'direccion'=>$direccion,'latitud'=>$latitud
    ,'longitud'=>$longitud
    ,'telefono'=>$telefono,'hora_abre'=>$abierto,'hora_cierre'=>$cierre,'duexo'=>$duexo));
    }
 

    public function actualizarfar($idfarm,$duexoup,$nombreup,$registroup,
    $direccionup,$latitudup,$longitudup,$telefonoup,$abiertoup,$cierreup){
    return $this->_db->prepare("update farmacia set
    nombre=:nombreup,registro=:registroup,direccion=:direccionup,latitud=:latitudup,
    longitud=:longitudup,telefono=:telefonoup,hora_abre=:abiertoup,
    hora_cierre=:cierreup,regente_id_regente=:duexoup where id_farmacia=:idfarm")
    ->execute(array('nombreup'=>$nombreup,
    'registroup'=>$registroup,'direccionup'=>$direccionup,'latitudup'=>$latitudup
    ,'longitudup'=>$longitudup
    ,'telefonoup'=>$telefonoup,'abiertoup'=>$abiertoup,'cierreup'=>$cierreup,'duexoup'=>$duexoup,'idfarm'=>$idfarm));
    }



    public function obtenerfarm(){
        return $this->_db->query("select *from farmacia")->fetchAll();
    }

    public function obteneregente(){
        return $this->_db->query("select *from regente")->fetchAll();
    }

public function borrarfarm($idfarmacia){
    $this->_db->prepare('delete from farmacia where id_farmacia=:idfarmacia')
    ->execute(array('idfarmacia'=>$idfarmacia));

}




}







?>