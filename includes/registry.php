<?php

/*
 * Variable registry
 */
class Registry{
    /*
     * Variable array
     * @var array
     */
    private static $vars = array();
    
    /*
     * Store a variable
     * @param   string  $key   Key to store under
     * @param   mixed   $value  Value to store
     */
    public static function set($key, $value){
        if (isset(self::$vars[$key])) {
            throw new Exception('This '. $key .' is already exists');
        }
        self::$vars[$key] = $value;
        return true;
    }
    
    /*
     * Retrieve a variable from the store
     * @param   string  $key   Key variable stored under
     * @return  variable|null  Null if key not found
     */
    public static function get($key){
        return isset(self::$vars[$key]) ? self::$vars[$key] : null;
    }
    
    /*
     * Remove a variable from the store
     * @param   string  $key   Key variable stored under
     * @return  true  
     */
    public static function remove($key){
        if (!isset(self::$vars[$key])) {
            throw new Exception('This '. $key .' is not found');
        }
        unset(self::$vars[$key]);
        return true;
    }
}