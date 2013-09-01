<?php

abstract class Controller{
    protected $model;
    protected $view;

    abstract function indexAction();
}