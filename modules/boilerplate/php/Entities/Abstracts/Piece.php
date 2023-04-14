<?php
namespace Boilerplate\Entities\Abstracts;

require_once('modules/boilerplate/php/Entities/Abstracts/Entity.php');

abstract class Piece extends Entity {

    protected $table; // = 'piece';
    protected $primary; // = 'piece_id';

    protected static $attributes = [
        // 'id' => 'piece_id',
        // 'type' => 'piece_type', // color, suit, ...
        // 'value' => 'piece_value', // shape, value, ...
        // 'location' => 'piece_location', // hand_id,  bag, deck_n, table, ...
        // 'position' => 'piece_position', // slot_n, col_n, ...
        // 'state' => 'piece_state', // active, used, blocked, ...
    ];

    public $id;
    public $type;
    public $value;
    public $location;
    public $position;
    public $state;

    protected static $data_attributes = ['type','value'];
}