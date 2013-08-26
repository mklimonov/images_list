<?php
//namespace test_task;

error_reporting(E_ALL);

//Check php version
if (version_compare(phpversion(), '5.3', '<')) {
    die('Required PHP 5.');
}

// Path to site's files
//$path_to_site = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
//$path_to_site = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR; 
$path_to_site = dirname(__FILE__) . DIRECTORY_SEPARATOR; 

define('path_to_site', $path_to_site);

require_once 'includes/init.php';

//Connect with db
$db = new PDO('mysql:host=localhost;dbname=images', 'root', '');
Registry::set('db', $db);
//$registry->db = $db;

//Create routes
//$registry->router = new Router($registry);
Registry::set('router', new Router);
//$router->loader();

//Create View
//$registry->view = new View($registry);
Registry::set('View', new View);


Registry::get('router')->loader();

//$registry->router->loader();





