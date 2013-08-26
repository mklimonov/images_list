<?php

class PaintController extends Controller{
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
        
        $paintmodel = new PaintModel();
        $data = array(
            'img_name' => $filename,
            'password' => '123',
            'created' => date("Y-m-d H:i:s")
            );
        try {
            $paintmodel->setdata($data);
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
    }
}