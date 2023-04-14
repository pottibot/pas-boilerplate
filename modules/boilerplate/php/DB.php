<?php

namespace Boilerplate;

class DB extends \APP_DbObject {

    //////////////////////////////////////////
    // REMAP AND RENAME FRAMEWORK FUNCTIONS
    //////////////////////////////////////////
    #region

    public static function query($sql) {
        self::dbQuery($sql);
    }

    public static function getList($sql,$assoc = false) {
        if ($assoc)
            return self::getCollectionFromDb($sql);
        else
            return self::getObjectListFromDb($sql);
    }
    
    public static function getObject($sql) {
        return self::getObjectFromDb($sql);
    }

    public static function getValues($sql,$assoc = false) {
        if ($assoc)
            return self::getCollectionFromDb($sql, true);
        else
            return self::getObjectListFromDb($sql, true);
    }

    public static function getUnique($sql) {
        return self::getUniqueValueFromDb($sql);
    }

    #endregion
    //////////////////////////////////////////

    //////////////////////////////////////////
    // HELPER FUNCTIONS
    //////////////////////////////////////////
}