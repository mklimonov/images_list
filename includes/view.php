<?php

class View{
    private $vars = array();
    
    /*
     * @registry object
     */
 /*   private $registry;
        
    function __construct($registry) { 
        $this->registry = $registry;
    }*/
    
    
    /**
     * Store a variable
     * @param   string  $name   Key to store under
     * @param   mixed   $value  Value to store
     */
    public function __set($name, $value) {
        // Simply store the value, overwriting any previous value
        $this->vars[$name] = $value;
    }
    
    public function show($controller_name, $view){ //, $data = null)
    //{
        /*
        if(is_array($data)) {
            // преобразуем элементы массива в переменные
            extract($data);
        }
        */
        if ($controller_name != 'Index'){
            $path = path_to_site. 'Views'. DIRECTORY_SEPARATOR . $controller_name . DIRECTORY_SEPARATOR .  $view . '.php';
        }
        else{
            $path = path_to_site. 'Views'. DIRECTORY_SEPARATOR . $view . '.php';
        }
        
        if (!file_exists($path)){
            throw new Exception('Template not found' . $path);
            return false;
        }
        
        // Load variables
	foreach ($this->vars as $key => $value) {
            $$key = $value;
	}
        
       require $path;
    }
}
