interface ICircularBuffer {
	add(item: any): any | undefined;
	get(index: number): any;
	set(index: number, item: any): void;
	getCount(): number;
	isEmpty(): boolean;
	clear(): void;
	getValues(): Array<any>;
	getNewestValues(maxCount: number): Array<any>;
	getKeys(): Array<number>;
	containsKey(key: number): boolean;
	containsValue(value: any): boolean;
	getLast(): any | null;
}

type Size = number;

/**
 * Class for CircularBuffer.
 * Implements a buffer with a maximum size. New entries override the oldest
 * entries when the maximum size has been reached.
 */
export default class CircularBuffer implements ICircularBuffer {
	/**
	 * Index of the next element in the circular array structure.
	 * @private {number}
	 */
	private nextPtr: number = 0;

	/**
	 * Maximum size of the circular array structure.
	 * @private {number}
	 */
	private maxSize: Size = 100;

	/**
	 * Underlying array for the CircularBuffer.
	 * @private {!Array<T>}
	 */
	private buff: Array<any> = [];

	constructor(initialMaxSize?: Size) {
		if (initialMaxSize) {
			this.maxSize = initialMaxSize;
		}
	}

	/**
	 * Adds an item to the buffer. May remove the oldest item if the buffer is at max size.
	 */
	add(item: any): any | undefined {
		const previousItem = this.buff[this.nextPtr];

		this.buff[this.nextPtr] = item;

		this.nextPtr = (this.nextPtr + 1) % this.maxSize;

		return previousItem;
	}

	/**
	 * Returns the item at the specified index.
	 */
	get(index: number): any {
		index = this._normalizeIndex(index);
		return this.buff[index];
	}

	/**
	 * Sets the item at the specified index.
	 */
	set(index: number, item: any) {
		index = this._normalizeIndex(index);
		this.buff[index] = item;
	}

	/**
	 * Returns the current number of items in the buffer.
	 */
	getCount(): number {
		return this.buff.length;
	}

	/**
	 * Whether the buffer is empty.
	 */
	isEmpty(): boolean {
		return this.buff.length === 0;
	}

	/**
	 * Empties the current buffer.
	 */
	clear(): void {
		this.buff.length = 0;
		this.nextPtr = 0;
	}

	/**
	 * The values in the buffer ordered from oldest to newest.
	 */
	getValues(): Array<any> {
		// getNewestValues returns all the values if the maxCount parameter is the count
		return this.getNewestValues(this.getCount());
	}

	/**
	 * Returns the newest values in the buffer up to `count`.
	 * @param {number} maxCount The maximum number of values to get. Should be a
	 *     positive number.
	 * @return {!Array<T>} The newest values in the buffer up to `count`. The
	 *     values are ordered from oldest to newest.
	 */
	getNewestValues(maxCount: number): Array<any> {
		const bufferLength = this.getCount();
		const start = this.getCount() - maxCount;
		const rv = [];

		for (let i = start; i < bufferLength; i++) {
			rv.push(this.get(i));
		}

		return rv;
	}

	/**
	 * Returns the indexes in the buffer.
	 */
	getKeys(): Array<number> {
		const rv = [];
		const bufferLength = this.getCount();
		for (let i = 0; i < bufferLength; i++) {
			rv[i] = i;
		}

		return rv;
	}

	/**
	 * Whether the buffer contains the key/index.
	 */
	containsKey(key: number | string): boolean {
		if (typeof key === 'string') {
			return Number(key) < this.getCount();
		}

		return key < this.getCount();
	}

	/**
	 * Whether the buffer contains the given value.
	 */
	containsValue(value: any): boolean {
		const bufferLength = this.getCount();

		for (let i = 0; i < bufferLength; i++) {
			if (this.get(i) === value) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns the last item inserted into the buffer.
	 */
	getLast(): any | null {
		if (this.getCount() === 0) {
			// eslint-disable-next-line unicorn/no-null
			return null;
		}

		return this.get(this.getCount() - 1);
	}

	/**
	 * Helper function to convert an index in the number space of oldest to
	 * newest items in the array to the position that the element will be at in the
	 * underlying array.
	 * @param {number} index The index of the item in a list ordered from oldest to newest.
	 * @return {number} The index of the item in the CircularBuffer's underlying array.
	 */
	private _normalizeIndex(index: number): number {
		if (index >= this.buff.length) {
			throw new Error('Out of bounds exception');
		}

		if (this.buff.length < this.maxSize) {
			return index;
		}

		return (this.nextPtr + Number(index)) % this.maxSize;
	}
}
