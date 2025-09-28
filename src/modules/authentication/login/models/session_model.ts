import { UserModel } from "../../../users/models/user_model";
import type SessionInterface from "../interfaces/session_interface";

export default class SessionModel implements SessionInterface {
	token: string;
	user: UserModel;

	constructor(data: SessionInterface) {
		this.token = data.token;
		this.user = new UserModel(data.user);
	}

	toJson(): string {
		return JSON.stringify(this.toInterface());
	}

	toInterface(): SessionInterface {
		return {
			token: this.token,
			user: this.user.interface,
		};
	}
}
