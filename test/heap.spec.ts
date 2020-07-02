import Heap from '../src/Heap/heap';

function makeHeap(...arguments_: any[]): Heap {
	const h = new Heap();
	let key, value;

	// eslint-disable-next-line unicorn/no-for-loop
	for (let i = 0; i < arguments_.length; i++) {
		key = arguments_[i][0];
		value = arguments_[i][1];
		h.insert(key, value);
	}

	return h;
}

describe('should', () => {
	test('getCount', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		expect(h.getCount()).toBe(4);

		h.remove();

		expect(h.getCount()).toBe(3);
	});

	test('getCount should be zero when cleaning up the Heap', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		h.remove();
		h.remove();
		h.remove();
		h.remove();

		expect(h.getCount()).toBe(0);
	});

	test('keys', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		const keys = h.getKeys();

		expect(keys).toHaveLength(4);
	});

	test('values', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		const [
			firstValue,
			secondValue,
			thirdValue,
			fourthValue,
		] = h.getValues();

		expect(firstValue).toBe('a');
		expect(secondValue).toBe('b');
		expect(thirdValue).toBe('c');
		expect(fourthValue).toBe('d');

		expect(h.getValues().length).toBe(4);
	});

	test('containsKey', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		for (let i = 0; i < 4; i++) {
			expect(h.containsKey(i)).toBeTruthy();
		}

		expect(h.containsKey(4)).toBeFalsy();
	});

	test('containsValue', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		const [
			firstValue,
			secondValue,
			thirdValue,
			fourthValue,
		] = h.getValues();

		expect(h.containsValue(firstValue)).toBeTruthy();
		expect(h.containsValue(secondValue)).toBeTruthy();
		expect(h.containsValue(thirdValue)).toBeTruthy();
		expect(h.containsValue(fourthValue)).toBeTruthy();

		expect(h.containsValue('e')).toBeFalsy();
	});

	test('clone', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		const h2 = h.clone();

		expect(h2.isEmpty()).not.toBeTruthy();
		expect(h2.containsKey(0)).toBeTruthy();
		expect(h2.containsValue('a')).toBeTruthy();
	});

	test('clear', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		h.clear();

		expect(h.isEmpty()).toBeTruthy();
	});

	test('isEmpty', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		expect(h.isEmpty()).toBeFalsy();

		h.remove();
		h.remove();
		h.remove();
		expect(h.isEmpty()).toBeFalsy();

		h.remove();
		expect(h.isEmpty()).toBeTruthy();
	});

	test('peek', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		expect(h.peek()).toBe('a');

		const h2 = makeHeap([1, 'b'], [3, 'd'], [0, 'a'], [2, 'c']);
		expect(h2.peek()).toBe('a');

		const h3 = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		h3.clear();
		expect(h3.peek()).toBeUndefined();
	});

	test('peekKey', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		expect(h.peekKey()).toBe(0);

		const h2 = makeHeap([1, 'b'], [3, 'd'], [0, 'a'], [2, 'c']);
		expect(h2.peekKey()).toBe(0);

		const h3 = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);
		h3.clear();

		expect(h3.peekKey()).toBeUndefined();
	});

	test('remove', () => {
		const h = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		expect(h.remove()).toBe('a');
		expect(h.remove()).toBe('b');
		expect(h.remove()).toBe('c');
		expect(h.remove()).toBe('d');

		const h2 = makeHeap([1, 'b'], [3, 'd'], [0, 'a'], [2, 'c']);

		expect(h2.remove()).toBe('a');
		expect(h2.remove()).toBe('b');
		expect(h2.remove()).toBe('c');
		expect(h2.remove()).toBe('d');
		expect(h2.remove()).toBeUndefined();
	});

	test('insertPeek', () => {
		const h = makeHeap();

		h.insert(3, 'd');
		expect(h.peek()).toBe('d');

		h.insert(2, 'c');
		expect(h.peek()).toBe('c');

		h.insert(1, 'b');
		expect(h.peek()).toBe('b');

		h.insert(0, 'a');
		expect(h.peek()).toBe('a');
	});

	test('insertAllPeek', () => {
		const h1 = makeHeap([1, 'e']);
		const h2 = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		h1.insertAll(h2);
		expect(h1.peek()).toBe('a');

		const h3 = makeHeap([-1, 'z']);
		const h4 = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		h3.insertAll(h4);
		expect(h3.peek()).toBe('z');

		const h5 = makeHeap();
		const h6 = makeHeap([0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']);

		h5.insertAll(h6);
		expect(h5.peek()).toBe('a');
	});
});
