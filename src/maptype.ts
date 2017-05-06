/*-----------------------------------------------------------------------------
| Copyright (c) 2014, Nucleic Development Team.
|
| Distributed under the terms of the Modified BSD License.
|
| The full license is in the file COPYING.txt, distributed with this software.
|----------------------------------------------------------------------------*/

import {AssociativeArray, ICompare} from "./tsu"

export interface IMap<T, U> extends AssociativeArray<T, U> { }

export function createMap<T, U>( compare: ICompare<T, T> ): IMap<T, U>
{
    return new AssociativeArray<T, U>( compare );
}
