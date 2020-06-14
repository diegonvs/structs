type Key = string | number;

type Value = any;

interface IGNode {
	getKey(): Key;

	getValue(): Value;

	clone(): IGNode;
}

export default class GNode implements IGNode {
	private key: Key;
	private value: Value;

	constructor(key: Key, value: Value) {
		this.key = key;
		this.value = value;
	}

	getKey() {
		return this.key;
	}

	getValue() {
		return this.value;
	}

	public clone() {
		return new GNode(this.key, this.value);
	}
}
