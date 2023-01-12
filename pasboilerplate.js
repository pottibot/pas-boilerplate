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
////////////////////////////////////////
// HELPERS THAT EXTENDS JS CAPABILITIES
/**
 * Format HTML string into HTML element and appends it to parent HTML element.
 * returns the formatted element itself
*/
function placeLast(HTMLstring, parentEl) {
    parentEl.insertAdjacentHTML('beforeend', HTMLstring);
    return parentEl.lastElementChild;
}
function getElementPropertyValue(element, property) {
    return element.ownerDocument.defaultView.getComputedStyle(element).getPropertyValue(property);
}
/**
 * Assign multiple CSS style properties to HTML element via object declaration type.
 * Param 'clear' resets element style entirely.
*/
function assignStyle(element, style, clear) {
    if (clear === void 0) { clear = false; }
    if (clear)
        element.style.cssText = '';
    Object.assign(element.style, style);
    element.offsetHeight; // force event loop to stop, assign properties and render object with modifications
}
/**
 * Returns final HTML element position relative to document.
*/
function getElementGlobalPosition(element) {
    var pos = element.getBoundingClientRect();
    return {
        x: pos.x,
        y: pos.y
    };
}
/**
 * Returns HTML element size after all transforms.
*/
function getElementRenderSize(element) {
    var size = element.getBoundingClientRect();
    return {
        width: size.width,
        height: size.height
    };
}
function getElementParentsSince(element, ancestor) {
    if (ancestor === void 0) { ancestor = null; }
    var parents = [];
    while (element.parentElement && element.parentElement != ancestor) {
        parents.push(element.parentElement);
        element = element.parentElement;
    }
    return parents;
}
function getCommonAncestor(el1, el2) {
    var el1Parents = getElementParentsSince(el1);
    var el2Parents = getElementParentsSince(el2);
    for (var _i = 0, el1Parents_1 = el1Parents; _i < el1Parents_1.length; _i++) {
        var parent_1 = el1Parents_1[_i];
        if (el2Parents.includes(parent_1)) {
            return parent_1;
        }
    }
    return null;
}
/**
 * Returns transform string representing combination of transforms needed to replicate the exact final transform state of element, relative to target (it's difficult to explain).
 * Robust to scale transforms only (because of its commutative property)
*/
function getCommonFinalTransform(element, target) {
    var transform = '';
    getElementParentsSince(element, getCommonAncestor(element, target)).forEach(function (parent) {
        var parentTransform = getElementPropertyValue(parent, 'transform');
        if (parentTransform != 'none')
            transform += parentTransform;
    });
    return transform;
}
////////////////////
//////////////////////////////
// HELPERS THAT EXTENDS ELEMENT MANIPOLATION ON BGA ENVIROMENT
// TODO: move everything inside game class, "this" is needed sometimes. also these methods make sense only inside the Game context
// TODO: convert optional params in tisaac style config object
// place element inside target element (if append, otherwise on temp oversurface used for moving elements) at absolute cordinates (x,y) relative to parent element top-left corner
// throws warn if target or surface are absolutely positioned, as element positioning would be thus affected.
function placeElement(element, target, surface) {
    if (surface === void 0) { surface = null; }
    surface = surface || $('game_play_area');
    var surfacePos = surface.getBoundingClientRect();
    var targetPos = target.getBoundingClientRect();
    /* if (getElementPropertyValue(surface,'position') == 'absolute' || (append && getElementPropertyValue(target,'position') == 'absolute')) {
        console.warn("Target or surface element is absolutely positioned, element position might be affected");
    } */
    log('moving element', element);
    log('to target', target, targetPos);
    log('on moving surface', surface, surfacePos);
    element.style.position = 'absolute';
    if (element.parentElement != surface) {
        surface.append(element);
    }
    assignStyle(element, {
        left: (targetPos.left - surfacePos.left) + 'px',
        top: (targetPos.top - surfacePos.top) + 'px',
    });
}
function slideElement(element, target, duration, delay, append, surface) {
    if (duration === void 0) { duration = 0; }
    if (delay === void 0) { delay = 0; }
    if (append === void 0) { append = false; }
    if (surface === void 0) { surface = null; }
    surface = surface || $('game_play_area');
    if (element.parentElement != surface)
        this.placeElement(element, element);
    /* if (this.instantaneousMode) {
        duration = 0;
        delay = 0;
    } */
    element.style.transition = "all ".concat(duration, "ms ").concat(delay, "ms ease-in-out");
    element.offsetHeight; // force render
    placeElement(element, target, surface);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            element.style.transition = '';
            if (append) {
                target.append(element);
                assignStyle(element, {}, true);
            }
            resolve(element);
        }, duration + delay);
    });
}
// test variables
var a = $('a');
var b = $('b');
var c = $('c');
var animConfig = {
    duration: 10000,
    delay: 0,
    pos: { x: 0, y: 0 },
    append: true,
    beforeSibling: null,
    phantomIn: true,
    phantomOut: true,
    slideSurface: 'default',
    className: 'moving',
    adaptScale: true
};
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
// GameGui declaration copyed from elaskavaia bga-dojoless project https://github.com/elaskavaia/bga-dojoless
// not sure what it does, except it makes program assume "this" as GameGui object, whitch grants access to its properties and methods without needing to use (this as any) to escape TypeScript constraints
// @ts-ignore
GameGui = /** @class */ (function () {
    function GameGui() { }
    return GameGui;
})();
var isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
var log = isDebug ? console.log.bind(window.console) : function () { };
var Pasboilerplate = /** @class */ (function (_super) {
    __extends(Pasboilerplate, _super);
    ///////////////////
    /// -- SETUP -- ///
    ///////////////////
    //#region
    function Pasboilerplate() {
        var _this = _super.call(this) || this;
        // GLOBALS DEF
        _this.defaultSlideAnimation = {
            duration: 500,
            delay: 0,
            pos: { x: 0, y: 0 },
            append: true,
            beforeSibling: null,
            phantomIn: true,
            phantomOut: true,
            slideSurface: 'default',
            className: 'moving',
            adaptScale: false
        };
        _this.defaultSlidingSurface = 'game_play_area';
        _this.animationsSpeed = 1;
        console.log('pasboilerplate constructed!');
        return _this;
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
        if (this.instantaneousMode)
            this.animationsSpeed = 0;
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
    Pasboilerplate.prototype.takeAction = function (action, data) {
        if (!gameui.checkAction(action))
            return;
        data = data || {};
        data.lock = true;
        return new Promise(function (resolve, reject) {
            gameui.ajaxcall("/" + gameui.game_name + "/" + gameui.game_name + "/" + action + ".html", data, //
            gameui, function (data) { return resolve(data); }, function (isError) {
                if (isError)
                    reject(data);
            });
        });
    };
    Pasboilerplate.prototype.placeOnElement = function (element, target, surface, position, center) {
        if (center === void 0) { center = true; }
        surface = surface || $(this.defaultSlidingSurface);
        // temporarily remove transform to make positioning scale invariant
        var transform = element.style.transform;
        element.style.transform = '';
        var targetPos = getElementGlobalPosition(target);
        var surfacePos = getElementGlobalPosition(surface);
        var targetSize = getElementRenderSize(target);
        var elementSize = getElementRenderSize(element);
        // set transform again
        element.style.transform = transform;
        console.log(targetPos);
        console.log(surfacePos);
        console.log(targetSize);
        console.log(elementSize);
        var centeringOffset = {
            x: center ? (targetSize.width / 2 - elementSize.width / 2) : 0,
            y: center ? (targetSize.height / 2 - elementSize.height / 2) : 0,
        };
        position = position || { x: 0, y: 0 };
        if (element.parentElement != surface)
            surface.append(element);
        assignStyle(element, {
            position: 'absolute',
            left: (targetPos.x - surfacePos.x + centeringOffset.x + position.x) + 'px',
            top: (targetPos.y - surfacePos.y + centeringOffset.y + position.y) + 'px',
        });
    };
    Pasboilerplate.prototype.slideOnElement = function (element, target, duration, delay, surface, position, toScale, center) {
        if (delay === void 0) { delay = 0; }
        if (toScale === void 0) { toScale = 1; }
        if (center === void 0) { center = true; }
        surface = surface || $(this.defaultSlidingSurface);
        duration *= this.animationsSpeed;
        delay *= this.animationsSpeed;
        console.log(duration);
        this.placeOnElement(element, element);
        assignStyle(element, {
            transition: "all ".concat(duration, "ms ").concat(delay, "ms ease-in-out")
        });
        console.log('scaling', element.style.transform, toScale);
        if (toScale != 1)
            element.style.transform += "scale(".concat(toScale, ")");
        this.placeOnElement(element, target, surface, position, center);
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                element.style.transition = '';
                console.log('sliding completed');
                resolve();
            }, duration + delay);
        });
    };
    Pasboilerplate.prototype.slideElementAnim = function (element, target, options) {
        var _this = this;
        var config = Object.assign(this.defaultSlideAnimation, options);
        // get surface
        var surface;
        switch (config.slideSurface) {
            case 'default':
                surface = $(this.defaultSlidingSurface);
                break;
            case 'parent':
                surface = element.parentElement;
                break;
            case 'common_ancestor': // TODO
                break;
            default:
                surface = $(config.slideSurface);
                break;
        }
        // check if beforeSibling, if set, exists
        if (config.append && config.beforeSibling) {
            if (!target.querySelector('#' + config.beforeSibling)) {
                console.error("Sibling ".concat(config.beforeSibling, " is not a child of Target"));
            }
        }
        // calc adapt scale
        var toScale = 1;
        var fromScale = getCommonFinalTransform(element, target);
        if (config.adaptScale) {
            var scaleDetector = element.cloneNode(true);
            assignStyle(scaleDetector, {
                position: 'absolute',
                visibility: 'hidden'
            });
            target.append(scaleDetector);
            toScale = getElementRenderSize(scaleDetector).width / getElementRenderSize(element).width;
            scaleDetector.remove();
        }
        // setup phantoms
        // phantom in element destination
        var phin_el;
        if (config.phantomIn) {
            // create phantom
            phin_el = element.cloneNode(true);
            // append phantom in target
            if (config.beforeSibling) {
                $(config.beforeSibling).before(phin_el);
            }
            else {
                target.append(phin_el);
            }
            assignStyle(phin_el, {
                visibility: 'hidden',
                width: '0px',
                height: '0px',
            });
            // separation between assignment blocks needed to be sure transition is set
            // [!] phantom animation will work only if element has already set static width and height values
            // setup phantom properties
            assignStyle(phin_el, {
                transitionProperty: 'width, height',
                transition: "".concat(config.duration * this.animationsSpeed * 0.4, "ms ").concat(config.delay * this.animationsSpeed, "ms ease-in-out")
            });
            // trigger animation and make phantom appear, taking space for the arrival of element
            assignStyle(phin_el, {
                width: element.style.width,
                height: element.style.height
            });
        }
        // phantom replacing element on previous location  
        if (config.phantomOut) {
            // create phantom
            var phout_el_1 = element.cloneNode(true);
            // swap position with element and place element on surface
            element.after(phout_el_1);
            surface.append(element);
            // position it on its phantom copy, so that it will start animation from its original position
            this.placeOnElement(element, phout_el_1);
            phout_el_1.id = ''; // clear id of phantom to avoid interferance
            assignStyle(phout_el_1, {
                visibility: 'hidden',
            });
            // setup phantom properties
            assignStyle(phout_el_1, {
                transitionProperty: 'width, height',
                transition: "".concat(config.duration * this.animationsSpeed * 0.4, "ms ").concat(config.delay * this.animationsSpeed, "ms ease-in-out"),
            });
            phout_el_1.ontransitionend = function () { phout_el_1.remove(); };
            // trigger animation and make phantom disappear, freeing space for the departing element 
            assignStyle(phout_el_1, {
                width: '0px',
                height: '0px'
            });
        }
        // before animation start, set scale to sliding element
        if (toScale != 1) {
            this.placeOnElement(element, element);
            element.style.transform = fromScale;
        }
        // add class for sliding state
        element.classList.add(config.className);
        // set promise
        return new Promise(function (resolve, reject) {
            // slide element
            _this.slideOnElement(element, (config.phantomIn) ? phin_el : target, config.duration, config.delay, surface, config.pos, toScale, !config.phantomIn)
                .then(function () {
                // remove class for sliding state
                element.classList.remove(config.className);
                // append if
                if (config.phantomIn) {
                    phin_el.replaceWith(element);
                }
                else if (config.append) {
                    if (config.beforeSibling) {
                        $(config.beforeSibling).before(element);
                    }
                    else {
                        target.append(element);
                    }
                }
                assignStyle(element, {}, true);
                resolve();
            });
        });
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
