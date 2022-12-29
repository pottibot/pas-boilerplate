<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

require_once 'modules/php/constants.inc.php';

// VARIANTS
$game_options = [
    
    // note: game variant ID should start at 100 (ie: 100, 101, 102, ...). The maximum is 199.
    /* OPTION_1 => [
        // variant name
        'name' => totranslate(''),

        // variant options
        // if options are only 2 and named on-off, enabled-disabled, yes-no, option will be displayed as checkbox instead of selector
        'values' => [ 
            1 => [
                'name' => totranslate(''), // option name
                'tmdisplay' => totranslate(''), // option descriptive name (for tables display)
                'description' => totranslate(''), // full table description (for lobby display)
                'alpha' => true, // this option is in alpha version right now (there will be a warning, and starting the game will be allowed only in training mode except for the developer)
                'beta' => true, // this option is in beta version right now (there will be a warning)
                'nobeginner' => true, // this option is not recommended for beginners
                'firstgameonly' => true,  // this option is recommended only for the first game (discovery option)
            ],
        ],

        'default' => 1,

        // 'level' => 'major' // can only be one; displayed with specific UI to highlight it (can also have image)
        'level' => 'base', // default
        // 'level' => 'additional' // displayed hidden below all other variants

        // do not display this option unless these conditions are met
        'displaycondition' => [
            [
                // 'type' => 'minplayers', // variant option selection is displayed if players number is at LEST what specified in value. 'id' value ignored
                // 'type' => 'maxplayers', // variant option selection is displayed if players number is at MAX what specified in value. 'id' value ignored
                'type' => 'otheroption', // variant option selection is displayed if specified variant (id) below is set to specified option (value) below
                // 'type' => 'otheroptionisnot', // same as above, inverted
                'id' => 100, // game specific option defined in the same array above OR hardcoded framework options (ELO OFF => (201, 1))
                'value' => [2, 3, 4]
            ],

            // [
            //     ...
            // ],
        ],

        'notdisplayedmessage' => totranslate('Variant option available only if ...'), // message to display instead of options selection (if variant should not be displayed)

        // do not start game unless these conditions are met
        'startcondition' => [
            [
                'type' => 'maxplayers',
                'value' => 3,
                'message' => totranslate('This option is available for 3 players maximum.'), // display error message
                'gamestartonly' => true, // true = check only on gamestart, false = don't allow player to even select this combination
            ],

            // [
            //     ...
            // ],
        ],
    ], */
];

// PREFERENCES
$game_preferences = [
    
    PREF_1 => [
        'name' => clienttranslate('Toggle preference'),
        'values' => [
            1 => ['name' => clienttranslate('On')],
            2 => ['name' => clienttranslate('Off')],
        ],
        'default' => 1
    ],

    PREF_2 => [
        'name' => clienttranslate('Selection preference'),
        'values' => [
            1 => ['name' => clienttranslate('Opt A')],
            2 => ['name' => clienttranslate('Opt B')],
            3 => ['name' => clienttranslate('Opt C')],
        ],
        'default' => 1
    ],
];