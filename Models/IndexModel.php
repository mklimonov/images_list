<?php

class IndexModel extends Model{
    public function getData(){
        $stmt = $this->db->query("SELECT * FROM images");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
