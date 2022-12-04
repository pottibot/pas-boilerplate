<?php

namespace Entities;

use Entities\ABS\Entity;

class Player extends Entity {

    protected $table = 'player';
    protected $primary = 'player_id';

    protected $attributes = [
        'id' => 'player_id',
        'name' => 'player_name',
        'color' => 'player_color',
        'turn_pos' => 'player_turn_position',
        'score' => 'player_score',
        'scoreAux' => 'player_score_aux',
        'zombie' => 'playe_zombie'
    ];

    public $id;
    public $name;
    public $color;
    public $turnPos;
    public $score;
    public $scoreAux;
    public $zombie;


}