//////////////////////////////////
/// -- FRAMEWORK DEFINITION -- ///
//////////////////////////////////

declare var gameui: GameGui;
declare var g_replayFrom: number | undefined;
declare var g_gamethemeurl: string;
declare var g_themeurl: string;
declare var g_archive_mode: boolean;
declare function _(str: string): string;
declare function __(site: string, str: string): string;
declare function $(text: string | Element): HTMLElement;

declare const define;
declare const ebg;
declare const dojo;
declare const dijit;
declare type eventhandler = (event?: any) => void;

type StringProperties = { [key: string]: string };

declare class GameNotifQueue {
	/**
	 * Set the notification deinfed by notif_type as "synchronous"
	 * @param notif_type - the type of notification
	 * @param duration - the duration of notification wait in milliseconds
	 * If "duration" is specified: set a simple timer for it (milliseconds)
	 * If "duration" is not specified, the notification handler MUST call "setSynchronousDuration"
	 */
	setSynchronous(notif_type: string, duration?: number): void;
	/**
	 * Set dynamically the duration of a synchronous notification
	 * MUST be called if your notification has not been associated with a duration in "setSynchronous"
	 * @param duration - how long to hold off till next notficiation received (milliseconds)
	 */
	setSynchronousDuration(duration: number): void;

	/**
	 * Ignore notification if predicate is true
	 * @param notif_type  - the type of notificatio
	 * @param predicate - the function that if returned true will make framework not dispatch notification.
	 * NOTE: this cannot be used for syncronious unbound notifications
	 */
	setIgnoreNotificationCheck(notif_type: string, predicate: (notif: object) => boolean): void;
}

declare interface Notif {
	type: string; // type of the notification (as passed by php function)
	log: string; // the log string passed from php notification
	args: any; // This is the arguments that you passed on your notification method on php
	bIsTableMsg: boolean; // is true when you use [[Main_game_logic:_yourgamename.game.php#NotifyAllPlayers|NotifyAllPlayers]] method (false otherwise)
	channelorig: string; // information about table ID (formatted as : "/table/t[TABLE_NUMBER]")
	gamenameorig: string; // name of the game
	move_id: number; // ID of the move associated with the notification
	table_id: number; // ID of the table (comes as string)
	time: number; // UNIX GMT timestamp
	uid: number; // unique identifier of the notification
	h: string; // unknown
}

declare class Counter {
	speed: number;

	create(target: string): void; //  associate counter with existing target DOM element
	getValue(): number; //  return current value
	incValue(by: number): number; //  increment value by "by" and animate from previous value
	setValue(value: number): void; //  set value, no animation
	toValue(value: number): void; // set value with animation
	disable(): void; // Sets value to "-"
}

declare class GameGui {
	page_is_unloading: any;
	game_name: string;
	instantaneousMode: boolean;
	player_id: number;
	interface_min_width: number;
	gamedatas: any;
	isSpectator: boolean;
	bRealtime: boolean;
	notifqueue: GameNotifQueue;
	last_server_state: any;
	scoreCtrl: { [player_id: number]: Counter };
	on_client_state: boolean;
	tooltips: string[];
	is_client_only: boolean;
    prefs: Preference[];

	isCurrentPlayerActive(): boolean;
	getActivePlayerId(): number;
	addActionButton(id: string, label: string, method: string | eventhandler, destination?: string, blinking?: boolean, color?: string): void;
	checkAction(action: any): boolean;
	ajaxcall(url: string, args: object, bind: GameGui, resultHandler: (result: any) => void, allHandler: (err: any) => void): void;

	setup(gamedatas: object): void;
	onEnteringState(stateName: string, args: { args: any } | null): void;
	onLeavingState(stateName: string): void;
	onUpdateActionButtons(stateName: string, args: any): void;
	setupNotifications(): void;

	setClientState(newState: string, args: object): void;
	restoreServerGameState(): void;

	showMessage(msg: string, type: string): void;
	showMoveUnauthorized(): void;
	onScriptError(msg: string, url?: string, linenumber?: number): void;
	inherited(args: any): any;
	format_string_recursive(log: string, args: any[]): string;
    format_block(block_name: string, args: any);
	clienttranslate_string(text: string): string;

	displayScoring(anchor_id: string, color: string, score: number | string, duration?: number, offset_x?: number, offset_y?: number): void;
	showBubble(anchor_id: string, text: string, delay?: number, duration?: number, custom_class?: string): void;
	updateCounters(counters: any): void;

	addTooltip(nodeId: string, helpStringTranslated: string, actionStringTranslated: string, delay?: number): void;
	addTooltipHtml(nodeId: string, html: string, delay?: number): void;
	addTooltipHtmlToClass(cssClass: string, html: string, delay?: number): void;
	addTooltipToClass(cssClass: string, helpStringTranslated: string, actionStringTranslated: string, delay?: number): void;
	removeTooltip(nodeId: string): void;

	confirmationDialog(message: string, yesHandler: (param: any) => void, noHandler?: (param: any) => void, param?: any): void;
	multipleChoiceDialog(message: string, choices: any[], callback: (choice: number) => void): void;
}

/* interface Notif<T> {
    args: T;
    log: string;
    move_id: number;
    table_id: string;
    time: number;
    type: string;
    uid: string;
} */

// declare only subscribe method. only method used from dojo framework (and currently necessary to listen to server notification)
interface Dojo {
	subscribe: (notifIdentifier: string, gameInstance: GameGui, handlerIdentifier: string) => void;
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

interface Size {
	width: number;
	height: number;
}

interface Vec2 {
	x: number;
	y: number;
}

interface SlideAnimationConfig {
	duration: number,
	delay: number,
	pos: Vec2,
	append: boolean,
	beforeSibling: string,
	phantomIn: boolean,
	phantomOut: boolean,
	slideSurface: string,
	className: string,
	adaptScale: boolean
}

interface TimedConfirmConfiguration {
	selectedElement: HTMLElement,
	selectedClass: string
}


/* 
// add if necessary
interface Vec3 {
	x: number;
	y: number;
	z: number;
} */


// WIP
type Gamestate = any; // TODO

interface PlayerData {
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