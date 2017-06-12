import { AssociativeArray, ICompare } from "./tsu";
export interface IMap<T, U> extends AssociativeArray<T, U> {
}
export declare function createMap<T, U>(compare: ICompare<T, T>): IMap<T, U>;
