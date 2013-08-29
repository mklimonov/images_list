<?php

class Autoload{
    public function __construct() {
    }
    
    public static function init() {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }
    
    public static function autoload($classname) {
        //equire_once(self::$path.'/'.$class);
        $file_name = strtolower($classname)  . '.php';
        $file = path_to_site . 'includes' . DIRECTORY_SEPARATOR . $file_name;
        if (!file_exists($file)){
            return false;
        }
        require_once $file; 
    }
}
/*
function __autoload($classname){
    $file_name = strtolower($classname)  . '.php';
    $file = path_to_site . 'includes' . DIRECTORY_SEPARATOR . $file_name;
    if (!file_exists($file)){
        return false;
    }
    require_once $file; 
}
*/
//$registry = new Registry;