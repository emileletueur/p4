import chalk from "chalk";
import { Grid } from "./grid";
import { Player } from "./player";
import { Prompt } from "./prompt";
import EventEmitter from "events";
import { Disc } from "./disc";

const info = console.info;
const P4INFO = chalk.blue;
const BOLDUNDERLINE = chalk.bold.underline;

export class P4 extends EventEmitter {
  private static instance: P4;

  public static getInstance(): P4 {
    if (!P4.instance) {
      P4.instance = new P4();
    }
    return P4.instance;
  }

  private grid!: Grid | undefined;
  private playerOne!: Player;
  private playerTwo!: Player;

  isRunningGame: boolean = false;
  isPlayersInfoDefined: boolean = false;
  currentSelectedColumn: number = 4;
  stepNumber: number = 0;

  constructor() {
    super();
    this.InitEventHandler();
    this.Run();
  }

  get isRedsTurn(): Boolean {
    return this.stepNumber % 2 === 0;
  }

  public async Run(): Promise<void> {
    if (!this.isRunningGame) {
      this.InitGame();
    } else {
    }
  }

  public InitEventHandler(): void {
    Prompt.eventEmitter.on("continue", async () => {
      await this.Step();
      this.stepNumber++;
    });
    Prompt.eventEmitter.on("dropDisc", async () => {
      let tComputedRow =
        this.grid!.CountDiscsByColumn(this.currentSelectedColumn) + 1;
      if (this.isRedsTurn && tComputedRow < 7)
        this.playerOne.DropDisc(this.currentSelectedColumn, tComputedRow);
      else this.playerTwo.DropDisc(this.currentSelectedColumn, tComputedRow);
      this.ClearDisplay();
      this.grid!.Display();
    });
    Prompt.eventEmitter.on("moveToLeft", () => {
      if (this.currentSelectedColumn > 1 && this.currentSelectedColumn <= 7)
        this.currentSelectedColumn--;
      this.ClearDisplay();
      this.grid!.Display();
    });
    Prompt.eventEmitter.on("moveToRight", () => {
      if (this.currentSelectedColumn >= 1 && this.currentSelectedColumn < 7)
        this.currentSelectedColumn++;
      this.ClearDisplay();
      this.grid!.Display();
    });
  }

  FlipColor(): void {
    this.grid = undefined;
    this.grid = new Grid();
    if (this.playerOne.isRed) {
      this.playerOne._discs = this.grid!.discs.yellowDiscs;
      this.playerTwo._discs = this.grid!.discs.redDiscs;
    } else {
      this.playerOne._discs = this.grid!.discs.redDiscs;
      this.playerTwo._discs = this.grid!.discs.yellowDiscs;
    }
  }

  public async InitGame(): Promise<void> {
    this.grid = new Grid();
    if (!this.isPlayersInfoDefined) await this.SetPlayers();
    this.DisplayInfo();
    Prompt.SetColumnSelector();
    this.currentSelectedColumn = 4;
    this.isRunningGame = true;
  }

  public async Step(): Promise<void> {
    this.ClearDisplay();
    const tRed = chalk
      .hex(this.playerOne._discs[0]._color)
      .bold(`red's (${this.playerOne._name})`);
    const tYellow = chalk
      .hex(this.playerTwo._discs[0]._color)
      .bold(`yellow's (${this.playerTwo._name})`);
    info(
      P4INFO(
        `Round ${this.stepNumber}: It's ${this.isRedsTurn ? tRed : tYellow} turn. Make your move !`
      )
    );

    this.grid!.Display();
  }

  public Pause(): void {}

  public Stop(): void {}

  private async SetPlayers(): Promise<void> {
    const tPlayerOneName: string = await Prompt.PromptForString(
      `Looking for first player's name : `
    );
    let tPlayerOneSelectedColor: string = "";
    while (
      tPlayerOneSelectedColor === "" ||
      (tPlayerOneSelectedColor.toLowerCase() !== "red" &&
        tPlayerOneSelectedColor.toLowerCase() !== "yellow")
    ) {
      tPlayerOneSelectedColor = await Prompt.PromptForString(
        `First player will use Red or Yellow : `
      );
    }
    const tPlayerTwoName: string = await Prompt.PromptForString(
      `Looking for second player's name : `
    );
    if (tPlayerOneSelectedColor.toLowerCase() === "red") {
      this.playerOne = new Player(this.grid!.discs.redDiscs, tPlayerOneName);
      this.playerTwo = new Player(this.grid!.discs.yellowDiscs, tPlayerTwoName);
    } else {
      this.playerOne = new Player(this.grid!.discs.yellowDiscs, tPlayerOneName);
      this.playerTwo = new Player(this.grid!.discs.redDiscs, tPlayerTwoName);
    }
    this.isPlayersInfoDefined = true;
  }

  private ClearDisplay(): void {
    // console.clear();
  }

  private DisplayInfo() {
    info(BOLDUNDERLINE(P4INFO(`Current players :`)));
    info(
      P4INFO(
        `
Player 1 -> ${BOLDUNDERLINE(chalk.hex(this.playerOne._discs[0]._color).bold(`${this.playerOne._name}`))}
Player 2 -> ${BOLDUNDERLINE(chalk.hex(this.playerTwo._discs[0]._color).bold(`${this.playerTwo._name}`))}
  `
      )
    );
  }
}
