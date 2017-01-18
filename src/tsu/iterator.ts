/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

module tsu {
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
    export class ArrayIterator<T> implements IIterator<T> {
        /*
        * Construct a new ArrayIterator.
        *
        * @param array The array of items to iterate.
        * @param [index] The index at which to start iteration.
        */
        constructor(array: T[], index?: number) {
            if (typeof index === "undefined") { index = 0; }
            this._array = array;
            this._index = Math.max(0, Math.min(index, array.length));
        }

        /**
        * Returns the next item from the iterator or undefined.
        */
        public __next__(): T {
            return this._array[this._index++];
        }

        /**
        * Returns this same iterator.
        */
        public __iter__(): ArrayIterator<T> {
            return this;
        }

        private _array: T[];
        private _index: number;
    }

    /**
    * A reverse iterator for an array of items.
    */
    export class ReverseArrayIterator<T> implements IIterator<T> {
        /**
        * Construct a new ReverseArrayIterator.
        *
        * @param array The array of items to iterate.
        * @param [index] The index at which to start iteration.
        */
        constructor(array: T[], index?: number) {
            if (typeof index === "undefined") { index = array.length; }
            this._array = array;
            this._index = Math.max(0, Math.min(index, array.length));
        }

        /**
        * Returns the next item from the iterator or undefined.
        */
        public __next__(): T {
            return this._array[--this._index];
        }

        /**
        * Returns this same iterator.
        */
        public __iter__(): ReverseArrayIterator<T> {
            return this;
        }

        private _array: T[];
        private _index: number;
    }

    export function iter<T>(object: T[]): ArrayIterator<T>;
    export function iter<T>(object: IIterable<T>): IIterator<T>;
    export function iter<T>(object: T[] | IIterable<T>): ArrayIterator<T> | IIterator<T> {
        if (object instanceof Array) {
            return new ArrayIterator(object);
        }
        return object.__iter__();
    }

    export function reversed<T>(object: T[]): ReverseArrayIterator<T>;
    export function reversed<T>(object: IReversible<T>): IIterator<T>;
    export function reversed<T>(object: T[] | IReversible<T>): ReverseArrayIterator<T> | IIterator<T> {
        if (object instanceof Array) {
            return new ReverseArrayIterator(object);
        }
        return object.__reversed__();
    }

    /**
    * Returns the next value from an iterator, or undefined.
    */
    export function next<T>(iterator: IIterator<T>): T {
        return iterator.__next__();
    }

    export function asArray<T>(object: T[] | IIterable<T>): T[] {
        if (object instanceof Array) {
            return object.slice();
        }
        var value: T;
        var array = [];
        var it = object.__iter__();
        while ((value = it.__next__()) !== undefined) {
            array.push(value);
        }
        return array;
    }

    export function forEach<T>(object: T[] | IIterable<T>, callback: (value: T) => any): void {
        if (object instanceof Array) {
            for (var i = 0, n = object.length; i < n; ++i) {
                if (callback(object[i]) === false) {
                    return;
                }
            }
        } else {
            var value: T;
            var it = object.__iter__();
            while ((value = it.__next__()) !== undefined) {
                if (callback(value) === false) {
                    return;
                }
            }
        }
    }

    export function map<T, U>(object: T[] | IIterable<T>, callback: (value: T) => U): U[] {
        var result = [];
        if (object instanceof Array) {
            for (var i = 0, n = object.length; i < n; ++i) {
                result.push(callback(object[i]));
            }
        } else {
            var value;
            var it = object.__iter__();
            while ((value = it.__next__()) !== undefined) {
                result.push(callback(value));
            }
        }
        return result;
    }

    export function filter<T>(object: T[] | IIterable<T>, callback: (value: T) => any): T[] {
        var value;
        var result = [];
        if (object instanceof Array) {
            for (var i = 0, n = object.length; i < n; ++i) {
                value = object[i];
                if (callback(value)) {
                    result.push(value);
                }
            }
        } else {
            var it = object.__iter__();
            while ((value = it.__next__()) !== undefined) {
                if (callback(value)) {
                    result.push(value);
                }
            }
        }
        return result;
    }
}
