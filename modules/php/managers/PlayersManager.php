<?php
namespace Gamename\Managers;

require_once('modules/php/Managers/BasePlayersManager.php');


use Boilerplate\Game;
use Boilerplate\DB;

use Boilerplate\Managers\BasePlayersManager;

class PlayersManager extends BasePlayersManager {

    protected static $entityClass = "Boilerplate\Entities\BasePlayer";
    protected static $entityTable = 'player';
    protected static $entityPrimary = 'player_id';

    /////////////////////////////////////////////////////
    //// SETUP //////////////////////////////////////////

    public static function setupNewGame($players, $options) {
    }

    /////////////////////////////////////////////////////
    //// GET BY PROPERTY ////////////////////////////////

    /////////////////////////////////////////////////////
    //// GET SINGLE /////////////////////////////////////
}
