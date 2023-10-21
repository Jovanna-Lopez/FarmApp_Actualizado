<?php

class mapaModel extends Model{
   
 
    function __contruct()
    {
        parent::__contruct();



    }


    public function obtenerdatos(){
        return $this->_db->query("select * from farmacia")->fetchAll();
    }

    public function numerofarmacias(){
        return $this->_db->query("select * from farmacia")->rowCount();
    }
    public function numeromedicamentos(){
        return $this->_db->query("select * from farmaco")->rowCount();
    }

    public function buscarfarmacias($busq){
        if(mb_strlen($busq) == 0){

        }
        else{
        $parametro='%'.$busq.'%';
       
        $stmt=$this->_db->prepare("SELECT nombre_medico, nombre_comercial FROM farmaco WHERE nombre_medico like :parametro");
        $stmt->execute(array(':parametro'=>$parametro));
        $contar=$stmt->rowCount();  
      
        if($contar==0)
        {
         echo "<span id='prueba' estado='false' style='color:brown;'> <strong>Oh no!</strong> Farmaco no encontrado !!!</span>";
        }
        else
        {
            $count=$stmt->fetchAll();
            return $count;
        }

       
          
           


    }
    }

    




}







?>