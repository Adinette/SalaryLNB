import { UserModel } from "../../../users/models/user_model";
import type SessionInterface from "../interfaces/session_interface";

export default class SessionModel implements SessionInterface {
	token: string;
	user: UserModel;
	access_token?: string;

	constructor(data: any) {
		this.user = new UserModel(data.user);
		// Mapping de sécurité : on prend access_token du back et on l'assigne aux deux
		this.access_token = data.access_token;
		this.token = data.token || data.access_token; // Utilise access_token comme fallback
	
		console.log("SessionModel Constructor - access_token capturé:", this.access_token);
	
	}

	toJson(): string {
		return JSON.stringify(this.toInterface());
	}

	toInterface(): SessionInterface {
		return {
			token: this.token,
			user: this.user.interface,
			access_token: this.access_token,
		};
	}
}
