/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * ----- *
 */

declare const define;
declare const ebg;
declare const $;
declare const dojo: Dojo;

class Pasboilerplate implements Game {

    private gamedatas: pasboilerplateGamedatas;
    private player_id: string;
    private players: { [playerId: number]: Player };
    private playerNumber: number;

    // GLOBALS DEF
    //private myGlobalValue: any;

    ///////////////////
    /// -- SETUP -- ///
    ///////////////////
    //#region

    constructor() {
        console.log('pasboilerplate constructed!');
            
        // GLOBALS INIT
        //this.myGlobalValue= 0;
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
        (this as any).inherited(arguments);

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
        return (this as any).inherited(arguments);
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
                const newValue = prefControl.target.value;
                (this as any).prefs[pref].value = newValue;
                this.onPreferenceChange(pref, newValue);
            }
        });

        // FIRE EVENTS TO TRIGGER CHANGES A FIRST TIME
        document.querySelectorAll("#ingame_menu_content .preference_control").forEach((el: any) => {
            // Create a new 'change' event
            let event = new CustomEvent('change');

            // Dispatch it.
            el.dispatchEvent(event);
        });
    }

    private onPreferenceChange(prefId: number, prefValue: number) {
        //console.log("Preference changed", prefId, prefValue);

        let prefSelect = $('pref_select_'+prefId)
        if (prefSelect) prefSelect.value = prefValue;
        
        switch (prefId) {        
            default:
                break;
        }
    }

    private updatePreference(prefId: number, newValue: number) {
        //console.log("Updating preference", prefId, newValue);

        // Select preference value in control:
        document.querySelectorAll('#preference_control_' + prefId + ' > option[value="' + newValue + '"], #preference_fontrol_' + prefId + ' > option[value="' + newValue + '"]')
            .forEach((el: any) => el.selected = true);

        // Generate change event on control to trigger callbacks:
        const newEvt = new Event('change');
        $('preference_control_' + prefId).dispatchEvent(newEvt);
    }

    private setupPreferencePanel() {

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

        console.log((this as any).prefs);

        for (const prefId in (this as any).prefs) {

            let pref : Preference = (this as any).prefs[prefId];
            console.log(pref);

            if (pref.values.length == 2) { // preference is toggle (could be improved, not all binary options are on/off

            } else { // preference is selection

            }
        }
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
                    
        if ((this as any).isCurrentPlayerActive()) {            
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

    notif_log(notif: Notif<any>) {
        console.log('LOGGING!');
        
        console.log(notif.log);
    }

    notif_dump(notif: Notif<any>) {
        console.log('DUMPING!');

        console.log(notif.args.dump);
    }

    //#endregion     
}