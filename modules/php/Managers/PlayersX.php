<?php

namespace Gamename\Managers;

use Gamename\Game;
use Gamename\DB;

use Gamename\Managers\Players;

use Gamename\Entities\PlayerX;

class PlayersX extends Players {
    protected static $entityClass = "Gamename\Entities\PlayerX";
    protected static $entityTable = 'player';
    protected static $entityPrimary = 'player_id';
}