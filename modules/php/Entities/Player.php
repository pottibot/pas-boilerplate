<?php

namespace Gamename\Entities;

use Gamename\Entities\ABS\Entity;

class Player extends Entity {

    protected $table = 'player';
    protected $primary = 'player_id';

    protected $attributes = [
        'id' => 'player_id',
        'name' => 'player_name',
        'color' => 'player_color',
        'turn_pos' => 'player_turn_position',
        'score' => 'player_score',
        'score_aux' => 'player_score_aux',
        'zombie' => 'playe_zombie'
    ];

    public $id;
    public $name;
    public $color;
    public $turn_pos;
    public $score;
    public $scoreAux;
    public $zombie;


}