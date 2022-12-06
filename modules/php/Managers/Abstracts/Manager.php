<?php

namespace Gamename\Managers\ABS;

use Gamename\DB;
use Gamename\Entities\Player;

abstract class Manager {

    protected static $entityClass = null;
    protected static $entityTable = null;
    protected static $entityPrimary = null;

    abstract protected static function setupNewGame($players, $options);
    abstract protected static function getUiData();

    /////////////////////////////////////////////////////
    //// GET UNIQUE /////////////////////////////////////

    public static function get($id) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;

        return new static::$entityClass(DB::getObject("SELECT * FROM $table WHERE $primary = $id"));
    }

    public static function getIdBy($field, $value) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;

        return DB::getUnique("SELECT $primary FROM $table WHERE $field = $value");
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
            $ret[] = static::get($id);
        }

        return $ret;
    }

    public static function count() {
        return count(static::getAllIds());
    }

    public static function getMany($field, $condition = '=', $value) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;

        return new static::$entityClass(DB::getValues("SELECT * FROM $table WHERE $field $condition $value"));
    }
}