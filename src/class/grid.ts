import { Disc, IPosition, RedDisc, YellowDisc } from "./disc";
import { Player } from "./player";

interface IDiscsSet {
  [key: string]: Disc[];
}

const COLUMNS = 7;
const ROWS = 6;
const DISCS = 21;
const COLOR = "#0303fc";

export class Grid {
  _discs: IDiscsSet;
  _columns: number;
  _rows: number;
  _color: string;

  get discs(): IDiscsSet {
    return this._discs;
  }
  private set discs(discs: IDiscsSet) {
    this._discs = discs;
  }

  get columns(): number {
    return this._columns;
  }
  private set columns(columns: number) {
    this._columns = columns;
  }

  get rows(): number {
    return this._rows;
  }
  private set rows(rows: number) {
    this._rows = rows;
  }

  get color(): string {
    return this._color;
  }
  private set color(color: string) {
    this._color = color;
  }

  constructor(
    discs?: IDiscsSet,
    columns?: number,
    rows?: number,
    color?: string
  ) {
    this._discs = discs || {
      redDiscs: Array.from({ length: DISCS }, (_, i) => new RedDisc(i)),
      yellowDiscs: Array.from({ length: DISCS }, (_, i) => new YellowDisc(i)),
    };
    this._columns = columns || COLUMNS;
    this._rows = rows || ROWS;
    this._color = color || COLOR;
  }

  GetDiscByPosition(position: IPosition, player: Player): Disc | undefined {
    return player._discs.find((disc) => disc._position === position);
  }

  CountDiscsByColumn(column: number): number {
    return (
      this.discs["redDiscs"].filter((disc) => disc._position.column === column)
        .length +
      this.discs["yellowDiscs"].filter(
        (disc) => disc._position.column === column
      ).length
    );
  }

  IsExistsWinningConbination(): boolean {
    // 4 steps check 3x2
    for (let tRow: number = 1; tRow <= this.rows; tRow += 2) {
      for (let tColumn: number = 1; tColumn <= this.columns; tColumn += 3) {
        let tAvailableRedDiscsForCombination = [
          ...this.discs.redDiscs.filter((disc) => disc._position.column !== 0),
        ];
        let tAvailableYellowDiscsForCombination = [
          ...this.discs.yellowDiscs.filter(
            (disc) => disc._position.column !== 0
          ),
        ];
        // horizontal combination
        let tCurrentRowRedDiscs = [
          ...tAvailableRedDiscsForCombination
            .filter((disc) => disc._position.row === 1)
            .sort((disc) => disc._position.column),
        ];
        if (tCurrentRowRedDiscs.length >= 4) {
          if (
            tCurrentRowRedDiscs.every(
              (disc) =>
                disc._position.column >= tColumn &&
                disc._position.column <= tColumn + 3
            )
          )
            return true;
        }
        // vertical combination

        // slash combination

        //back slash combination
      }
    }
    return false;
  }

  Display(): void {
    this.DisplayFooter();
    this.DisplayRows();
    this.DisplayHeader();
  }

  private DisplayFooter() {
    console.log("DisplayFooter");
  }

  private DisplayRows() {
    console.log("DisplayRows");
  }

  private DisplayHeader() {
    console.log("DisplayHeader");
  }
}
