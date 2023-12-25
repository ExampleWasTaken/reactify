import { SearchParamsObject } from '../types/InternalTypes.ts';

export class SearchParams {
  private readonly params: SearchParamsObject;

  constructor(params: SearchParamsObject) {
    this.params = params;
  }

  public toString(): string {
    const keys = Object.keys(this.params);
    const values = Object.values(this.params);

    let string = '?';
    for (let i = 0; i < keys.length; i++) {
      if (values[i]) {
        string += `${keys[i]}=${values[i]}&`;
      }
    }
    return string;
  }
}
