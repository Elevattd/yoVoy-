import { iCity } from "./city";
import { iDate } from "./date";

export interface iLocation {
	id: number;
	name: string;
	address: string;
	map: string;
	city?: iCity;
	dates?: iDate[];
}
