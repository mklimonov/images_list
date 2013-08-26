<?php

//namespace includes;

/*class Registry {
    private $vars = array();
       
    /**
     * Retrieve a variable from the store
     * @param   string  $name   Key variable stored under
     * @return  mixed|null  Null if key not found
     */
 /*   public function __get($name) {
        // Check key exists
        if (!array_key_exists($name, $this->vars)) {
            return null;
        }

        return $this->vars[$name];
    }

    /**
     * Store a variable
     * @param   string  $name   Key to store under
     * @param   mixed   $value  Value to store
     */
 /*   public function __set($name, $value) {
        // Simply store the value, overwriting any previous value
        $this->vars[$name] = $value;
    }
}*/







class Registry{ //implements ArrayAccess{
    private static $vars = array();
    
    //protected function __construct() {}

    public static function set($key, $value){
        if (isset(self::$vars[$key])) {
            throw new Exception('This '. $key .' is already exists');
        }
        self::$vars[$key] = $value;
        return true;
    }
    
    public static function get($key){
        return isset(self::$vars[$key]) ? self::$vars[$key] : null;
    }
    
    public static function remove($key){
        if (!isset(self::$vars[$key])) {
            throw new Exception('This '. $key .' is not found');
        }
        unset(self::$vars[$key]);
        return true;
    }
    
 /*   public function offsetSet($key, $value) {
        if ($key){
            $this->vars[$key] = $value;
        }
    }
    public function offsetExists($key) {
        return isset($this->vars[$key]);
    }
    public function offsetUnset($key) {
        unset($this->vars[$key]);
    }
    public function offsetGet($key) {
        return isset($this->vars[$key]) ? $this->vars[$key] : null;
    }*/
}