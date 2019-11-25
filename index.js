import numberIsNan from 'number-is-nan';

const SEPARATOR_CHARACTER = '&';
const EQUALS_CHARACTER = '=';
const SEPARATOR_CHARACTER_REGEX = new RegExp(SEPARATOR_CHARACTER, 'g');
const ESCAPED_STRING_REGEX = /^_escape=/;

/**
 * @param  {string}   searchParamsString
 * @param  {string}   splitWith
 * @param  {string[]}   replaceWith
 * @param  {string}   joinWith
 * @param  {Function} callback
 *
 * @returns {string}
 */
function customQueryStringParser(
	searchParamsString,
	splitWith,
	replaceWith,
	joinWith,
	callback = (substring) => substring
) {
	return searchParamsString
		.split(splitWith)
		.map((substring) =>
			callback(substring.replace(replaceWith[0], replaceWith[1]))
		)
		.join(joinWith);
}

/**
 * @param  {*} input
 * @param  {string} separator
 * @param  {string} equals
 *
 * @returns {string}
 */
function stringify(
	input,
	separator = SEPARATOR_CHARACTER,
	equals = EQUALS_CHARACTER
) {
	if (
		typeof input === 'undefined' ||
		typeof input === 'number' ||
		Array.isArray(input) ||
		input === null ||
		[false, true].indexOf(input) !== -1
	) {
		return '';
	}

	const searchParams = new URLSearchParams();

	Object.entries(input)
		.map(([key, value]) => {
			if (
				value === Infinity ||
				numberIsNan(value) ||
				typeof value === 'function' ||
				(typeof value === 'object' && !Array.isArray(value))
			) {
				return [key, ''];
			}
			return [key, value];
		})
		.forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach((arrayItem) => {
					searchParams.append(key, arrayItem);
				});
			} else {
				searchParams.set(key, value);
			}
		});

	let searchParamsString = searchParams.toString();

	if (separator !== SEPARATOR_CHARACTER || equals !== EQUALS_CHARACTER) {
		searchParamsString = customQueryStringParser(
			searchParamsString,
			SEPARATOR_CHARACTER,
			[EQUALS_CHARACTER, equals],
			separator
		);
	}

	return searchParamsString;
}

/**
 * @param  {string} input
 * @param  {string} separator
 * @param  {string} equals
 *
 * @returns {Object}
 */
function parse(
	input,
	separator = SEPARATOR_CHARACTER,
	equals = EQUALS_CHARACTER
) {
	const searchParamsObject = Object.create(null);

	if (input === null || typeof input === 'undefined') {
		return searchParamsObject;
	}

	let searchParamsString = input;

	if (separator !== SEPARATOR_CHARACTER || equals !== EQUALS_CHARACTER) {
		const encodedSeparatorCharacter = encodeURIComponent(
			SEPARATOR_CHARACTER
		);
		searchParamsString = customQueryStringParser(
			searchParamsString,
			separator,
			[equals, EQUALS_CHARACTER],
			SEPARATOR_CHARACTER,
			(substring) => {
				SEPARATOR_CHARACTER_REGEX.lastIndex = 0;
				return substring.replace(
					SEPARATOR_CHARACTER_REGEX,
					encodedSeparatorCharacter
				);
			}
		);
	}

	const searchParams = new URLSearchParams(searchParamsString);

	searchParams.forEach((value, key) => {
		searchParamsObject[key] = null;
	});

	Object.keys(searchParamsObject).forEach((key) => {
		searchParamsObject[key] = searchParams.getAll(key);
	});

	const filteredSearchParamsObject = Object.entries(searchParamsObject)
		.map(([key, value]) => {
			if (Array.isArray(value) && value.length === 1) {
				return [key, value[0]];
			}
			return [key, value];
		})
		.reduce((object_, [key, value]) => {
			object_[key] = value;
			return object_;
		}, Object.create(null));

	return filteredSearchParamsObject;
}

/**
 * @param  {*} input
 *
 * @returns {string}
 */
function qsEscape(input) {
	const searchParams = new URLSearchParams({ _escape: input });
	return searchParams.toString().replace(ESCAPED_STRING_REGEX, '');
}

/**
 * @param  {*} input
 *
 * @returns {string}
 */
function qsUnescape(input) {
	const searchParams = new URLSearchParams(`_unescape=${input}`);
	return searchParams.get('_unescape');
}

export {
	qsUnescape as unescape,
	qsEscape as escape,
	stringify,
	stringify as encode,
	parse,
	parse as decode
};
