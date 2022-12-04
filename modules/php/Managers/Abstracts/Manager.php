<?php

namespace Managers\ABS;

use DB;

abstract class Manager {

    protected static $entityClass = null;
    protected static $entityTable = null;
    protected static $entityPrimary = null;

    abstract protected static function setupNewGame($players, $options);
    abstract protected static function getUiData();

    public static function get($id) {
        $table = static::$entityTable;
        $primary = static::$entityPrimary;
        
        // dinamic calling of static $entityClass not working
        return new static::$entityClass(DB::getObject("SELECT * FROM $table WHERE $primary = $id"));
    }

    public static function getEntityClass() {
        return static::$entityClass;
    }
}