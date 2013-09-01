<?php
//namespace test_task;

error_reporting(E_ALL);

//Check php version
if (version_compare(phpversion(), '5.3', '<')) {
    die('Required PHP 5.3');
}

// Path to site's files
$path_to_site = dirname(__FILE__) . DIRECTORY_SEPARATOR; 

define('path_to_site', $path_to_site);

require_once 'includes/autoloader.php';
include 'includes/Twig/Autoloader.php';

Autoload::init();

//Create routes
Registry::set('router', new Router);

//Create View
Registry::set('View', new View);

//Start router
Registry::get('router')->loader();





