<?php
namespace Gamename\Entities;

require_once('modules/boilerplate/php/Entities/BasePlayer.php');
use Boilerplate\Entities\BasePlayer;

class Player extends BasePlayer {

    protected $table = 'player';
    protected $primary = 'player_id';

    protected static $attributes = [
    ];

    protected static $data_attributes = [];

}