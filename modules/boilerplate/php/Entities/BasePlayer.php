<?php
namespace Boilerplate\Entities;

require_once('modules/boilerplate/php/Entities/Abstracts/Entity.php');
use Boilerplate\Entities\Abstracts\Entity;

/**
 * class used to represent players as object. this one mirrors the base db player object for any game.
 * it gets useful once the player class is structured to contain any method which manipulate data tied to one player
 */
class BasePlayer extends Entity {

    protected $table = 'player';
    protected $primary = 'player_id';

    protected static $attributes = [
        'id' => 'player_id',
        'name' => 'player_name',
        'color' => 'player_color',
        'turn_pos' => 'player_turn_position',
        'score' => 'player_score',
        'score_aux' => 'player_score_aux',
    ];

    protected static $state_attributes = ['turn_pos','score','score_aux'];

    protected $id;
    protected $name;
    protected $color;
    protected $turn_pos;
    protected $score;
    protected $score_aux;

    /**
     * returns color name (option to get it translated) given its hex rgb value
     */
    static public function getColorName($colorValue, $translation = false) {
        switch ($colorValue) {
            case 'ff0000': return ($translation)? clienttranslate("red") : "red"; break;
            case '008000': return ($translation)? clienttranslate("green") : "green"; break;
            case '0000ff': return ($translation)? clienttranslate("blue") : "blue"; break;
            case 'ffa500': return ($translation)? clienttranslate("yellow") : "yellow"; break;
            case '000000': return ($translation)? clienttranslate("black") : "black"; break;
            case 'ffffff': return ($translation)? clienttranslate("white") : "white"; break;
            case 'e94190': return ($translation)? clienttranslate("pink") : "pink"; break;
            case '982fff': return ($translation)? clienttranslate("purple") : "purple"; break;
            case '72c3b1': return ($translation)? clienttranslate("cyan") : "cyan"; break;
            case 'f07f16': return ($translation)? clienttranslate("orange") : "orange"; break;
            case 'bdd002': return ($translation)? clienttranslate("khaki green") : "khaki green"; break;
            case '7b7b7b': return ($translation)? clienttranslate("gray") : "gray"; break;
            default: throw new \Exception("invalid color");
        }
    }
}