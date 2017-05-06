/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

import {IIterable, IReversible, ArrayIterator, ReverseArrayIterator, iter, reversed} from "./iterator"

/**
* A base class for implementing array-based data structures.
*
* @class
*/
export class ArrayBase<T> implements IIterable<T>, IReversible<T> {

    constructor() {
        /*
        * The internal data array.
        *
        * @protected
        */
        this._array = [];
    }

    /**
    * Returns the number of items in the array.
    */
    public size(): number {
        return this._array.length;
    }

    /**
    * Returns true if the array is empty.
    */
    public empty(): boolean {
        return this._array.length === 0;
    }

    /**
    * Returns the item at the given array index.
    *
    * @param index The integer index of the desired item.
    */
    public itemAt(index: number): T {
        return this._array[index];
    }

    /**
    * Removes and returns the item at the given index.
    *
    * @param index The integer index of the desired item.
    */
    public takeAt(index: number): T {
        return this._array.splice(index, 1)[0];
    }

    /**
    * Clear the internal contents of array.
    */
    public clear(): void {
        this._array = [];
    }

    /**
    * Swap this array's contents with another array.
    *
    * @param other The array base to use for the swap.
    */
    public swap(other: ArrayBase<T>): void {
        var array = this._array;
        this._array = other._array;
        other._array = array;
    }

    /**
    * Returns an iterator over the array of items.
    */
    public __iter__(): ArrayIterator<T> {
        return iter(this._array);
    }

    /**
    * Returns a reverse iterator over the array of items.
    */
    public __reversed__(): ReverseArrayIterator<T> {
        return reversed(this._array);
    }

    public _array: T[];
}
