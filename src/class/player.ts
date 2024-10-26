import { Disc, RedDisc } from "./disc";

interface IPlayer {
  _name: string;
  _discs: Disc[];
}

export class Player implements IPlayer {
  _name: string;
  _discs: Disc[];
  

  constructor(discs: Disc[], name: string) {
    this._discs = discs;
    this._name = name;
  }

  get isRed(): boolean{
    return this._discs[0] instanceof RedDisc;
  }

  get getNextDisc(): Disc {
    return this._discs.filter(disc => disc._position.column === 0)[0];
  }

  DropDisc(column: number, row: number): void {
    console.log(`this.getNextDisc ${this.getNextDisc}`);
    console.log(`column ${column}`);
    console.log(`row ${row}`);
    this.getNextDisc._position.column = column;
    this.getNextDisc._position.row = row;
  }
}
