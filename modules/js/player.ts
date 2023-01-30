
class Player {

    private game: GameGui;

    private beginner: boolean;
    private color: string;
    private color_back: any | null;
    private eliminated: number;
    private id: string;
    private is_ai: string;
    private name: string;
    private score: string;
    private zombie: number;

    constructor (playerData: PlayerData, game: GameGui) {

        this.game = game;

        this.beginner = playerData.beginner;
        this.color = playerData.color;
        this.color_back = playerData.color_back;
        this.eliminated = playerData.eliminated;
        this.id = playerData.id;
        this.is_ai = playerData.is_ai;
        this.name = playerData.name;
        this.score = playerData.score;
        this.zombie = playerData.zombie;
    }

    // TODO
    incScore(delta: number) {
    }

    // TODO
    setScore(delta: number) {
    }
}