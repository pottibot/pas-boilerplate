<?php
 /**
  *------
  * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
  * pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
  * 
  * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
  * See http://en.boardgamearena.com/#!doc/Studio for more information.
  * -----
  * 
  * pasboilerplate.game.php
  *
  * This is the main file for your game logic.
  *
  * In this PHP file, you are going to defines the rules of the game.
  *
  */


require_once( APP_GAMEMODULE_PATH.'module/table/table.game.php' );

/////////////////////////////////////
/// -- REQUIRE AND USE MODULES -- ///
/////////////////////////////////////
#region

// require base modules
require_once('modules/php/DB.php');
require_once('modules/php/Game.php');

use Gamename\Game;
use Gamename\DB;

// require entity modules
require_once('modules/php/Entities/Abstracts/Entity.php');

require_once('modules/php/Entities/Player.php');
use Gamename\Entities\Player;


// require manager modules
require_once('modules/php/Managers/Abstracts/Manager.php');

require_once('modules/php/Managers/Players.php');
use Gamename\Managers\Players;


// test modules
require_once('modules/php/Entities/PlayerX.php');
require_once('modules/php/Managers/PlayersX.php');

use Gamename\Entities\PlayerX;
use Gamename\Managers\PlayersX;
//

#endregion
/////////////////////////////////////

class pasboilerplate extends Table {

    ///////////////////
    /// -- SETUP -- ///
    ///////////////////
    #region

    public static $instance = null; // class member to expose instance to access its methods from outside

	function __construct() {

        parent::__construct();

        self::$instance = $this;
        
        self::initGameStateLabels( array( 
            //    "my_first_global_variable" => 10,
            //    "my_second_global_variable" => 11,
            //      ...
            //    "my_first_game_variant" => 100,
            //    "my_second_game_variant" => 101,
            //      ...
        ) );        
	}

    // get class instance to access dynamic methods;
    public static function get() {
      return self::$instance;
    }
	
    protected function getGameName() {
        return "pasboilerplate";
    }	

    protected function setupNewGame($players, $options = []) {

        Players::setupNewGame($players, $options);

        $this->activeNextPlayer();
    }

    protected function getAllDatas() {
        $data = [];
    
        // return only informations visible by this current player (client sending page load request to server)
        $currPlayer = self::getCurrentPlayerId();
        
        $sql = "SELECT player_id id, player_score score FROM player ";
        
        $data['players'] = Players::getUiData();
  
        return $data;
    }

    function getGameProgression() {
        return 0;
    }

    #endregion
    ///////////////////


    /////////////////////
    /// -- UTILITY -- ///
    /////////////////////
    #region

    function test() {
        Game::cdump(Players::getUiData());
    }

    #endregion
    /////////////////////


    ////////////////////////////
    /// -- PLAYER ACTIONS -- ///
    ////////////////////////////
    #region
    #endregion
    ////////////////////////////

    
    /////////////////////////////
    /// -- STATE ARGUMENTS -- ///
    /////////////////////////////
    #region
    #endregion
    /////////////////////////////


    ///////////////////////////
    /// -- STATE ACTIONS -- ///
    ///////////////////////////
    #region
    #endregion
    ///////////////////////////


    /////////////////////////
    /// -- ZOMBIE TURN -- ///
    /////////////////////////
    #region

    function zombieTurn($state, $active_player) {
    	$statename = $state['name'];
    	
        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState( "zombiePass" );
                	break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive( $active_player, '' );
            
            return;
        }

        throw new feException( "Zombie mode not supported at this game state: ".$statename );
    }

    #endregion
    /////////////////////////
    
    /////////////////////////
    /// -- DB UPGRADES -- ///
    /////////////////////////
    #region
    #endregion
    /////////////////////////
    
    function upgradeTableDb($from_version) {

        // if ($from_version <= 1404301345) { 
        //     $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
        //     self::applyDbUpgradeToAllDB( $sql );
        // }

    }    
}
