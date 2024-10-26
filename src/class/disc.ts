interface IDisc {
  _color: string;
  _position: IPosition;
  _id: number;
}

export interface IPosition {
  column: number;
  row: number;
}

export class Disc implements IDisc {
  _color: string;
  _position: IPosition;
  _id: number;

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
  }

  constructor(id: number, color: string) {
    this._id = id;
    this._position = { column: 0, row: 0 };
    this._color = color;
  }
}

export class RedDisc extends Disc {
  constructor(id: number) {
    super(id, "#fc030b");
  }
}

export class YellowDisc extends Disc {
  constructor(id: number) {
    super(id, "#ecfc03");
  }
}
