<?php

class Model{
    protected $db ;
    
    public function __construct() {
        $this->db = Registry::get('db');
    }
}