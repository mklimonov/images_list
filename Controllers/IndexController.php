<?php

class IndexController extends Controller{
    /*private $model;
    private $view;*/
    
    public function __construct() {
        $this->model = new IndexModel();
        $this->view = Registry::get('View');
        //$this->view->setLayout('layout.php');
    }
    
    public function indexAction() {
        //$model = new IndexModel();
        //$view = Registry::get('View');
        $res = $this->model->getData();
        
        
        /*$view->images = $res;
        $view->setLayout('layout.php');
        //Registry::get('View')->show('Index', 'index');
        $view->render();
        */
       $this->view->render('index', array('images' => $res));
        
        //Registry::get('View')->welcome = 'Hello! Im front page';
        //Registry::get('View')->show('Index', 'index');
    }
}
