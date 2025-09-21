export default class SessionModel implements SessionInterface {
	token: string;
	user: UserModel;
	permanent_function: FunctionModel;
	interim_functions?: FunctionModel[];

	constructor(data: SessionInterface) {
		this.token = data.token;
		this.user = new UserModel(data.user);
		this.permanent_function = new FunctionModel(data.permanent_function);
		this.interim_functions = data.interim_functions
			? data.interim_functions.map((func) => new FunctionModel(func))
			: [];
	}

	toJson(): string {
		return JSON.stringify(this.toInterface());
	}

	toInterface(): SessionInterface {
		return {
			token: this.token,
			user: this.user.interface,
			permanent_function: this.permanent_function.interface,
			interim_functions: this.interim_functions
				? this.interim_functions.map((func) => func.interface)
				: [],
		};
	}
}
