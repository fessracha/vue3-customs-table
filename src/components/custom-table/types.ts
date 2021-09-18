export interface ICell {
  [key: string]: string | number
}

export type THeaders = string[];
export type TRows = ICell[];
export type TSingleExpand = boolean;
