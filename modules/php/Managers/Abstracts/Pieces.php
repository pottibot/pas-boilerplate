<?php

namespace Gamename\Managers\ABS;

use Gamename\Game;
use Gamename\DB;

use Gamename\Entities\ABS\Piece;

abstract class Pieces extends Manager {

    protected static $entityClass = "Gamename\Entities\ABS\Piece";
    protected static $entityTable = 'piece';
    protected static $entityPrimary = 'piece_id';

    /////////////////////////////////////////////////////
    //// SETUP //////////////////////////////////////////

    /////////////////////////////////////////////////////
    //// GET BY PROPERTY ////////////////////////////////

    /////////////////////////////////////////////////////
    //// GET SINGLE /////////////////////////////////////

    public static function getAtPos($location,$position = NULL) {
        $primary = static::$entityPrimary;
        $table = static::$entityTable;

        $locationField = self::getField('location');
        $positionField = self::getField('position');

        return self::get(DB::getUnique("SELECT $primary FROM $table WHERE $locationField = '$location' AND $positionField = '$position'"));
    }

    /////////////////////////////////////////////////////
    //// GET MANY ///////////////////////////////////////
    
    public static function getOf($type,$value) {
        $primary = static::$entityPrimary;
        $table = static::$entityTable;

        $typeField = self::getField('type');
        $valueField = self::getField('value');

        $ids = DB::getValues("SELECT $primary FROM $table WHERE $locationField = '$location'".((is_null($position))?"":" AND $positionField = $position"));

        if (count($ids) == 1) {
            return self::get($ids);
        } else {
            $ret = [];

            foreach ($ids as $id) {
                $ret[] = self::get($id);
            }
        }
    }

    public static function getOfType($type) {
        self::getMany('type',$type);
    }

    public static function getOfValue($value) {
        self::getMany('value',$value);
    }

    public static function getAllIn($location) {
        self::getMany('location',$location);
    }
}