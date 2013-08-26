<?php

abstract class Controller{
    /*
     * @registry object
     */
    /*protected $registry;
    
    function __construct($registry) {
        $this->registry = $registry;
    }*/

    abstract function indexAction();
}