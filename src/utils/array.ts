/**
 * Clears a given array
 */
export function clear<T>(array: ArrayLike<T>) {
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
export function isEmpty<T>(array: Array<T>) {
	return array.length === 0;
}
