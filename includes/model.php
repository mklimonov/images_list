<?php

class Model{
    protected $db;
    
    public function __construct() {
        try{
            $this->db = new PDO('mysql:host=localhost;dbname=images', 'root', ''); //Registry::get('db');
        }  catch (Exception $ex){
            echo "Error: Could not connect. " . $e->getMessage();
        }
    }
}