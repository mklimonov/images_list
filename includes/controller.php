<?php

abstract class Controller{
    protected $model;
    protected $view;
    /*
     * @registry object
     */
    /*protected $registry;
    
    function __construct($registry) {
        $this->registry = $registry;
    }*/

    abstract function indexAction();
}