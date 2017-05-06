/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

import {Pair, ICompare} from "./pair"
import {ArrayBase} from "./array_base"
import {binarySearch, binaryFind, lowerBound} from "./algorithm"
import {IIterable, forEach} from "./iterator"

/**
* A mapping container build on a sorted array.
*
* @class
*/
export class AssociativeArray<T, U> extends ArrayBase<Pair<T, U>> {
    /**
    * Construct a new AssociativeArray.
    *
    * @param compare The key comparison function.
    */
    constructor(compare: ICompare<T, T>) {
        super();
        this._compare = compare;
        this._wrapped = wrapCompare(compare);
    }
    /**
    * Returns the key comparison function used by this array.
    */
    public comparitor(): ICompare<T, T> {
        return this._compare;
    }

    /**
    * Return the array index of the given key, or -1.
    *
    * @param key The key to locate in the array.
    */
    public indexOf(key: T): number {
        return binarySearch(this._array, key, this._wrapped);
    }

    /**
    * Returns true if the key is in the array, false otherwise.
    *
    * @param key The key to locate in the array.
    */
    public contains(key: T): boolean {
        return binarySearch(this._array, key, this._wrapped) >= 0;
    }

    /**
    * Returns the pair associated with the given key, or undefined.
    *
    * @param key The key to locate in the array.
    */
    public find(key: T): Pair<T, U> {
        return binaryFind(this._array, key, this._wrapped);
    }

    /**
    * Returns the pair associated with the key if it exists.
    *
    * If the key does not exist, a new pair will be created and
    * inserted using the value created by the given factory.
    *
    * @param key The key to locate in the array.
    * @param factory The function which creates the default value.
    */
    public setDefault(key: T, factory: () => U): Pair<T, U> {
        var array = this._array;
        var index = lowerBound(array, key, this._wrapped);
        if (index === array.length) {
            var pair = new Pair(key, factory());
            array.push(pair);
            return pair;
        }
        var currPair = array[index];
        if (this._compare(currPair.first, key) !== 0) {
            var pair = new Pair(key, factory());
            array.splice(index, 0, pair);
            return pair;
        }
        return currPair;
    }

    /**
    * Insert the pair into the array and return the pair.
    *
    * This will overwrite any existing entry in the array.
    *
    * @param key The key portion of the pair.
    * @param value The value portion of the pair.
    */
    public insert(key: T, value: U): Pair<T, U> {
        var array = this._array;
        var index = lowerBound(array, key, this._wrapped);
        if (index === array.length) {
            var pair = new Pair(key, value);
            array.push(pair);
            return pair;
        }
        var currPair = array[index];
        if (this._compare(currPair.first, key) !== 0) {
            var pair = new Pair(key, value);
            array.splice(index, 0, pair);
            return pair;
        }
        currPair.second = value;
        return currPair;
    }

    public update(object: AssociativeArray<T, U> | IIterable<Pair<T, U>> | Pair<T, U>[]): void {
        if (object instanceof AssociativeArray) {
            this._array = merge(this._array, object._array, this._compare);
        } else {
            forEach(object, (pair) => {
                this.insert(pair.first, pair.second);
            });
        }
    }

    /**
    * Removes and returns the pair for the given key, or undefined.
    *
    * @param key The key to remove from the map.
    */
    public erase(key: T): Pair<T, U> {
        var array = this._array;
        var index = binarySearch(array, key, this._wrapped);
        if (index < 0) {
            return undefined;
        }
        return array.splice(index, 1)[0];
    }

    /**
    * Create a copy of this associative array.
    */
    public copy(): AssociativeArray<T, U> {
        var theCopy = new AssociativeArray<T, U>(this._compare);
        var copyArray = theCopy._array;
        var thisArray = this._array;
        for (var i = 0, n = thisArray.length; i < n; ++i) {
            copyArray.push(thisArray[i].copy());
        }
        return theCopy;
    }

    private _wrapped: ICompare<Pair<T, U>, T>;
    private _compare: ICompare<T, T>;
}

/**
* An internal which wraps a comparison key function.
*/
function wrapCompare<T, U>(cmp: ICompare<T, T>) {
    return function(pair: Pair<T, U>, value: T) {
        return cmp(pair.first, value);
    };
}

/**
* An internal function which merges two ordered pair arrays.
*/
function merge<T, U>(first: Pair<T, U>[], second: Pair<T, U>[], compare: ICompare<T, T>): Pair<T, U>[] {
    var i = 0, j = 0;
    var len1 = first.length;
    var len2 = second.length;
    var merged = [];
    while (i < len1 && j < len2) {
        var a = first[i];
        var b = second[j];
        var v = compare(a.first, b.first);
        if (v < 0) {
            merged.push(a.copy());
            ++i;
        } else if (v > 0) {
            merged.push(b.copy());
            ++j;
        } else {
            merged.push(b.copy());
            ++i;
            ++j;
        }
    }
    while (i < len1) {
        merged.push(first[i].copy());
        ++i;
    }
    while (j < len2) {
        merged.push(second[j].copy());
        ++j;
    }
    return merged;
}
