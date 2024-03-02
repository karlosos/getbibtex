import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}
		const savedValue = localStorage.getItem(key);
		if (savedValue) {
			return JSON.parse(savedValue) as T;
		}
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
