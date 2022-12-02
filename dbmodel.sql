
-- ------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

ALTER TABLE `player`
ADD `player_turn_position` TINYINT UNSIGNED NOT NULL,

-- CREATE TABLE IF NOT EXISTS `piece` (
--   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `type` varchar(16) NOT NULL,
--   `type_alt` varchar(16) NOT NULL,
--   `location` varchar(16) NOT NULL,
--   `state` varchar(16) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;