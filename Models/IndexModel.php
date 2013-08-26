<?php

class IndexModel extends Model{
    public function getData(){
        $stmt = $this->db->query("SELECT img_name FROM images");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
