<?php

namespace Boilerplate;

use \pasboilerplate;
use \Boilerplate\Managers\BasePlayersManager;

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
    //// UTILITIES, HELPERS AND LOGGING /////////////////

    // -- logging on BGA logger -- //
    // (realtime logging mixed with BGA requests)
    public static function logTrace($message) {
        self::get()->trace(">> TRACE: $message <<");
    }

    public static function logDump($varName, $var, $asString = true) {
        if ($asString) $var = json_encode($var);
        self::get()->dump(">> VAR DUMP $varName: ",$var);
    }

    // -- logging on js console -- //
    // (requires notification setup and logs async after server request ends)
    public static function clog($message) {
        self::get()->notifyAllPlayers("log",$message,[]); // also log on chat log
    }

    public static function cdump($dump) {
        self::get()->notifyAllPlayers("dump","",['dump' => $dump]);
    }

    /////////////////////////////////////////////////////
    //// ACTIVE, CURRENT AND TURN ORDER /////////////////

    public static function getActive() {
        return self::get()->getActivePlayerId();
    }

    public static function getCurrent() {
        return self::get()->getCurrent(); // need to be exposed in gamename class
    }

    public static function getNext() {
        return BasePlayersManager::getNext();
    }

    public static function getPrev() {
        return BasePlayersManager::getPrev();
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