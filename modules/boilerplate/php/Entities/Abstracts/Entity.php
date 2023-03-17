<?php

namespace Boilerplate\Entities\Abstracts;

use Boilerplate\DB;

/**
 * Entity is whatever holds information in a game (a meeple and its position, a card and its effect, a tile and its state, ...)
 * When defining classes for your game elements, extend this class to have a set of features already integrated in them.
 * 
 * To construct a new entity pass the row of data returned after a query for a specific element (using the framework's functions)
 */
abstract class Entity extends \APP_DbObject implements \JsonSerializable {

    /////////////////////////////////////////////////////
    //// OBJECT ATTRIBUTES //////////////////////////////

    /**
     * the exact name of database table the entity references on the DB to store and retrieve its data
     */
    protected ?string $table = null;

    /**
     * the exact field name of the primary key of the referenced table
     */
    protected ?string $primary = null;

    /** 
     * array mapping the object attributes to the the database table fields.
     * 
     * example:
     * [
     *  'id' => 'entity_id',
     *  'type' => 'entity_type',
     *  ...
     * ]
     */
    protected static $attributes = [];

    /**
     * array flagging which of the class attributes represent the state of the object and thus can be rewritten
     */
    protected static $state_attributes = [];

    /**
     * when true, every new value assignment to an attribute of this class triggers an UPDATE query to the server to store the object data
     */
    protected static bool $autoSave = true;

    /////////////////////////////////////////////////////
    //// CONSTRUCTOR ////////////////////////////////////

    /**
     * constructor takes the db objected returned after a query for a specific element (using the framework's functions)
     * 
     * ['entity_id' => someid, 'entity_type' => sometype, ...]
     */
    public function __construct($db_obj) {

        foreach (static::getAttributes() as $attribute => $field) {
            $this->$attribute = $db_obj[$field] ?? null;
        }
    }

    /////////////////////////////////////////////////////
    //// MAGI SET & GET /////////////////////////////////

    /**
     * magic method which overrides arrow getter operator ($myEntity->$attr).
     * dynamically retrieve data and stores it. needed to avoid making objects to heavy but also avoid making too frequent calls to db.
     */ 
    public function __get($key) {

        $getter = "get".ucfirst($key); // fetch getter method

        if (is_null($this->key)) { // if attribute is null
            $this->$key = self::$getter(); // call getter and store its value
        }

        return $this->$key;
    }

    /**
     * magic method which overrides arrow setter operator ($myEntity->$attr = $newVal).
     * includes db autosave functionlity where if setted attribute is included in attributes array and autosave is true, a call is made to the db to update the object stored data.
     */
    public function __set($key, $value) {
        if ($key == $this->primary || in_array($key, static::getStateAttributes())) {
            throw new \Exception("Cannot modify value of primary or data attribute ($key)");
        } else {
            $this->$key = $value;

            if (self::$autoSave) $this->save(); // if autosave, write modification to db
        }
    }

    /////////////////////////////////////////////////////
    //// GENERIC GETTERS ////////////////////////////////

    /**
     * return db object primary key
     */
    public function getPrimaryValue() {
        foreach (static::getAttributes() as $attribute => $field) {
            if ($field == $this->primary) {
                return $this->$attribute;
            }
        }
    }

    /**
     * returns list of ALL entity attributes (included those of every ancestor up to the Entity class) unless param $class_specific is set to true (in which case only this class specific attributes list is returned)
     */
    public static function getAttributes($class_specific = false) {

        if (!$class_specific) {
            $attr = [];

            foreach (class_parents(static::class) as $parent) { // static refrences the class which triggered this code, meaning it could be a child class, which inherited this bit of code
                if (is_subclass_of($parent,self::class)) // self is kind of like "this" but for the class reference context (meaning it's going to reference this precise class which contains the code)
                    $attr = array_merge($attr,$parent::$attributes);
            }

            return array_merge($attr,static::$attributes);

        } else return static::$attributes;
    }

    /**
     * same as getAttributes but for the dataAttributes attribute
     */
    public static function getStateAttributes($class_specific = false) {

        if (!$class_specific) {
            $attr = [];

            foreach (class_parents(static::class) as $parent) {
                if (is_subclass_of($parent,self::class))
                    $attr = array_merge($attr,$parent::$state_attributes);
            }

            return array_merge($attr,static::$state_attributes);

        } else return static::$state_attributes;
    }
    
    ///////////////////////////////////////////////
    //// MISC /////////////////////////////////////

    /**
     * interface requirement to easly convert this class object in JSON object. returns assoc array containing entity data like so [attr => value]
     */
    public function jsonSerialize() {
        $data = [];
        foreach (static::getAttributes() as $attribute) {
            $data[$attribute] = $this->$attribute;
        }

        return $data;
    }

    /////////////////////////////////////////////////////
    //// AUTOSAVE ///////////////////////////////////////

    /**
     * sets autosave to true
     */
    public static function autosaveOn() {
        static::$autoSave = true;
    }

    /**
     * sets autosave to false
     */
    public static function autosaveOff() {
        static::$autoSave = false;
    }

    /**
     * save all db attributes to the db
     */
    public function save() {
        $table = $this->table;
        $primary = $this->primary;

        $id = null;
        $data = [];

        foreach (static::getAttributes() as $attribute => $field) {
            if ($field == $this->primary) {
                $id = $this->$attribute;
            } else {
                $data[] = $field ." = '". $this->$attribute ."'";
            }
        }

        $data = implode(', ',$data);

        DB::query("UPDATE $table SET $data WHERE $primary = $id");
    }
}