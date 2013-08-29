<?php

class PaintController extends Controller{
    /*private $model;
    private $view;*/

    public function __construct() {
        $this->model = new PaintModel();
        $this->view = Registry::get('View');
        //$this->view->setLayout('layout.php');
    }


    public function indexAction() {
        //Registry::get('View')->show('Paint', 'index');
        //Registry::get('View')->show();
        //Registry::get('View')->show('Index', 'index');
        //$this->view->render();
        
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
            //$paintmodel->setdata($data);
            $this->model->setdata($data);
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
        
        return TRUE;
    }
    
    public function delAction(){ //$_POST['password']
        try {
            if(isset($_POST['id'])){
                if (isset($_POST['password'])){
                    $res = $this->model->getImage($_POST['id']);
                    if ($_POST['password'] === $res[0]['password']){
                        unlink(path_to_site . $res[0]['img_name']);
                        $this->model->delImage($_POST['id']);
                        echo 'Deleted';
                    } else {
                        echo 'Passwotd not correct';
                    }
                    
                }
            }
            else{
                throw new Exception('not id');
            }
            
            //Registry::get('router')->redirect('/');
            
            //$paintmodel->setdata($data);
            /*$res = $this->model->checkPass($id);
            if ($password === $res['password']){
                $filename = getFilename($id);
                unlink(path_to_site . $filename['img_name']);
                $this->model->deldata($id);
            }*/
            
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
}