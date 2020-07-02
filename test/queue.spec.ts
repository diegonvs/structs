import Queue from '../src/Queue/queue';

function makeQueue() {
	const q = new Queue();
	q.enqueue('a');
	q.enqueue('b');
	q.enqueue('c');
	q.enqueue('a');
	q.dequeue();
	q.enqueue('b');
	q.enqueue('c');
	// q is now: bcabc
	return q;
}

function stringifyQueue(queue: Queue) {
	const values = queue.getValues();
	let s = '';

	for (const value of values) {
		s += value;
	}

	return s;
}

describe('Queue', () => {
	describe('constructor', () => {
		test('queue should be empty initially', () => {
			const q = new Queue();

			expect(q.isEmpty()).toBeTruthy();
		});

		test('count should be 0', () => {
			const q = new Queue();

			expect(q.getCount()).toBe(0);
		});

		test('head element should be undefined', () => {
			const q = new Queue();

			expect(q.peek()).toBeUndefined();
		});
	});

	describe('count', () => {
		const queue = makeQueue();

		test('count should be 5', () => {
			expect(queue.getCount()).toBe(5);
		});

		test('count should be 6', () => {
			queue.enqueue('d');
			expect(queue.getCount()).toBe(6);
		});

		test('count should be 5', () => {
			queue.dequeue();

			expect(queue.getCount()).toBe(5);
		});

		test('count should be 0', () => {
			queue.clear();

			expect(queue.getCount()).toBe(0);
		});
	});

	describe('enqueue', () => {
		test('count should be 1', () => {
			const queue = new Queue();

			queue.enqueue('a');

			expect(queue.getCount()).toBe(1);
		});

		test('count should be 1', () => {
			const queue = new Queue();

			queue.enqueue('a');
			queue.enqueue('b');

			expect(queue.getCount()).toBe(2);
		});

		test("head element should be 'a'", () => {
			let queue = new Queue();
			queue.enqueue('a');
			queue.enqueue('b');

			expect(queue.peek()).toBe('a');
		});

		test('count should be 1', () => {
			let queue = new Queue();
			queue.enqueue('a');
			queue.enqueue('b');
			queue.dequeue();

			expect(queue.getCount()).toBe(1);
		});

		test("head element should be 'b'", () => {
			let queue = new Queue();
			queue.enqueue('a');
			queue.enqueue('b');
			queue.dequeue();

			expect(queue.peek()).toBe('b');
		});
	});

	describe('dequeue', () => {
		const queue = makeQueue();

		test('should return b', () => {
			expect(queue.dequeue()).toBe('b');
		});

		test('should return c', () => {
			expect(queue.dequeue()).toBe('c');
		});

		test('should return a', () => {
			expect(queue.dequeue()).toBe('a');
		});

		test('should return b', () => {
			expect(queue.dequeue()).toBe('b');
		});

		test('should return c', () => {
			expect(queue.dequeue()).toBe('c');
		});

		test('queue should be empty', () => {
			expect(queue.isEmpty()).toBeTruthy();
		});

		test('should return undefined for empty queue', () => {
			expect(queue.dequeue()).toBeUndefined();
		});
	});

	describe('peek', () => {
		const queue = makeQueue();

		test('should return b', () => {
			expect(queue.peek()).toBe('b');
		});

		test('should return peek() result', () => {
			expect(queue.dequeue()).toBe('b');
		});

		test('should return c', () => {
			expect(queue.peek()).toBe('c');
		});
	});

	describe('clear', () => {
		const queue = makeQueue();

		test('queue should be empty', () => {
			queue.clear();

			expect(queue.isEmpty()).toBeTruthy();
		});
	});

	describe('queue', () => {
		const queue = makeQueue();

		test('contents must be bcabc', () => {
			expect(stringifyQueue(queue)).toBe('bcabc');
		});
	});

	describe('remove', () => {
		const queue = makeQueue();

		test('contents must be bcabc', () => {
			expect(stringifyQueue(queue)).toBe('bcabc');
		});

		test('contents must be cabc', () => {
			queue.dequeue();

			expect(stringifyQueue(queue)).toBe('cabc');
		});

		test('contents must be cabca', () => {
			queue.enqueue('a');

			expect(stringifyQueue(queue)).toBe('cabca');
		});

		test('remove should have returned true', () => {
			expect(queue.remove('c')).toBeTruthy();
		});

		test('contents must be abca', () => {
			expect(stringifyQueue(queue)).toBe('abca');
		});

		test('remove should have returned true', () => {
			expect(queue.remove('b')).toBeTruthy();
		});

		test('contents must be aca', () => {
			expect(stringifyQueue(queue)).toBe('aca');
		});

		test('remove should have returned false', () => {
			expect(queue.remove('b')).toBeFalsy();
		});

		test('remove should have returned true', () => {
			expect(queue.remove('a')).toBeTruthy();
		});

		test('contents must be ca', () => {
			expect(stringifyQueue(queue)).toBe('ca');
		});

		test('remove should have returned true', () => {
			expect(queue.remove('a'));
		});

		test('contents must be c', () => {
			expect(stringifyQueue(queue)).toBe('c');
		});
	});

	describe('contains', () => {
		const queue = makeQueue();

		test('contains should have returned true', () => {
			expect(queue.contains('a')).toBeTruthy();
		});

		test('contains should have returned false', () => {
			expect(queue.contains('foobar')).toBeFalsy();
		});
	});
});
