import GNode from '../src/Node/g-node';

describe('GNode', () => {
	it('should create a Node', () => {
		const node = new GNode('a', 1);

		expect(node).toBeDefined();

		expect(node.getKey()).toBe('a');
		expect(node.getValue()).toBe(1);
	});
	it('should clone a Node', () => {
		const node = new GNode('a', 1);

		const clonedNode = node.clone();

		expect(node).not.toBe(clonedNode);

		expect(node.getKey()).toBe('a');
		expect(node.getValue()).toBe(1);
	});
});
