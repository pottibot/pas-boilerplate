//////////////////////////////////
/// -- FRAMEWORK DEFINITION -- ///
//////////////////////////////////

 interface Game {
    setup: (gamedatas: any) => void;
    onEnteringState: (stateName: string, args: any) => void;
    onLeavingState: (stateName: string ) => void;
    onUpdateActionButtons: (stateName: string, args: any) => void;
    setupNotifications: () => void;
    //format_string_recursive: (log: string, args: any) => void;
}

interface Notif<T> {
    args: T;
    log: string;
    move_id: number;
    table_id: string;
    time: number;
    type: string;
    uid: string;
}

interface PreferenceValue {
    name: string;
}

interface Preference {
    generic?: boolean;
    name: string;
    values: PreferenceValue[];
    value: number;
    default: number;
}

// declare only subscribe method. only method used from dojo framework (and currently necessary to listen to server notification)
interface Dojo {
    subscribe: (notifIdentifier: string, gameInstance: Game, handlerIdentifier: string) => void;
}

type Gamestate = any; // TODO

interface Player {
    beginner: boolean;
    color: string;
    color_back: any | null;
    eliminated: number;
    id: string;
    is_ai: string;
    name: string;
    score: string;
    zombie: number;
}