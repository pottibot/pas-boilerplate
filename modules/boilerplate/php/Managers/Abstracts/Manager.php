<?php

namespace Boilerplate\Managers\Abstracts;

use Boilerplate\DB;
use Boilerplate\Entities\Abstracts\Entity;

abstract class Manager {

    protected static $entityClass = null;
    protected static $entityTable = null;
    protected static $entityPrimary = null;

    protected static $entities_staticData = null;

    abstract protected static function setupNewGame($players, $options);

    public static function getUiData() {
        $data = [];
        foreach (self::getAll() as $entity) {
            $data[$entity->getPrimaryValue()] = (array) json_decode(json_encode($entity)); // weird little conversion to transform object to array without introducing ugly stuff
        }

        return $data;
    }

    /////////////////////////////////////////////////////
    //// GET UNIQUE /////////////////////////////////////

    public static function get($id) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;

        return new static::$entityClass(DB::getObject("SELECT * FROM $table WHERE $primary = $id"));
    }

    public static function getIdBy($attr, $value) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;
        $field = static::$entityClass::getAttributes()[$attr];

        return DB::getUnique("SELECT $primary FROM $table WHERE $field = '$value'");
    }

    /////////////////////////////////////////////////////
    //// GET MULTIPLES //////////////////////////////////
    
    public static function getAllIds() {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;

        return DB::getValues("SELECT $primary FROM $table");
    }

    public static function getAll() {
        $ret = [];

        foreach (self::getAllIds() as $id) {
            $ret[] = self::get($id);
        }

        return $ret;
    }

    public static function count() {
        return count(static::getAllIds());
    }

    protected static function getField($entityAttr) {
        return static::$entityClass::getAttributes()[$entityAttr];
    }

    public static function getMany($attr, $value, $condition = '=') {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;
        $field = self::getField($attr);

        $entities = DB::getList("SELECT * FROM $table WHERE $field $condition '$value'");

        $ret = [];
        foreach ($entities as $row) {
            $ret[] = new static::$entityClass($row);
        }

        return $ret;
    }
}