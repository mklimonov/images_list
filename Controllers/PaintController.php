<?php

class PaintController extends Controller{
    private $model;
    
    public function __construct() {
        $this->model = new PaintModel();
    }


    public function indexAction() {
        Registry::get('View')->show('Paint', 'index');
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
        
        
        //$paintmodel = new PaintModel();
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
        
        
        
        // 1. generate filename = time()
        // 2. Save in db
        // 3. Password
          
      /*  $based64Image=substr($_POST['data'], strpos($_POST['data'], ',')+1);
        $image = imagecreatefromstring(base64_decode($based64Image));
        $fileName='';
        if($image != false) {
            $fileName=time().'.png';
            if(!imagepng($image, $fileName)) {
                //          fail;
            }
        }
        else {
            //          fail;
        }*/
        return TRUE;
    }
    
    public function delAction($id){ //$_POST['password']
        try {
            //$paintmodel->setdata($data);
            $res = $this->model->checkPass($id);
            if ($password === $res['password']){
                $filename = getFilename($id);
                unlink(path_to_site . $filename['img_name']);
                $this->model->deldata($id);
            }
            
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
}