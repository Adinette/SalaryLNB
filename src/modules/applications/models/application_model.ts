import type { ApplicationInterface } from "../interfaces/application_interface";

export class ApplicationModel implements ApplicationInterface {
	id: ApplicationInterface["id"];
	name: ApplicationInterface["name"];
	description: ApplicationInterface["description"];
	icon: ApplicationInterface["icon"];
	version: ApplicationInterface["version"];
	notifications: ApplicationInterface["notifications"];
	color: ApplicationInterface["color"];
	url: ApplicationInterface["url"];

	constructor(app: ApplicationInterface) {
		this.id = app.id;
		this.name = app.name;
		this.description = app.description;
		this.icon = app.icon;
		this.version = app.version;
		this.notifications = app.notifications;
		this.color = app.color;
		this.url = app.url;
	}

	get interface(): ApplicationInterface {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			icon: this.icon,
			version: this.version,
			notifications: this.notifications,
			color: this.color,
			url: this.url,
		};
	}

	get json(): string {
		return JSON.stringify(this.interface);
	}
}
