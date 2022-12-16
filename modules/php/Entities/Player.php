<?php

namespace Gamename\Entities;

use Gamename\Entities\ABS\Entity;

class Player extends Entity {

    protected $table = 'player';
    protected $primary = 'player_id';

    protected static $attributes = [
        'id' => 'player_id',
        'name' => 'player_name',
        'color' => 'player_color',
        'turn_pos' => 'player_turn_position',
        'score' => 'player_score',
        'score_aux' => 'player_score_aux',
        'zombie' => 'player_zombie'
    ];

    protected static $immutableAttributes = ['id','name','color'];

    protected $id;
    protected $name;
    protected $color;
    protected $turn_pos;
    protected $score;
    protected $score_aux;
    protected $zombie;



}