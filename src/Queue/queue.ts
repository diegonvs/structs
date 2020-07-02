import {
	contains,
	isEmpty,
	peek,
	remove as removeFromArray,
	removeLast,
} from '../utils/array';

type QueueItem = any;

interface IQueue {
	enqueue(element: QueueItem): void;
	dequeue(): QueueItem;
	peek(): QueueItem;
	getCount(): number;
	isEmpty(): boolean;
	clear(): void;
	contains(element: QueueItem): boolean;
	remove(element: QueueItem): boolean;
	getValues(): Array<QueueItem>;
}

/**
 * This file provides the implementation of a FIFO Queue structure.
 * API is similar to that of com.google.common.collect.IntQueue
 *
 * The implementation is a classic 2-stack queue.
 * There's a "front" stack and a "back" stack.
 * Items are pushed onto "back" and popped from "front".
 * When "front" is empty, we replace "front" with reverse(back).
 *
 * Example:
 * front                         back            op
 * []                            []              enqueue 1
 * []                            [1]             enqueue 2
 * []                            [1,2]           enqueue 3
 * []                            [1,2,3]         dequeue -> ...
 * [3,2,1]                       []              ... -> 1
 * [3,2]                         []              enqueue 4
 * [3,2]                         [4]             dequeue -> 2
 * [3]                           [4]
 *
 * Front and back are simple javascript arrays. We rely on
 * Array.push and Array.pop being O(1) amortized.
 *
 * Note: In V8, queues, up to a certain size, can be implemented
 * just fine using Array.push and Array.shift, but other JavaScript
 * engines do not have the optimization of Array.shift.
 */
export default class Queue implements IQueue {
	private front: Array<QueueItem> = [];
	private back: Array<QueueItem> = [];

	/**
	 * Puts the specified element on this queue.
	 */
	enqueue(element: QueueItem): void {
		this.back.push(element);
	}

	/**
	 * Flips the back stack onto the front stack if front is empty,
	 * to prepare for peek() or dequeue().
	 */
	private maybeFlip_() {
		if (isEmpty(this.front)) {
			this.front = this.back;
			this.front.reverse();
			this.back = [];
		}
	}

	/**
	 * Retrieves and removes the head of this queue.
	 */
	dequeue(): QueueItem {
		this.maybeFlip_();
		return this.front.pop();
	}

	/**
	 * Retrieves but does not remove the head of this queue.
	 */
	peek(): QueueItem {
		this.maybeFlip_();
		return peek(this.front);
	}

	/**
	 * Returns the number of elements in this queue.
	 */
	getCount(): number {
		return this.front.length + this.back.length;
	}

	/**
	 * Returns true if this queue contains no elements.
	 */
	isEmpty(): boolean {
		return isEmpty(this.front) && isEmpty(this.back);
	}

	/**
	 * Removes all elements from the queue.
	 */
	clear(): void {
		this.front = [];
		this.back = [];
	}

	/**
	 * Returns true if the given value is in the queue.
	 */
	contains(element: QueueItem): boolean {
		return contains(this.front, element) || contains(this.back, element);
	}

	/**
	 * Removes the first occurrence of a particular value from the queue.
	 */
	remove(element: QueueItem): boolean {
		return (
			removeLast(this.front, element) ||
			removeFromArray(this.back, element)
		);
	}

	/**
	 * Returns all the values in the queue.
	 */
	getValues(): Array<QueueItem> {
		let result = [];

		// Add the front array in reverse, then the back array.
		for (let i = this.front.length - 1; i >= 0; --i) {
			result.push(this.front[i]);
		}

		this.back.forEach(element => {
			result.push(element);
		});

		return result;
	}
}
