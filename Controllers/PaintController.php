<?php

class PaintController extends Controller{

   /*
    * Constructor
    */
    public function __construct() {
        $this->model = new PaintModel();
        $this->view = Registry::get('View');
    }


    public function indexAction() {        
        $this->view->render('Paint/index', array());
    }
    
    public function saveAction(){
        if (isset($_POST['data'])){
            // Init dataURL variable
            $dataURL = $_POST["data"];  
            // Extract base64 data (Get rid from the MIME & Data Type)
            $parts = explode(',', $dataURL);  
            $data = $parts[1];  
            // Decode Base64 data
            $data = base64_decode($data);  
            // Save data as an image
            $filename = 'images/' . time() . '.png';
            $fp = fopen($filename, 'w');  
            fwrite($fp, $data);  
            fclose($fp); 
        }
         if (isset($_POST['password'])){
            $password = $_POST['password'];
        }
        
        $data = array(
            'img_name' => $filename,
            'password' => $password,
            'created' => date("Y-m-d H:i:s")
            );
        try {
            $this->model->setdata($data);
            echo 'Image saved';
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
    
    public function updateAction(){
        if (isset($_POST['data'])){
            // Init dataURL variable
            $dataURL = $_POST["data"];  
            // Extract base64 data (Get rid from the MIME & Data Type)
            $parts = explode(',', $dataURL);  
            $data = $parts[1];  
            // Decode Base64 data
            $data = base64_decode($data);  
            // Save data as an image
            $filename = strchr($_POST['name'], 'i');
            $fp = fopen($filename, 'w');  
            fwrite($fp, $data);  
            fclose($fp); 
            echo 'Image updated';
        }        
    }
    
    public function check_passAction(){ 
        try {
            if(isset($_POST['id'])){
                if (isset($_POST['password'])){
                    $res = $this->model->getImage($_POST['id']);
                    if ($_POST['password'] === $res[0]['password']){
                       echo 'true';
                    } else {
                        echo 'Wrong Password';
                    }
                }
            }
            else{
                throw new Exception('Could not edit image becouse id not found');
            }
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
    
    public function editAction(){ //скрытая форма
        try {
            if(isset($_POST['id'])){
              //  if (isset($_POST['password'])){
                    $res = $this->model->getImage($_POST['id']);
                //    if ($_POST['password'] === $res[0]['password']){
                        $this->view->render('Paint/edit', array('src' => $res[0]['img_name']));
                        //Registry::get('router')->redirect('paint/edit');
                  //  } else {
                    //    echo 'Wrong Password';
                    //}
               // }
            }
            else{
                throw new Exception('Could not edit image becouse id not found');
            }    
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }

    public function delAction(){ 
        try {
            if(isset($_POST['id'])){
                if (isset($_POST['password'])){
                    $res = $this->model->getImage($_POST['id']);
                    if ($_POST['password'] === $res[0]['password']){
                        unlink(path_to_site . $res[0]['img_name']);
                        $this->model->delImage($_POST['id']);
                        echo 'Image removed';
                    } else {
                        echo 'Wrong Password';
                    }
                }
            }
            else{
                throw new Exception('Could not remove image becouse id not found');
            }
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
}