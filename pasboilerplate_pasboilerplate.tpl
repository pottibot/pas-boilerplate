{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- pasboilerplate implementation : © <Pietro Luigi Porcedda> <pietro.l.porcedda@gmail.com>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------
-->

<div class="player-board" id="preferences_panel">
    <div id="preferences_panel_icon">
        <svg id="cog_icon" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/>
        </svg>
        <div id="menu_arrow"></div>
    </div>
    <div id="preferences_panel_options">       
    </div>
</div>

This is your game interface. You can edit this HTML in your ".tpl" file.


<script type="text/javascript">

var selection_pref =    `<div id="preference_option_\${id}" class="preference_option selection_preference">
                            <div class='preference_lable'>\${lable}:</div>
                            <select class="preference_input">
                                \${options}
                            </select>
                        </div> `;

var selection_pref_option = `<option value="\${id}">\${name}</option>`;

var toggle_pref =   `<div id="preference_option_\${id}" class="preference_option preference_toggle">
                        <div class='preference_lable'>\${lable}:</div>
                        <label class="toggle_switch">
                            <input type="checkbox" class="preference_input">
                            <span class="slider"></span>
                        </label>
                    </div> `;

var range_pref =    `<div id="preference_option_\${id}" class="preference_option range_preference">
                        <div class='preference_lable'>\${lable}:</div>
                        <input type="range" class="preference_input" min="\${min}" max="\${max}" value="\${value}">
                    </div> `;

</script>  

{OVERALL_GAME_FOOTER}
