<?php

class IndexController extends Controller{
    public function indexAction() {
        $model = new IndexModel();
        $view = Registry::get('View');
        $res = $model->getData();
        
        
        $view->images = $res;
        $view->setLayout('layout.php');
        //Registry::get('View')->show('Index', 'index');
        $view->render();
        
        
        //Registry::get('View')->welcome = 'Hello! Im front page';
        //Registry::get('View')->show('Index', 'index');
    }
}
