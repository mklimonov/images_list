<?php

//namespace test_task\includes;

function __autoload($classname){
    $file_name = strtolower($classname)  . '.php';
    $file = path_to_site . 'includes' . DIRECTORY_SEPARATOR . $file_name;
    if (!file_exists($file)){
        return false;
    }
    require_once $file; 
}

//$registry = new Registry;