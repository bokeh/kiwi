/**
* An interface for defining an iterator.
*/
export interface IIterator<T> {
    /**
    * Returns the next item from the iterator or undefined.
    */
    __next__(): T;
    /**
    * Returns this same iterator.
    */
    __iter__(): IIterator<T>;
}
/**
* An interface defining an iterable object.
*/
export interface IIterable<T> {
    /**
    * Returns an iterator over the object contents.
    */
    __iter__(): IIterator<T>;
}
/**
* An interface which defines a reversible object.
*/
export interface IReversible<T> {
    /**
    * Returns a iterator over the reversed object contents.
    */
    __reversed__(): IIterator<T>;
}
/**
* An iterator for an array of items.
*/
export declare class ArrayIterator<T> implements IIterator<T> {
    constructor(array: T[], index?: number);
    /**
    * Returns the next item from the iterator or undefined.
    */
    __next__(): T;
    /**
    * Returns this same iterator.
    */
    __iter__(): ArrayIterator<T>;
    private _array;
    private _index;
}
/**
* A reverse iterator for an array of items.
*/
export declare class ReverseArrayIterator<T> implements IIterator<T> {
    /**
    * Construct a new ReverseArrayIterator.
    *
    * @param array The array of items to iterate.
    * @param [index] The index at which to start iteration.
    */
    constructor(array: T[], index?: number);
    /**
    * Returns the next item from the iterator or undefined.
    */
    __next__(): T;
    /**
    * Returns this same iterator.
    */
    __iter__(): ReverseArrayIterator<T>;
    private _array;
    private _index;
}
export declare function iter<T>(object: T[]): ArrayIterator<T>;
export declare function iter<T>(object: IIterable<T>): IIterator<T>;
export declare function reversed<T>(object: T[]): ReverseArrayIterator<T>;
export declare function reversed<T>(object: IReversible<T>): IIterator<T>;
/**
* Returns the next value from an iterator, or undefined.
*/
export declare function next<T>(iterator: IIterator<T>): T;
export declare function asArray<T>(object: T[] | IIterable<T>): T[];
export declare function forEach<T>(object: T[] | IIterable<T>, callback: (value: T) => any): void;
export declare function map<T, U>(object: T[] | IIterable<T>, callback: (value: T) => U): U[];
export declare function filter<T>(object: T[] | IIterable<T>, callback: (value: T) => any): T[];
