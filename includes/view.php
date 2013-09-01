<?php

class View {
    private $twig;
    
    /*
     * Constructor
     * Loading twig
     */
    function __construct(){
        Twig_Autoloader::register();
        $tpl_path = path_to_site . 'Views';
        $loader = new Twig_Loader_Filesystem($tpl_path);
        $this->twig = new Twig_Environment($loader);
    }

    /*
     * Loading template and rendering him
     */
    public function render($name, $data){
        try {
            $template = $this->twig->loadTemplate($name . '.html.twig');
            echo $template->render ($data);
        } catch (Exception $e) {
            die ('ERROR: ' . $e->getMessage());
        }
    }
}