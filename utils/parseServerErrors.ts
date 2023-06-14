interface ErrorObject {
	[key: string]: string[];
}

export default function parseServerErrors(error: ErrorObject): string {
	let errorMessage = '';

	for (const field in error) {
		if (error.hasOwnProperty(field)) {
			const fieldErrors = error[field].join(', ');
			errorMessage += `${fieldErrors} `;
		}
	}

	return errorMessage.trim();
}
