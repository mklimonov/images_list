<?php

class IndexController extends Controller{
    public function indexAction() {
        $model = new IndexModel();
        $res = $model->getData();
        
        Registry::get('View')->images = $res;
        Registry::get('View')->show('Index', 'index');
        
        
        //Registry::get('View')->welcome = 'Hello! Im front page';
        //Registry::get('View')->show('Index', 'index');
    }
}
