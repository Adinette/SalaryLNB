import type { ApiErrorData } from ".";
import ApiError from "./ApiError";

export default class BadRequestApiError extends ApiError {
	constructor({ message, data }: ApiErrorData) {
		super(400, "Mauvaise requête", message, data);
	}
}
