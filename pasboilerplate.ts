/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * ----- *
 */

// GameGui declaration copyed from elaskavaia bga-dojoless project https://github.com/elaskavaia/bga-dojoless
// not sure what it does, except it makes program assume "this" as GameGui object, whitch grants access to its properties and methods without needing to use (this as any) to escape TypeScript constraints
// @ts-ignore
GameGui = /** @class */ (function () {
    function GameGui() {}
    return GameGui;
})();

const isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
const log = isDebug ? console.log.bind(window.console) : function () { };

class Pasboilerplate extends GameGui {

    // GLOBALS DEF
    private defaultSlideAnimation: SlideAnimationConfig = {
        duration: 500,
        delay: 0,
        pos: {x:0, y:0},
        append: true,
        beforeSibling: null,
        phantomIn: true,
        phantomOut: true,
        slideSurface: 'default',
        className: 'moving',
        adaptScale: false
    }

    private defaultSlidingSurface = 'game_play_area';
    private animationsSpeed = 1;

    ///////////////////
    /// -- SETUP -- ///
    ///////////////////
    //#region

    constructor() {
        super();

        console.log('pasboilerplate constructed!');
    }
      
    public setup(gamedatas: pasboilerplateGamedatas) {
        console.log( "Starting game setup" );
        
        // Setting up player boards
        for (let player_id in gamedatas.players ) {
            const player = gamedatas.players[player_id];
                        
            // TODO: Setting up players boards if needed
        }
        
        // TODO: Set up your game interface here, according to "gamedatas"

        // Setup game notifications to handle (see "setupNotifications" method below)
        this.setupNotifications();

        this.setupPreferencePanel();
        this.initPreferenceObserver();

        if (this.instantaneousMode) this.animationsSpeed = 0;

        console.log( "Ending game setup" );
    }
    
    //#endregion

    //////////////////////////
    /// -- MISC UTILITY -- ///
    //////////////////////////
    //#region

    /* @Override */
    public onScreenWidthChange() {
    }

    /* @Override */
    public updatePlayerOrdering() {
        this.inherited(arguments);

        console.log("Updating Player ordering");
        
        $('player_boards').insertAdjacentElement('afterbegin',$('preferences_panel'));
    }

    /* @Override */
    public format_string_recursive(log: string, args: any) {
        try {
            if (log && args && !args.processed) {
                
            }
        } catch (e) {
            console.error(log,args,"Exception thrown", e.stack);
        }
        return this.inherited(arguments);
    }

    private initPreferenceObserver() {

        // DEFINE LISTENER FOR PREFERENCES CHANGES
        document.querySelectorAll('.preference_control').forEach((prefControl: any) => {
            prefControl.onchange = (evt: any) => {
                const match = evt.target.id.match(/^preference_[cf]ontrol_(\d+)$/);
                if (!match) {
                    return;
                }
                const pref = match[1];
                let newValue;

                if (typeof evt.target.checked !== 'undefined') {
                    newValue = evt.target.checked? '1':'2';
                } else {
                    newValue = evt.target.value;
                }
                
                this.prefs[pref].value = newValue;
                this.onPreferenceChange(pref, newValue);
            }
        });

        // FIRE EVENTS TO TRIGGER CHANGES A FIRST TIME
        document.querySelectorAll("#ingame_menu_content .preference_control").forEach((el: HTMLElement) => {
            // Create a new 'change' event
            let event = new CustomEvent('change');

            // Dispatch it.
            el.dispatchEvent(event);
        });
    }

    private onPreferenceChange(prefId: string, prefValue: string) {
        if (parseInt(prefId) >= 200 || parseInt(prefId) < 100) return;

        console.log("Preference changed", prefId, prefValue);

        let prefEl = $(`preference_option_${prefId}`);
        let prefInput: any = document.querySelector(`#preference_option_${prefId} .preference_input`);

        if (prefEl.classList.contains('preference_toggle')) {
            prefInput.checked = prefValue == '1';
        } else {
            prefInput.value = prefValue;
        }
        
        switch (prefId) {        
            default:
                break;
        }
    }

    private updatePreference(prefId: string, newValue: string) {
        console.log("Updating preference", prefId, newValue);

        // Select preference value in control:
        document.querySelectorAll('#preference_control_' + prefId + ' > option[value="' + newValue + '"], #preference_fontrol_' + prefId + ' > option[value="' + newValue + '"]')
            .forEach((el: any) => el.selected = true);

        // Generate change event on control to trigger callbacks:
        const newEvt = new Event('change');
        $('preference_control_' + prefId).dispatchEvent(newEvt);
    }

