<?php
require_once('DB.php');
require_once('Game.php');

class Players {

    // SETUP
    static public function setupNewGame($players, $options) {
        // TODO
    }

    // GET PLAYER
    static public function get($pid) {
        //return DB::getObject("SELECT * FROM player WHERE player_id = $pid");
        return new Player($pid);
    }

    // GET ACTIVE
    static public function getActiveId() {
        Game::get()->getActivePlayerId();
    }
    static public function getActive() {
        return self::get(self::getActiveId());
    }

    // GET CURRENT
    static public function getCurrentId() {
        Game::get()->getCurrentPlayerId();
    }
    static public function getCurrent() {
        return self::get(self::getCurrentId());
    }

    // GET NEXT (IN TURN ORDER)
    static public function getNextId() {
        $currId = self::getActive();
    }
    static public function getNext() {
        return self::get(self::getNextId());
    }

    // GET PREVIOUS (IN TURN ORDER)
    static public function getPrevId() {

    }
    static public function getPrev() {
        return self::get(self::getPrevId());
    }

    /* public function getMany($ids) {

    }

    public function getWhere($attribute, $value, $condition = 'equal') {

    }

    public function getAll() {

    }

    public function getUiData() {

    }

    public function count() {

    }

    public function activateNext() {

    }

    public function changeActive($id) {

    } */
}
