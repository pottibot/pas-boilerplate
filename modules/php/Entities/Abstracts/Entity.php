<?php

namespace Gamename\Entities\ABS;

use Gamename\DB;

abstract class Entity extends \APP_DbObject implements \JsonSerializable {

    protected $table = null;
    protected $primary = null;

    // array mapping entity attributes with db oject fields
    protected static $attributes = [
        // 'id' => 'player_id',
        // 'name' => 'player_name',
        // 'color' => 'player_color',
        // ...
    ];

    // private $id;
    // private $name;
    // private $color;

    public function __construct($db_obj) {

        foreach (static::getAttributes() as $attribute => $field) {
            $this->$attribute = $db_obj[$field] ?? null;
        }
    }

    public function __get($key) {
        return $this->$key;
    }

    // return db object primary key
    public function getPrimaryValue() {
        foreach (static::getAttributes() as $attribute => $field) {
            if ($field == $this->primary) {
                return $this->$attribute;
            }
        }
    
        return null;
    }

    public static function getAttributes($class_specific = false) {

        if (!$class_specific) {
            $attr = [];

            foreach (class_parents(static::class) as $parent) {
                if (is_subclass_of($parent,self::class))
                    $attr = array_merge($attr,$parent::$attributes);
            }

            return array_merge($attr,static::$attributes);

        } else return static::$attributes;
    }

    public static function getProperties() {
        return array_keys(static::getAttributes());
    }

    // return assoc array containing entity data ('attr' => 'value')
    public function jsonSerialize() {
        $data = [];
        foreach (static::getAttributes() as $attribute => $field) {
            $data[$attribute] = $this->$attribute;
        }

        return $data;
    }

    public function update() {
        $table = $this->table;
        $primary = $this->primary;

        $id = null;
        $data = [];

        foreach (static::getAttributes() as $attribute => $field) {
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