    private setupPreferencePanel() {

        // set handler for preference menu arrow
        let settings_panel : HTMLElement = $('preferences_panel');
        let menu_arrow : HTMLElement = $('menu_arrow');
        let settings_options : HTMLElement = $('preferences_panel_options');

        menu_arrow.onclick = () => {
            settings_panel.style.height = 'auto';

            if (menu_arrow.classList.contains('open')) {
                //debug
                console.log('Closing preference panel');

                menu_arrow.classList.remove('open');
                settings_options.style.height = '0px';
                
            } else {
                //debug
                console.log('Opening preference panel');

                menu_arrow.classList.add('open');
                settings_options.style.height = 'fit-content';
                let h = settings_options.offsetHeight;
                settings_options.style.height = '0px';
                settings_options.offsetHeight;
                settings_options.style.height = h+'px';
            }
        };

        console.log("Setup preference panel");
        console.log("User preferences: ",this.prefs);

        // parse user preference from server, add options to menu and attach onchange handler
        for (const prefId in this.prefs) {

            let pref = this.prefs[prefId];

            if (parseInt(prefId) >= 200 || parseInt(prefId) < 100) continue;

            if (Object.values(pref.values).length == 2) { // preference is toggle (could be improved, not all binary options are on/off

                placeLast(this.format_block('toggle_pref',{
                    id: prefId,
                    lable: _(pref.name)
                }), $('preferences_panel_options'));
                
            } else { // preference is selection
                let options = '';
                
                for (const prefOpt in pref.values) {
                    options += this.format_block('selection_pref_option',{
                        id: prefOpt,
                        name: _(pref.values[prefOpt].name)
                    });
                }
                
                placeLast(this.format_block('selection_pref',{
                    id: prefId,
                    lable: _(pref.name),
                    options: options
                }), $('preferences_panel_options'));
            }
            
            let prefInput: any = document.querySelector(`#preference_option_${prefId} .preference_input`);
            console.log(prefInput);
            
            prefInput.onchange = () => {

                if (Object.values(pref.values).length == 2) {
                    this.updatePreference(prefId,prefInput.checked? '1':'2');
                } else {
                    this.updatePreference(prefId,prefInput.value);
                }
            };
        }
    }

    private takeAction(action: string, data?: any) {
        if (!gameui.checkAction(action)) return;

        data = data || {};
        data.lock = true;

        return new Promise((resolve, reject) => {
            gameui.ajaxcall(
                "/" + gameui.game_name + "/" + gameui.game_name + "/" + action + ".html",
                data, //
                gameui,
                (data) => resolve(data),
                (isError) => {
                    if (isError) reject(data);
                }
            );
        });
    }

    public placeOnElement(element: HTMLElement, target: HTMLElement, surface?: HTMLElement, position?: Vec2, center: boolean = true) {
        
        surface = surface || $(this.defaultSlidingSurface);

        // temporarily remove transform to make positioning scale invariant
        let transform = element.style.transform;
        element.style.transform = '';
    
        let targetPos = getElementGlobalPosition(target);
        let surfacePos = getElementGlobalPosition(surface);
    
        let targetSize = getElementRenderSize(target);
        let elementSize = getElementRenderSize(element);

        // set transform again
        element.style.transform = transform;

        console.log(targetPos);
        console.log(surfacePos);
        console.log(targetSize);
        console.log(elementSize);
    
        let centeringOffset: Vec2 = {
            x: center? (targetSize.width/2 - elementSize.width/2) : 0,
            y: center? (targetSize.height/2 - elementSize.height/2) : 0,
        }
    
        position = position || { x: 0, y: 0 }
    
        if (element.parentElement != surface) surface.append(element);

        assignStyle(element, {
            position: 'absolute',
            left: (targetPos.x - surfacePos.x + centeringOffset.x + position.x) + 'px',
            top: (targetPos.y - surfacePos.y + centeringOffset.y + position.y) + 'px',
        });
    }
    
