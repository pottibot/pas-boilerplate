<?php

namespace Gamename\Entities\ABS;

abstract class Piece extends Entity {

    protected $table = 'piece';
    protected $primary = 'piece_id';

    protected static $attributes = [
        'id' => 'piece_id',
        'type' => 'piece_type',
        'variant' => 'piece_variant',
        'location' => 'piece_location',
        'state' => 'piece_state',
    ];

    public function __construct($db_obj) {

        foreach ($attributes as &$field) {
            $field = str_replace('piece',static::$table,$field);
        } unset($field);

        parent::__construct($db_object);
    }
}