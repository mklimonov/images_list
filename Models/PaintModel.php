<?php

class PaintModel extends Model{
    /*
     * Insert data in db
     */
    public function setdata($data){
        $stmt = $this->db->prepare("INSERT INTO images(img_name, password, created) VALUES(:img_name, :password, :created)");
        $stmt->execute(array(
            ':img_name' => $data['img_name'],
            ':password' => $data['password'],
            ':created' =>  $data['created'],
            ));
    }
    
    /*public function getData(){
        $stmt = $this->db->query("SELECT * FROM images");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }*/
    
    /*
     * Get data from db
     * @param image's id
     */
    public function getImage($id = NULL) {
        if($id){
             $stmt = $this->db->prepare("SELECT * FROM images WHERE id=:id");
             $stmt->bindParam(":id", $id, PDO::PARAM_INT);
             $stmt->execute();
             return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
        else {
             $sql = "SELECT * FROM images ORDER BY created DESC";
             return $this->db->query($sql);
        }
    }
    
    /*
     * Remove image
     */
    public function delImage($id){
        if($id){
            $stmt = $this->db->prepare("DELETE FROM images WHERE id=:id");
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
        }
    }
}
