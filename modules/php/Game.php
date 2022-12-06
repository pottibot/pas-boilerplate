<?php

namespace Gamename;

use \pasboilerplate;

class Game {

    // SETUP
    
    public static function setup($players) {
    }

    /////////////////////////////////////////////////////
    //// GET INSTANCE (to expose game methods) //////////

    public static function get() {
        return pasboilerplate::get();
    }

    /////////////////////////////////////////////////////
    //// ACTIVE, CURRENT AND TURN ORDER /////////////////

    public static function getActive() {
        return self::get()->getActivePlayerId();
    }

    public static function getCurrent() {
        return self::get()->getCurrentPlayerId();
    }

    public static function getNext() {
        return Players::getNext();
    }

    public static function getPrev() {
        return Players::getPrev();
    }

    public static function activatePlayer($pid) {
        self::get()->gamestate->changeActivePlayer($pid);
    }

    public static function activateNext() {
        self::get()->gamestate->changeActivePlayer(self::getNext());
    }

    /////////////////////////////////////////////////////
    //// GAME STATE /////////////////////////////////////


}