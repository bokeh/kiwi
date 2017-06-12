import { IIterable, IReversible, ArrayIterator, ReverseArrayIterator } from "./iterator";
/**
* A base class for implementing array-based data structures.
*
* @class
*/
export declare class ArrayBase<T> implements IIterable<T>, IReversible<T> {
    constructor();
    /**
    * Returns the number of items in the array.
    */
    size(): number;
    /**
    * Returns true if the array is empty.
    */
    empty(): boolean;
    /**
    * Returns the item at the given array index.
    *
    * @param index The integer index of the desired item.
    */
    itemAt(index: number): T;
    /**
    * Removes and returns the item at the given index.
    *
    * @param index The integer index of the desired item.
    */
    takeAt(index: number): T;
    /**
    * Clear the internal contents of array.
    */
    clear(): void;
    /**
    * Swap this array's contents with another array.
    *
    * @param other The array base to use for the swap.
    */
    swap(other: ArrayBase<T>): void;
    /**
    * Returns an iterator over the array of items.
    */
    __iter__(): ArrayIterator<T>;
    /**
    * Returns a reverse iterator over the array of items.
    */
    __reversed__(): ReverseArrayIterator<T>;
    _array: T[];
}
