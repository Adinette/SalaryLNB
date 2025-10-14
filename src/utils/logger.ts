/** Configuration globale de l'application (environnement, etc.) */
import config from "../config";
import { EnvEnum } from "../enums";
import { type ConsolaInstance, createConsola, LogLevels } from "consola/basic";

/**
 * Classe de journalisation permettant d'afficher différents niveaux de logs
 * en fonction de l'environnement (désactivée en production).
 */
export class AppLogger {
	/** Instance interne de consola pour la gestion des logs */
	private logger: ConsolaInstance;
	/** Indique si le logger est activé (désactivé en production) */
	private isEnabled: boolean;
	/** Le scope (nom du module/section) pour ce logger */
	private scope: string;

	/**
	 * Crée une nouvelle instance de logger avec un scope défini.
	 * @param scope - Nom du scope pour le logger (par défaut : "APP").
	 */
	constructor({ scope = "APP" } = {}) {
		this.logger = createConsola({ level: LogLevels.verbose });
		this.isEnabled = config.env.apiUrl !== EnvEnum.PRODUCTION;
		this.isEnabled = true;
		this.scope = scope;
	}

	/**
	 * Logue un message d'information.
	 * @param message - Le message à logger.
	 * @param args - Arguments supplémentaires à logger.
	 */
	info(message: string, ...args: any[]): void {
		if (this.isEnabled) this.logger.info(`[${this.scope}]`, message, ...args);
	}

	/**
	 * Logue un message de succès.
	 * @param message - Le message à logger.
	 * @param args - Arguments supplémentaires à logger.
	 */
	success(message: string, ...args: any[]): void {
		if (this.isEnabled) this.logger.success(`[${this.scope}]`, message, ...args);
	}

	/**
	 * Logue un message d'avertissement.
	 * @param message - Le message à logger.
	 * @param args - Arguments supplémentaires à logger.
	 */
	warn(message: string, ...args: any[]): void {
		if (this.isEnabled) this.logger.warn(`[${this.scope}]`, message, ...args);
	}

	/**
	 * Logue un message d'erreur.
	 * @param message - Le message à logger.
	 * @param args - Arguments supplémentaires à logger.
	 */
	error(message: string, ...args: any[]): void {
		if (this.isEnabled) this.logger.error(`[${this.scope}]`, message, ...args);
	}

	/**
	 * Logue un message de débogage.
	 * @param message - Le message à logger.
	 * @param args - Arguments supplémentaires à logger.
	 */
	debug(message: string, ...args: any[]): void {
		if (this.isEnabled) {
			this.logger.debug(`[${this.scope}]`, message, ...args);
		}
	}
}

/**
 * Logger global de l'application prêt à être utilisé.
 * Désactivé automatiquement en production.
 */
export const appLogger = new AppLogger({ scope: config.env.apiUrl });

/**
 * Crée un nouveau logger avec un scope personnalisé.
 * @param scope - Le nom du module ou de la section pour ce logger
 * @returns Une instance de Logger avec le scope spécifié
 * @example
 * const apiLogger = createLogger('API');
 * apiLogger.info('Requête reçue'); // Affiche: [API] Requête reçue
 */
export const createLogger = (scope: string): AppLogger => {
	return new AppLogger({ scope });
};
