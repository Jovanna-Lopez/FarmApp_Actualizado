<?php


class regenteController extends Controller{
 private $_reg;

function __construct()
{
    parent::__construct();
    $this->_reg=$this->loadModel("regente");
}



public function verregente(){
    $fila=$this->_reg->obtenerregente();
    $tabla='';
    for($i=0;$i<count($fila);$i++){
        $datos=json_encode($fila[$i]);
        $tabla.='
        <tr>
        <td><img src=Views/plantilla/assets/img/'.$fila[$i]['imagen_reg'].' class="img-thumbnail" width="50" height="40"></td>
        <td>'.$fila[$i]['id_regente'].'</td>
        <td>'.$fila[$i]['nombres'].'</td>
        <td>'.$fila[$i]['apellidos'].'</td>
        <td>'.$fila[$i]['sexo'].'</td>
        <td>'.$fila[$i]['telefono'].'</td>
        <td>'.$fila[$i]['correo'].'</td>
        <td>'.$fila[$i]['nombre_usuario'].'</td>
        <td>'.$fila[$i]['clave'].'</td>
       

        <td>
        <button data-regente=\''.$datos.'\' class="btn btn-info btn-circle btEditarregente" data-bs-toggle="modal" data-bs-target="#modaleditarregente" > <i class="fa fa-refresh"></i></button>
        <button data-borraregente='.$fila[$i]['id_regente'].' class="btn btn-danger btn-circle btBorrarregente"> <i class="fas fa-trash"></i></button>




        </td>




        </tr>';
    }
    return $tabla;


}

public function index()
{
$this->_view->tabla=$this->verregente();



$this->_view->renderizar('regente');


}

public function insertarregente(){
    function upload_image()
    {
     if(isset($_FILES["regen_image"]))
     {
      $extension = explode('.', $_FILES['regen_image']['name']);
      $new_name = rand() . '.' . $extension[1];
      $destination = './Views/plantilla/assets/img/' . $new_name;
      move_uploaded_file($_FILES['regen_image']['tmp_name'], $destination);
      return $new_name;
     }
    }
    $imagen = '';
if($_FILES["regen_image"]["name"] != '') 
  {
   $imagen = upload_image();
    $this->_reg->insertarimagenreg($this->getTexto('nombres'),
    $this->getTexto('apellidos'),$this->getTexto('sexo'),
    $this->getTexto('telefono'),$this->getTexto('correo'),
    $this->getTexto('nombreu'),
    $this->getTexto('clave'),$imagen); 


    echo $this->verregente();
   
}
}


public function editaregente(){

    function editar_image()
    {
     if(isset($_FILES["regen_imageu"]))
     {
      $extension = explode('.', $_FILES['regen_imageu']['name']);
      $new_name = rand() . '.' . $extension[1];
      $destination = './Views/plantilla/assets/img/' . $new_name;
      move_uploaded_file($_FILES['regen_imageu']['tmp_name'], $destination);
      return $new_name;
     }
    }
    $imagenu = '';
if($_FILES["regen_imageu"]["name"] != '')
  {
   $imagenu = editar_image();


    $this->_reg->editareg($this->getTexto('idregen'),
    $this->getTexto('nombresu'),$this->getTexto('apellidosu'),
    $this->getTexto('sexou'),$this->getTexto('telefonou')
    ,$this->getTexto('correou'),$this->getTexto('nombreup'),
    $this->getTexto('claveu'),$imagenu);

    echo $this->verregente();
}
else{

    $this->_reg->editaregente($this->getTexto('idregen'),
    $this->getTexto('nombresu'),$this->getTexto('apellidosu'),$this->getTexto('sexou'),$this->getTexto('telefonou')
    ,$this->getTexto('correou'),$this->getTexto('nombreup'),$this->getTexto('claveu'));
    echo $this->verregente();
}

}
public function editareg2(){
    $this->_reg->editareg($this->getTexto('idr'),
    $this->getTexto('nombresu'),$this->getTexto('apellidosu'),$this->getTexto('sexou'),$this->getTexto('telefonou')
    ,$this->getTexto('correou'),$this->getTexto('nombreup'),$this->getTexto('claveu'));
}

public function borraregente(){
    $this->_reg->borrareg($this->getTexto('idreg'));
    echo $this->verregente();
}


}




?>