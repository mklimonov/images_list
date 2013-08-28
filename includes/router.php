<?php

class Router{
    //private $registry;
    private $routes;
    private $request = array();
    //private $controller_name = 'Index';


    /* function __construct($registry) {
        $this->registry = $registry;
    }*/
    
    //Get controller and action name
    public function getRoute(){
        $this->request = array(
            'model' => 'IndexModel',
            'controller' => '',
            'action' => '',
            'params' => array()
        );
        
        $this->routes = explode('/', $_SERVER['REQUEST_URI']);
        //Check of existence is controller
        if (!empty($this->routes[1])){
            $controller_name = $this->routes[1];
            $controller_name = strtoupper(substr($controller_name, 0 , 1)) . substr($controller_name, 1);
            if (is_dir(path_to_site . 'Controllers')) {
                if (is_file(path_to_site . 'Controllers' . DIRECTORY_SEPARATOR . $controller_name . 'Controller.php')){
                    $this->request['controller'] = $controller_name . 'Controller';
                    //var_dump($this->request['controller']);
                }
                else{
                    //$this->request['controller'] = 'IndexController';
                    Router::ErrorPage();
                }
            }
            if (is_dir(path_to_site . 'Models')) {
                if (is_file(path_to_site . 'Models' . DIRECTORY_SEPARATOR . $controller_name . 'Model.php')){
                    $this->request['model'] = $controller_name . 'Model';
                    //var_dump($this->request['model']);
                }
                else{
                    Router::ErrorPage();
                }
            }
        }
        else {
            $this->request['controller'] = 'IndexController';
        }
        
        //Check of existence is action
        if (!empty($this->routes[2])){
            $this->request['action'] = $this->routes[2] . 'Action';
        }
        else {
            $this->request['action'] = 'indexAction';
        }
        
        if (!empty($this->routes[3])){
            $this->request['param'] = $this->routes[3];
        }
    }
    
    /**
     * Get the controller name (after calling getRoute())
     * @return  string  Controller name
     */
   /* public function getController() {
        return $this->request['controller'];
        //return $this->controller_name;
    }*/

    /**
     * Get the action name (after calling getRoute())
     * @return  string  Action name
     */
  /*  public function getAction() {
        return $this->request['action'];
    }
    */
    public function loader(){
        $this->getRoute();
        if ($this->request['model']){
            require path_to_site . 'Models' . DIRECTORY_SEPARATOR . $this->request['model'] . '.php';
        }
        if ($this->request['controller']){
            require path_to_site . 'Controllers' . DIRECTORY_SEPARATOR . $this->request['controller'] . '.php';

            $controller = new $this->request['controller'];//($this->registry);

            if (method_exists($controller, $this->request['action'])){
                $action = $this->request['action'];
                if (isset($this->request['param'])){
                    $controller->$action($this->request['param']);
                }
                else {
                    $controller->$action();
                }
            }
            else {
                Router::ErrorPage();
            }
        }

    }
    
    public function ErrorPage(){
        echo 'Page Not Found';
        //header('Location: ' . $url, true, $httpStatus);
    }
    
    public function redirect($url){
        header("Location: " . $url);
    }
}