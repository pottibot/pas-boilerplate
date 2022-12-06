<?php

namespace Gamename\Managers;

use Gamename\Game;
use Gamename\DB;

use Gamename\Entities\Player;
use Gamename\Managers\ABS\Manager;

class Players extends Manager {

    protected static $entityClass = "Gamename\Entities\Player";
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
        $sql .= implode( $values, ',' );
        DB::query( $sql );

        Game::get()->reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        Game::get()->reloadPlayersBasicInfos();
    }

    public static function getUiData() {
        // TODO
    }

    /////////////////////////////////////////////////////
    //// GET BY PROPERTY ////////////////////////////////
    
    // turn pos
    public static function getByTurnPos($p) {
        return self::getIdBy('turn_pos',$p);
    }

    // color
    public static function getByColor($c) {
        return self::getIdBy('color',$p);
    }

    /////////////////////////////////////////////////////
    //// GET SINGLE /////////////////////////////////////

    // get active player
    public static function getActive() {
        return Game::getActive();
    }

    // get current player (client sending request)
    public static function getCurrent() {
        return Game::getCurrent();
    }

    // get player after other player in turn order
    public static function getAfterPlayer($pid) {
        $act = self::get($pid);
        $nexTurnPos = max(1, ($act->id + 1) % self::count());

        return self::getByTurnPos($nexTurnPos);
    }

    // get player after active in turn order
    public static function getNext() {
        return self::getAfterPlayer(self::getActive());
    }

    // get player before other player in turn order
    public static function getBeforePlayer($pid) {
        $act = self::get($pid);
        $nexTurnPos = max(1, ($act->id - 1) % self::count());

        return self::getByTurnPos($nexTurnPos);
    }

    // get player before active in turn order
    public static function getPrev() {
        return self::getBeforePlayer(self::getActive());
    }

    /////////////////////////////////////////////////////
    //// UTILITY ////////////////////////////////////////

    static public function getColorText($colorValue, $translation = false) {
        if ($translation) {
            switch ($colorValue) {
                case 'ff0000': return clienttranslate("red"); break;
                case '008000': return clienttranslate("green"); break;
                case '0000ff': return clienttranslate("blue"); break;
                case 'ffa500': return clienttranslate("yellow"); break;
                case '000000': return clienttranslate("black"); break;
                case 'ffffff': return clienttranslate("white"); break;
                case 'e94190': return clienttranslate("pink"); break;
                case '982fff': return clienttranslate("purple"); break;
                case '72c3b1': return clienttranslate("cyan"); break;
                case 'f07f16': return clienttranslate("orange"); break;
                case 'bdd002': return clienttranslate("khaki green"); break;
                case '7b7b7b': return clienttranslate("gray"); break;
            } 
        } else{
            switch ($colorValue) {
                case 'ff0000': return "red"; break;
                case '008000': return "green"; break;
                case '0000ff': return "blue"; break;
                case 'ffa500': return "yellow"; break;
                case '000000': return "black"; break;
                case 'ffffff': return "white"; break;
                case 'e94190': return "pink"; break;
                case '982fff': return "purple"; break;
                case '72c3b1': return "cyan"; break;
                case 'f07f16': return "orange"; break;
                case 'bdd002': return "khaki green"; break;
                case '7b7b7b': return "gray"; break;
            } 
        }
        
    }
}
