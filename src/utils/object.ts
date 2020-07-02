type KVObject = {
	[key: string]: any;
};

export function getValues(object: KVObject): Array<any> {
	let result = [];
	let i = 0;

	for (const key in object) {
		result[i++] = object[key];
	}

	return result;
}
