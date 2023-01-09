/////////////////////////
/// -- DOJO DEFINE -- ///
/////////////////////////
define([
    "dojo", "dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
], function (dojo, declare) {
    return declare("bgagame.pasboilerplate", ebg.core.gamegui, new Pasboilerplate());
});
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * ----- *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-ignore
GameGui = /** @class */ (function () {
    function GameGui() { }
    return GameGui;
})();
// format HTML string into element and append it as last child of parentEl. returns the formatted element itself
function placeLast(HTMLstring, parentEl) {
    parentEl.insertAdjacentHTML('beforeend', HTMLstring);
    return parentEl.lastElementChild;
}
var Pasboilerplate = /** @class */ (function (_super) {
    __extends(Pasboilerplate, _super);
    // GLOBALS DEF
    //private myGlobalValue: any;
    ///////////////////
    /// -- SETUP -- ///
    ///////////////////
    //#region
    function Pasboilerplate() {
        var _this = _super.call(this) || this;
        console.log('pasboilerplate constructed!');
        return _this;
        // GLOBALS INIT
        //this.myGlobalValue= 0;
    }
    Pasboilerplate.prototype.setup = function (gamedatas) {
        console.log("Starting game setup");
        // Setting up player boards
        for (var player_id in gamedatas.players) {
            var player = gamedatas.players[player_id];
            // TODO: Setting up players boards if needed
        }
        // TODO: Set up your game interface here, according to "gamedatas"
        // Setup game notifications to handle (see "setupNotifications" method below)
        this.setupNotifications();
        this.setupPreferencePanel();
        this.initPreferenceObserver();
        console.log("Ending game setup");
    };
    //#endregion
    //////////////////////////
    /// -- MISC UTILITY -- ///
    //////////////////////////
    //#region
    /* @Override */
    Pasboilerplate.prototype.onScreenWidthChange = function () {
    };
    /* @Override */
    Pasboilerplate.prototype.updatePlayerOrdering = function () {
        this.inherited(arguments);
        console.log("Updating Player ordering");
        $('player_boards').insertAdjacentElement('afterbegin', $('preferences_panel'));
    };
    /* @Override */
    Pasboilerplate.prototype.format_string_recursive = function (log, args) {
        try {
            if (log && args && !args.processed) {
            }
        }
        catch (e) {
            console.error(log, args, "Exception thrown", e.stack);
        }
        return this.inherited(arguments);
    };
    Pasboilerplate.prototype.initPreferenceObserver = function () {
        var _this = this;
        // DEFINE LISTENER FOR PREFERENCES CHANGES
        document.querySelectorAll('.preference_control').forEach(function (prefControl) {
            prefControl.onchange = function (evt) {
                var match = evt.target.id.match(/^preference_[cf]ontrol_(\d+)$/);
                if (!match) {
                    return;
                }
                var pref = match[1];
                var newValue;
                if (typeof evt.target.checked !== 'undefined') {
                    newValue = evt.target.checked ? '1' : '2';
                }
                else {
                    newValue = evt.target.value;
                }
                _this.prefs[pref].value = newValue;
                _this.onPreferenceChange(pref, newValue);
            };
        });
        // FIRE EVENTS TO TRIGGER CHANGES A FIRST TIME
        document.querySelectorAll("#ingame_menu_content .preference_control").forEach(function (el) {
            // Create a new 'change' event
            var event = new CustomEvent('change');
            // Dispatch it.
            el.dispatchEvent(event);
        });
    };
    Pasboilerplate.prototype.onPreferenceChange = function (prefId, prefValue) {
        if (parseInt(prefId) >= 200 || parseInt(prefId) < 100)
            return;
        console.log("Preference changed", prefId, prefValue);
        var prefEl = $("preference_option_".concat(prefId));
        var prefInput = document.querySelector("#preference_option_".concat(prefId, " .preference_input"));
        if (prefEl.classList.contains('preference_toggle')) {
            prefInput.checked = prefValue == '1';
        }
        else {
            prefInput.value = prefValue;
        }
        switch (prefId) {
            default:
                break;
        }
    };
    Pasboilerplate.prototype.updatePreference = function (prefId, newValue) {
        console.log("Updating preference", prefId, newValue);
        // Select preference value in control:
        document.querySelectorAll('#preference_control_' + prefId + ' > option[value="' + newValue + '"], #preference_fontrol_' + prefId + ' > option[value="' + newValue + '"]')
            .forEach(function (el) { return el.selected = true; });
        // Generate change event on control to trigger callbacks:
        var newEvt = new Event('change');
        $('preference_control_' + prefId).dispatchEvent(newEvt);
    };
    Pasboilerplate.prototype.setupPreferencePanel = function () {
        var _this = this;
        // set handler for preference menu arrow
        var settings_panel = $('preferences_panel');
        var menu_arrow = $('menu_arrow');
        var settings_options = $('preferences_panel_options');
        menu_arrow.onclick = function () {
            settings_panel.style.height = 'auto';
            if (menu_arrow.classList.contains('open')) {
                //debug
                console.log('Closing preference panel');
                menu_arrow.classList.remove('open');
                settings_options.style.height = '0px';
            }
            else {
                //debug
                console.log('Opening preference panel');
                menu_arrow.classList.add('open');
                settings_options.style.height = 'fit-content';
                var h = settings_options.offsetHeight;
                settings_options.style.height = '0px';
                settings_options.offsetHeight;
                settings_options.style.height = h + 'px';
            }
        };
        console.log("Setup preference panel");
        console.log("User preferences: ", this.prefs);
        var _loop_1 = function (prefId) {
            var pref = this_1.prefs[prefId];
            if (parseInt(prefId) >= 200 || parseInt(prefId) < 100)
                return "continue";
            if (Object.values(pref.values).length == 2) { // preference is toggle (could be improved, not all binary options are on/off
                placeLast(this_1.format_block('toggle_pref', {
                    id: prefId,
                    lable: _(pref.name)
                }), $('preferences_panel_options'));
            }
            else { // preference is selection
                var options = '';
                for (var prefOpt in pref.values) {
                    options += this_1.format_block('selection_pref_option', {
                        id: prefOpt,
                        name: _(pref.values[prefOpt].name)
                    });
                }
                placeLast(this_1.format_block('selection_pref', {
                    id: prefId,
                    lable: _(pref.name),
                    options: options
                }), $('preferences_panel_options'));
            }
            var prefInput = document.querySelector("#preference_option_".concat(prefId, " .preference_input"));
            console.log(prefInput);
            prefInput.onchange = function () {
                if (Object.values(pref.values).length == 2) {
                    _this.updatePreference(prefId, prefInput.checked ? '1' : '2');
                }
                else {
                    _this.updatePreference(prefId, prefInput.value);
                }
            };
        };
        var this_1 = this;
        // parse user preference from server, add options to menu and attach onchange handler
        for (var prefId in this.prefs) {
            _loop_1(prefId);
        }
    };
    //#endregion
    /////////////////////////
    /// -- GAME STATES -- ///
    /////////////////////////
    //#region
    Pasboilerplate.prototype.onEnteringState = function (stateName, args) {
        console.log('Entering state: ' + stateName);
        switch (stateName) {
            case 'dummmy':
                break;
        }
    };
    Pasboilerplate.prototype.onLeavingState = function (stateName) {
        console.log('Leaving state: ' + stateName);
        switch (stateName) {
            case 'dummmy':
                break;
        }
    };
    Pasboilerplate.prototype.onUpdateActionButtons = function (stateName, args) {
        console.log('onUpdateActionButtons: ' + stateName);
        if (this.isCurrentPlayerActive()) {
            switch (stateName) {
            }
        }
    };
    //#endregion
    //////////////////////////
    /// -- GAME UTILITY -- ///
    //////////////////////////
    //#region
    //#endregion
    /////////////////////////////
    /// -- ACTION HANDLERS -- ///
    /////////////////////////////
    //#region
    //#endregion
    ///////////////////////////
    /// -- NOTIFICATIONS -- ///
    ///////////////////////////
    // #region
    Pasboilerplate.prototype.setupNotifications = function () {
        console.log('notifications subscriptions setup');
        // TODO: here, associate your game notifications with local methods
        // Example 1: standard notification handling
        //dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
        // Example 2: standard notification handling + tell the user interface to wait
        //            during 3 seconds after calling the method in order to let the players
        //            see what is happening in the game.
        // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
        // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
        dojo.subscribe('dump', this, "notif_dump");
        dojo.subscribe('log', this, "notif_log");
    };
    Pasboilerplate.prototype.notif_log = function (notif) {
        console.log('LOGGING!');
        console.log(notif.log);
    };
    Pasboilerplate.prototype.notif_dump = function (notif) {
        console.log('DUMPING!');
        console.log(notif.args.dump);
    };
    return Pasboilerplate;
}(GameGui));
