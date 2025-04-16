"use server"
import AuthManager from "@/services/AuthManager";

export const logout = async () => {
	let tokenData = await AuthManager.logout();
	return tokenData;
};