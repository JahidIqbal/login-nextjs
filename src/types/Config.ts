import { joinUrlPaths } from "@/utils/UrlUtil";

enum AppMode {
	development = "development",
	production = "production",
}

export interface Config {
	appMode: AppMode;
	isInProduction: () => boolean;
	apiUrl: string;
	appUrl: string;
	makeApiUrl: (path: string) => string;
	makeAppUrl: (path: string) => string;
	redis: {
		host: string;
		port: number;
	};
}

const getAppMode = (): AppMode => {
	const mode = process.env.APP_ENVIRONMENT;
	if (!mode) return AppMode.production;
	if (!(mode in AppMode)) return AppMode.production;

	return mode as AppMode;
};


const getRedisPort = () => {
	const p = process.env.REDIS_PORT;
	return p ? parseInt(p) : 6379;
  };

const getRedisConfig = () => {
	return {
		host: process.env.REDIS_HOST ?? "redis",
		port: getRedisPort(),
	};
};

const appMode = getAppMode();
const apiUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
const appUrl = process.env.APP_URL ?? "http://localhost:3000";

const config: Config = {
	appMode,
	isInProduction: () => appMode === AppMode.production,
	apiUrl,
	appUrl,
	makeApiUrl: (path: string) => joinUrlPaths(apiUrl, path),
	makeAppUrl: (path: string) => joinUrlPaths(appUrl, path),
	redis: getRedisConfig(),
};

export default config;
