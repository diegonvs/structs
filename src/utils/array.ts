/**
 * Clears a given array
 */
export function clear<T>(array: ArrayLike<T>): void {
	// For non real arrays we don't have the magic
	// length so we delete the indices.
	if (!Array.isArray(array)) {
		for (let i = array.length - 1; i >= 0; i--) {
			// @ts-ignore
			delete array[i];
		}
	}

	// @ts-ignore
	array.length = 0;
}

/**
 * Whether the array is empty.
 */
export function isEmpty<T>(array: ArrayLike<T>): boolean {
	return array.length === 0;
}

/**
 * Returns the last element in an array without removing it.
 */
export function peek<T>(array: ArrayLike<T>): T {
	return array[array.length - 1];
}

/**
 * Whether the array contains the given object.
 */
export function contains(array: Array<any> | string, value: any): boolean {
	return array.includes(value);
}

/**
 * Removes the first occurrence of a particular value from an array.
 */
export function remove(array: Array<any>, value: any): boolean {
	const index = array.indexOf(value);
	let rv;

	if ((rv = index >= 0)) {
		removeAt(array, index);
	}

	return rv;
}

/**
 * Removes the last occurrence of a particular value from an array.
 */
export function removeLast(array: Array<any>, value: any): boolean {
	const index = array.lastIndexOf(value);
	if (index >= 0) {
		return removeAt(array, index);
	}

	return false;
}

/**
 * Removes from an array the element at index
 */
export function removeAt(array: Array<any>, index: number): boolean {
	return Array.prototype.splice.call(array, index, 1).length === 1;
}
