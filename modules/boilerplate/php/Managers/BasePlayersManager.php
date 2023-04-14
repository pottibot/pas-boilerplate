<?php
namespace Boilerplate\Managers;

require_once('modules/php/Managers/Abstracts/Manager.php');


use Boilerplate\Game;
use Boilerplate\DB;

use Boilerplate\Entities\BasePlayer;
use Boilerplate\Managers\Abstracts\Manager;

class BasePlayersManager extends Manager {

    protected static $entityClass = "Boilerplate\Entities\BasePlayer";
    protected static $entityTable = 'player';
    protected static $entityPrimary = 'player_id';

    /////////////////////////////////////////////////////
    //// SETUP //////////////////////////////////////////

    public static function setupNewGame($players, $options) {
        // TODO

        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = Game::get()->getGameinfos();
        $default_colors = $gameinfos['player_colors'];
 
        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player ) {
            $color = array_shift( $default_colors );
            $canal = $player['player_canal'];
            $name = addslashes($player['player_name']);
            $avatar = addslashes($player['player_avatar']);
            $values[] = "('$player_id','$color','$canal','$name','$avatar')";
        }
        $sql .= implode(',',$values);
        DB::query( $sql );

        Game::get()->reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        Game::get()->reloadPlayersBasicInfos();

        foreach ($players as $player_id => $player) {
            DB::query("UPDATE player SET player_turn_position = player_no");
        }
    }

    /////////////////////////////////////////////////////
    //// GET BY PROPERTY ////////////////////////////////
    
    // turn pos
    public static function getByTurnPos($p) {
        return self::get(self::getIdBy('turn_pos',$p));
    }

    // color
    public static function getByColor($c) {
        return self::get(self::getIdBy('color',$c));
    }

    /////////////////////////////////////////////////////
    //// GET SINGLE /////////////////////////////////////

    // get active player
    public static function getActive() {
        return self::get(Game::getActive());
    }

    // get current player (client sending request)
    public static function getCurrent() {
        return self::get(Game::getCurrent());
    }

    // get player after other player in turn order
    public static function getAfterPlayer($pid) {
        $act = self::get($pid);
        $n = self::count() + 1;
        $nexTurnPos = ($act->turn_pos + 1) % $n;
        if ($nexTurnPos == 0) $nexTurnPos = 1;

        return self::getByTurnPos($nexTurnPos);
    }

    // get player after active in turn order
    public static function getNext() {
        return self::getAfterPlayer(self::getActive());
    }

    // get player before other player in turn order
    public static function getBeforePlayer($pid) {
        $act = self::get($pid);
        $n = self::count() + 1;
        $prevTurnPos = ($act->turn_pos - 1 + $n) % $n;
        if ($prevTurnPos == 0) $prevTurnPos = 4;

        return self::getByTurnPos($prevTurnPos);
    }

    // get player before active in turn order
    public static function getPrev() {
        return self::getBeforePlayer(self::getActive());
    }
}
