<?php

namespace Gamename\Entities\ABS;

abstract class Piece extends Entity {

    protected $table = 'piece';
    protected $primary = 'piece_id';

    protected static $attributes = [
        'id' => 'piece_id',
        'type' => 'piece_type', // color, suit, ...
        'value' => 'piece_value', // shape, value, ...
        'location' => 'piece_location', // hand_id,  bag, deck_n, table, ...
        'position' => 'piece_position', // slot_n, col_n, ...
        'state' => 'piece_state', // active, used, blocked, ...
        'data' => 'piece_data', // additional data: token on cards, increasing cost, special effects ...
    ];

    protected static $immutableAttributes = ['id','type','value'];
}