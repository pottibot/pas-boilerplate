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

    protected static $immutableAttributes = [
        // 'id' => 'player_id',
        // 'name' => 'player_name',
        // 'color' => 'player_color',
        //// 'avatar' => 'player_avatar',
        // ...
    ];

    protected static $autoSave = false;

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

    public function __set($key, $value) {
        if (in_array($key, static::getImmutableAttributes())) {
            throw new \Exception("Cannot modify value of immutable Entity property ($key)");
        } else {
            $this->$key = $value;

            if (self::$autoSave) $this->save();
        }
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

    public static function getImmutableAttributes($class_specific = false) {

        if (!$class_specific) {
            $attr = [];

            foreach (class_parents(static::class) as $parent) {
                if (is_subclass_of($parent,self::class))
                    $attr = array_merge($attr,$parent::$immutableAttributes);
            }

            return array_merge($attr,static::$immutableAttributes);

        } else return static::$immutableAttributes;
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

    public function autosaveOn() {
        static::$autoSave = true;
    }

    public function autosaveOff() {
        static::$autoSave = false;
    }

    // save attributes changes to the DB
    public function save() {
        $table = $this->table;
        $primary = $this->primary;

        $id = null;
        $data = [];

        foreach (static::getAttributes() as $attribute => $field) {
            if ($field == $this->primary) {
                $id = $this->$attribute;
            } else {
                $data[] = $field ." = '". $this->$attribute ."'"; // IS SIMPLE QUOTES ENOUGH TO CAPTURE STRING VALUES? WON'T IT CAUSE TROUBLE WITH CASTING FROM INT
            }
        }

        $data = implode(', ',$data);

        DB::query("UPDATE $table SET $data WHERE $primary = $id");
    }
}