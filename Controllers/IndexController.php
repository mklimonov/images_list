<?php

class IndexController extends Controller{
   
    /*
    * Constructor
    */
    public function __construct() {
        $this->model = new IndexModel();
        $this->view = Registry::get('View');
    }
    
    public function indexAction() {
        try {
            $res = $this->model->getData();
            $this->view->render('index', array('images' => $res));
        } catch(PDOException $ex) {
            echo $ex->getMessage();
        }
    }
}
