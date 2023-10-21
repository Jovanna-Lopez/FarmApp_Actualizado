<?php


class mapaController extends Controller{
private $_map;

function __construct()
{
    parent::__construct();
    $this->_map=$this->loadModel("mapa");
}

public function getubicacion()
{
    $fila=$this->_map->obtenerdatos();
    for($i=0;$i<count($fila);$i++){
        $datos=json_encode($fila);
        
    } 
    return $datos;
    

}
public function getnumerofarmacias()
{
    $numero=$this->_map->numerofarmacias();
    $num=json_encode($numero);


    return $num;
    

}
public function getnumerofarmacos()
{
    $numerof=$this->_map->numeromedicamentos();
    $numf=json_encode($numerof);


    return $numf;
    

}


public function busquedas(){
    $fila=$this->_map->buscarfarmacias($this->getTexto('busq'));
    if(is_array($fila)){
    $tabla='';
    for($i=0;$i<count($fila);$i++){
        $datos=json_encode($fila[$i]);
        $tabla.='
        <tr>
        <td>'.$fila[$i]['nombre_medico'].'</td>
        <td>'.$fila[$i]['nombre_comercial'].'</td>
        <td>
        <button data-d=\''.$datos.'\' class="btn btn-info btn-circle btEditarD" data-toggle="modal" data-target="#actualizarD" > <i class="fas fa-refresh"></i></button>
        <button data-borrarD='.$fila[$i]['nombre_medico'].' class="btn btn-danger btn-circle btBorrarD"> <i class="fas fa-trash"></i></button>
        </td>

        </tr>';
    }
    echo $tabla;

}

  


}



public function index()
{
$this->_view->datos=$this->getubicacion();
$this->_view->num=$this->getnumerofarmacias();
$this->_view->numf=$this->getnumerofarmacos();
$this->_view->renderizar('mapa');

}





}




?>