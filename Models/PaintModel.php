<?php

class PaintModel extends Model{
    public function setdata($data){
        //$db = Registry::get('db');
        $stmt = $this->db->prepare("INSERT INTO images(img_name, password, created) VALUES(:img_name, :password, :created)");
        $stmt->execute(array(
            ':img_name' => $data['img_name'],
            ':password' => $data['password'],
            ':created' =>  $data['created'],
            ));
        //$affected_rows = $stmt->rowCount();
        /*$result = $db->exec("INSERT INTO pictures(pic_name, password, created)
           VAULES(
                {$data['pic_name']},
                {$data['password']},
                {$data['created']}
           )");
        $insertId = $db->lastInsertId();   */
    }
    
    public function getData(){ //public function getData($id = NULL, $pass = NULL, $img_name = NULL){
        $stmt = $this->db->query("SELECT * FROM images");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getImage($id = NULL) {
        if($id){
             $stmt = $this->db->prepare("SELECT * FROM topics WHERE id=:id");
             $stmt->bindParam(":id", $id, PDO::PARAM_INT);
             $stmt->execute(array(':id' => $id));
             return $stmt->execute()->fetch(PDO::FETCH_ASSOC);
        } 
        else {
             $sql = "SELECT * FROM images ORDER BY created DESC";
             return $this->db->query($sql);
        }
}
    
    /*public function checkPass($id){
        $stmt = $this->db->query("SELECT password FROM images where id={$id}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getFilename($id){
        $stmt = $this->db->query("SELECT img_name FROM images where id={$id}");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }*/
    
    public function delData($id){
        if($id){
            $this->db->query("DELETE FROM images WHERE id = {$id}");
        }
        //$stmt = $this->db->query("DELETE FROM images WHERE id = {$id}");
    }
}