    public slideOnElement(element: HTMLElement, target: HTMLElement, duration: number, delay: number = 0, surface?: HTMLElement, position?: Vec2, toScale: number = 1, center: boolean = true) {
        
        surface = surface || $(this.defaultSlidingSurface);

        duration *= this.animationsSpeed;
        delay *= this.animationsSpeed;

        console.log(duration);

        this.placeOnElement(element,element);
    
        assignStyle(element, {
            transition: `all ${duration}ms ${delay}ms ease-in-out`
        });

        console.log('scaling',element.style.transform,toScale);
        
        if (toScale != 1) element.style.transform += `scale(${toScale})`;
    
        this.placeOnElement(element,target,surface,position,center);
    
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                element.style.transition = '';
                
                console.log('sliding completed');
                
                resolve();
            }, duration+delay);
        });
    }
    
    public slideElementAnim(element: HTMLElement, target: HTMLElement, options?: SlideAnimationConfig) {
        let config = Object.assign(this.defaultSlideAnimation, options);

        // get surface
        let surface: HTMLElement;
        switch (config.slideSurface) {
            case 'default': surface = $(this.defaultSlidingSurface);
                break;
            case 'parent': surface = element.parentElement;
                break;
            case 'common_ancestor': // TODO
                break;
            default: surface = $(config.slideSurface);
                break;
        }

        // check if beforeSibling, if set, exists
        if (config.append && config.beforeSibling) {
            if (!target.querySelector('#'+config.beforeSibling)) {
                console.error(`Sibling ${config.beforeSibling} is not a child of Target`)
            }
        }

        // calc adapt scale
        let toScale = 1;
        let fromScale = getCommonFinalTransform(element,target);
        if (config.adaptScale) {
            let scaleDetector = element.cloneNode(true) as HTMLElement;

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
        let phin_el: HTMLElement;
        if (config.phantomIn) {
            // create phantom
            phin_el = element.cloneNode(true) as HTMLElement;
            
            // append phantom in target
            if (config.beforeSibling) {
                $(config.beforeSibling).before(phin_el);
            } else {
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
                transition: `${config.duration * this.animationsSpeed * 0.4}ms ${config.delay * this.animationsSpeed}ms ease-in-out`
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
            let phout_el = element.cloneNode(true) as HTMLElement;

            // swap position with element and place element on surface
            element.after(phout_el);
            surface.append(element);

            // position it on its phantom copy, so that it will start animation from its original position
            this.placeOnElement(element,phout_el);

            phout_el.id = ''; // clear id of phantom to avoid interferance

            assignStyle(phout_el, {
                visibility: 'hidden',
            });
            
            // setup phantom properties
            assignStyle(phout_el, {
                transitionProperty: 'width, height',
                transition: `${config.duration * this.animationsSpeed * 0.4}ms ${config.delay * this.animationsSpeed}ms ease-in-out`,
            });

            phout_el.ontransitionend = () => { phout_el.remove(); };

            // trigger animation and make phantom disappear, freeing space for the departing element 
            assignStyle(phout_el, {
                width: '0px',
                height: '0px'
            });
        }
        
        // before animation start, set scale to sliding element
        if (toScale != 1) {
            this.placeOnElement(element,element);
            element.style.transform = fromScale;
        }

        // add class for sliding state
        element.classList.add(config.className);

        // set promise
        return new Promise<void>((resolve, reject) => {
            // slide element
            this.slideOnElement(
                element,
                (config.phantomIn)? phin_el : target,
                config.duration,
                config.delay,
                surface,
                config.pos,
                toScale,
                !config.phantomIn
            )
            .then(() => {
                // remove class for sliding state
                element.classList.remove(config.className);

                // append if
                if (config.phantomIn) {
                    phin_el.replaceWith(element);

                } else if (config.append) {
                    if (config.beforeSibling) {
                        $(config.beforeSibling).before(element);
                    } else {
                        target.append(element);
                    }
                }
                assignStyle(element,{},true);

                resolve();
            })
        })
    }

    //#endregion

    /////////////////////////
    /// -- GAME STATES -- ///
    /////////////////////////
    //#region
    
    public onEnteringState(stateName: string, args: any) {
        console.log( 'Entering state: '+stateName );
        
        switch( stateName ) {

        case 'dummmy':
            break;
        }
    }

    public onLeavingState(stateName: string) {
        console.log( 'Leaving state: '+stateName );
        
        switch( stateName ) {
        
        case 'dummmy':
            break;
        }               
    }
    
    public onUpdateActionButtons(stateName: string, args: any) {
        console.log( 'onUpdateActionButtons: '+stateName );
                    
        if (this.isCurrentPlayerActive()) {            
            switch(stateName) {
            }
        }
    }

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

    setupNotifications() {
        console.log( 'notifications subscriptions setup' );
        
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
    }

    notif_log(notif: Notif) {
        console.log('LOGGING!');
        
        console.log(notif.log);
    }

    notif_dump(notif: Notif) {
        console.log('DUMPING!');

        console.log(notif.args.dump);
    }

    //#endregion     
}