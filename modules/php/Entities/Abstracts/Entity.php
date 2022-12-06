<?php

namespace Gamename\Entities\ABS;

use Gamename\DB;

abstract class Entity extends \APP_DbObject implements \JsonSerializable {

    protected $table = null;
    protected $primary = null;

    // array mapping entity attributes with db oject fields
    protected $attributes = [
        // 'id' => 'player_id',
        // 'name' => 'player_name',
        // 'color' => 'player_color',
        // ...
    ];

    // private $id;
    // private $name;
    // private $color;

    public function __construct($db_obj) {

        foreach ($this->attributes as $attribute => $field) {
            $this->$attribute = $db_obj[$field] ?? null;
        }
    }

    // return db object primary key
    public function getPrimaryValue() {
        foreach ($this->attributes as $attribute => $field) {
            if ($field == $this->primary) {
                return $this->$attribute;
            }
        }
    
        return null;
    }

    // return assoc array containing entity data ('attr' => 'value')
    public function jsonSerialize() {
        $data = [];
        foreach ($this->attributes as $attribute => $field) {
            $data[$attribute] = $this->$attribute;
        }

        return $data;
    }

    public function update() {
        $table = $this->table;
        $primary = $this->primary;

        $id = null;
        $data = [];

        foreach ($this->attributes as $attribute => $field) {
            if ($field == $this->primary) {
                $id = $this->$attribute;
            } else {
                $data[] = $field ." = ". $this->$attribute;
            }
        }

        $data = implode(', ');

        DB::query("UPDATE $table SET $data WHERE $primary = $id");
    }
}