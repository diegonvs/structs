import CircularBuffer from '../src/CircularBuffer/circular-buffer';

describe('Circular Buffer', () => {
	test('should work properly', () => {
		const buff = new CircularBuffer(2);

		expect(buff.add('first')).toBeUndefined();
		expect(buff.getCount()).toBe(1);
		expect(buff.get(0)).toBe('first');
		expect(buff.getLast()).toBe('first');

		expect(buff.add('second')).toBeUndefined();
		expect(buff.getCount()).toBe(2);
		expect(buff.get(0)).toBe('first');
		expect(buff.get(1)).toBe('second');
		expect(buff.getLast()).toBe('second');

		expect(buff.add('third')).toBe('first');
		expect(buff.getCount()).toBe(2);
		expect(buff.get(0)).toBe('second');
		expect(buff.get(1)).toBe('third');
		expect(buff.getLast()).toBe('third');
	});

	test('should check if the circular buffer is empty', () => {
		const buff = new CircularBuffer(2);

		expect(buff.isEmpty()).toBeTruthy();

		expect(buff.add('first')).toBeUndefined();
		expect(buff.isEmpty()).toBeFalsy();
	});

	test('should be empty after clear', () => {
		const buff = new CircularBuffer(2);

		expect(buff.add('first')).toBeUndefined();

		buff.clear();

		expect(buff.isEmpty()).toBeTruthy();
	});

	test('should return correct values when using getValues', () => {
		const buff = new CircularBuffer(2);

		expect(buff.add('first')).toBeUndefined();
		expect(buff.add('second')).toBeUndefined();

		expect(buff.getValues()).toStrictEqual(['first', 'second']);
	});

	test('should return the newest values correctly', () => {
		const buff = new CircularBuffer(5);

		expect(buff.add('first')).toBeUndefined();
		expect(buff.add('second')).toBeUndefined();
		expect(buff.add('third')).toBeUndefined();
		expect(buff.add('fourth')).toBeUndefined();
		expect(buff.add('fifth')).toBeUndefined();

		expect(buff.getNewestValues(2)).toStrictEqual(['fourth', 'fifth']);
	});

	test('should return all circular buffer keys', () => {
		const buff = new CircularBuffer(2);

		expect(buff.add('first')).toBeUndefined();

		expect(buff.add('second')).toBeUndefined();

		expect(buff.getKeys()).toStrictEqual([0, 1]);
	});

	test('should checks if circular buffer has a value', () => {
		const buff = new CircularBuffer(2);

		expect(buff.add('first')).toBeUndefined();
		expect(buff.add('second')).toBeUndefined();

		expect(buff.containsValue('first')).toBeTruthy();
		expect(buff.containsValue('second')).toBeTruthy();
		expect(buff.containsValue('third')).toBeFalsy();
	});

	test('should checks if circular buffer has a key', () => {
		const buff = new CircularBuffer(3);

		expect(buff.add('first')).toBeUndefined();
		expect(buff.add('second')).toBeUndefined();
		expect(buff.add('third')).toBeUndefined();

		expect(buff.containsKey(0)).toBeTruthy();
		expect(buff.containsKey('0')).toBeTruthy();
		expect(buff.containsKey(1)).toBeTruthy();
		expect(buff.containsKey('1')).toBeTruthy();
		expect(buff.containsKey(2)).toBeTruthy();
		expect(buff.containsKey('2')).toBeTruthy();
		expect(buff.containsKey(3)).toBeFalsy();
		expect(buff.containsKey('3')).toBeFalsy();
	});
});
