import GNode from '../Node/g-node';
import { clear, isEmpty } from '../utils/array';
import { getValues as getObjectValues } from '../utils/object';

interface IHeap {
	clear(): void;
	clone(): Heap;
	containsKey(key: Key): boolean;
	containsValue(key: Value): boolean;
	getCount(): number;
	getKeys(): Array<Key>;
	getValues(): Array<Value>;
	insert(k: Key, v: Value): void;
	insertAll(heap: Heap): void;
	isEmpty(): boolean;
	peek(): Value;
	peekKey(): Key;
	remove(): Value;
}

type Key = string | number;
type Value = any;

/**
 * Class for a Heap data structure.
 * this file provides the implementation of a Heap data-structure. Smaller keys
 * rise to the top.
 *
 * The big-O notation for all operations are below:
 * <pre>
 *  Method          big-O
 * ----------------------------------------------------------------------------
 * - insert         O(logn)
 * - remove         O(logn)
 * - peek           O(1)
 * - contains       O(n)
 * </pre>
 */
export default class Heap implements IHeap {
	private nodes: Array<GNode> = [];

	constructor(initialValue?: object) {
		if (initialValue) {
			this.insertAll(initialValue);
		}
	}

	/**
	 * Gets the index of the parent of the node at the given index.
	 */
	private getParentIndex(index: number) {
		return (index - 1) >> 1;
	}

	/**
	 * Gets the index of the left child of the node at the given index.
	 */
	private getLeftChildIndex(index: number): number {
		return index * 2 + 1;
	}

	/**
	 * Gets the index of the right child of the node at the given index.
	 */
	private getRightChildIndex(index: number): number {
		return index * 2 + 2;
	}

	/**
	 * Moves the node at the given index down to its proper place in the heap.
	 */
	private moveDown(index: number) {
		let nodes = this.nodes;
		const count = this.nodes.length;

		// Save the node being moved down.
		const node = nodes[index];
		// While the current node has a child.
		while (index < count >> 1) {
			const leftChildIndex = this.getLeftChildIndex(index);
			const rightChildIndex = this.getRightChildIndex(index);

			// Determine the index of the smaller child.
			const smallerChildIndex =
				rightChildIndex < count &&
				nodes[rightChildIndex].getKey() < nodes[leftChildIndex].getKey()
					? rightChildIndex
					: leftChildIndex;

			// If the node being moved down is smaller than its children, the node
			// has found the correct index it should be at.
			if (nodes[smallerChildIndex].getKey() > node.getKey()) {
				break;
			}

			// If not, then take the smaller child as the current node.
			nodes[index] = nodes[smallerChildIndex];
			index = smallerChildIndex;
		}

		nodes[index] = node;
	}

	/**
	 * Moves the node at the given index up to its proper place in the heap.
	 */
	private moveUp(index: number) {
		let nodes = this.nodes;

		let node = nodes[index];

		// While the node being moved up is not at the root.
		while (index > 0) {
			// If the parent is less than the node being moved up, move the parent down.
			let parentIndex = this.getParentIndex(index);
			if (nodes[parentIndex].getKey() > node.getKey()) {
				nodes[index] = nodes[parentIndex];
				index = parentIndex;
			} else {
				break;
			}
		}

		nodes[index] = node;
	}

	/**
	 * Insert the given value into the heap with the given key.
	 */
	insert(k: Key, v: Value) {
		const node = new GNode(k, v);

		let nodes = this.nodes;

		nodes.push(node);

		this.moveUp(nodes.length - 1);
	}

	/**
	 * Adds multiple key-value pairs from another Heap or an Object
	 */
	insertAll(heap: Heap | object): void {
		let keys, values;

		if (heap instanceof Heap) {
			keys = heap.getKeys();
			values = heap.getValues();

			/**
			 * If it is a heap and the current heap is empty, I can rely
			 * on the fact that the keys/values are in the correct order
			 * to put in the underlying structure.
			 */
			if (this.getCount() <= 0) {
				let nodes = this.nodes;

				for (const [i, key] of keys.entries()) {
					nodes.push(new GNode(key, values[i]));
				}

				return;
			} else {
				keys = Object.keys(keys);
				values = getObjectValues(values);
			}

			for (const [i, key] of keys.entries()) {
				this.insert(key, values[i]);
			}
		}
	}

	remove(): Value {
		let nodes = this.nodes;
		const count = nodes.length;
		const rootNode = nodes[0];

		if (count <= 0) {
			return;
		} else if (count === 1) {
			clear(nodes);
		} else {
			//@ts-ignore
			nodes[0] = nodes.pop();

			this.moveDown(0);
		}

		return rootNode.getValue();
	}

	/**
	 * Retrieves but does not remove the root value of this heap.
	 */
	peek(): Value {
		const nodes = this.nodes;
		if (nodes.length === 0) {
			return;
		}
		return nodes[0].getValue();
	}

	/**
	 * Retrieves but does not remove the key of the root node of this heap.
	 */
	peekKey(): Key {
		return this.nodes[0] && this.nodes[0].getKey();
	}

	/**
	 * Whether the heap contains the given value.
	 */
	containsValue(value: Value): boolean {
		return this.nodes.some(node => node.getValue() === value);
	}

	/**
	 * Whether the heap contains the given key.
	 */
	containsKey(key: Key): boolean {
		return this.nodes.some(node => node.getKey() === key);
	}

	/**
	 * Clones a heap and returns a new heap
	 */
	clone(): Heap {
		return new Heap(this);
	}

	isEmpty(): boolean {
		return isEmpty(this.nodes);
	}

	clear() {
		clear(this.nodes);
	}

	/**
	 * The number of key-value pairs in the map
	 * @return {number} The number of pairs.
	 */
	getCount(): number {
		return this.nodes.length;
	}

	/**
	 * Gets the keys of the heap.
	 * @return {!Array<K>} The keys in the heap.
	 */
	getKeys(): Array<Key> {
		let nodes = this.nodes;

		return nodes.map(node => node.getKey());
	}

	/**
	 * Gets the values of the heap.
	 * @return {!Array<V>} The values in the heap.
	 */
	getValues(): Array<Value> {
		let nodes = this.nodes;

		return nodes.map(node => node.getValue());
	}
}
