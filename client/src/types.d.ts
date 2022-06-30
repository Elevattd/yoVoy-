export interface Event {
	id: string;
	name: string;
	description?: string;
	background_image: string;
	organization: Organization;
	categories: Category[];
	locations: Location[];
}

export interface postCategory {
	name: string;
}

//-------post for comment------

export interface postComment {
	text: string;
}
//-----------------------------

export interface postOrganization {
	name: string;
}

export interface getOrganization {
	name: string;
	id: number;
}

export interface getTickets {
	id: number;
	status: string;
	status_detail: string;
	quantity: number;
	event: event;
	user: user;
	transaction_amount: number;
}

export interface user {
	id: number;
	name: string;
}

export interface event {
	id: number;
	name: string;
}

export interface putEvent {
	name: string;
	description: string;
	background_image: string;
	categoriesIds: number[];
	locations: putLocation[];
}

export interface putLocation {
	id: number;
	dates: any[];
}

export interface Organization {
	id: string;
	name: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface putRolUser {
	usedId: number;
	roleId: number[];
}

export interface Location {
	id: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number
	city: City;
	dates: Dates[];
}
export interface City {
	id: number;
	name: string;
}

export interface Dates {
	id: number;
	date: Date;
	price: number;
}

export interface User {
	name: string;
	email: string;
	roles: any;
	id: any;
}

export interface Filter {
	filter: string;
	id: string | number;
}

export interface Ticket {
	paymentId: number;
	status: string;
	status_detail: string;
	paymentType: string;
	transaction_amount: number;
	quantity: number;
	event: {
		name: string;
	};
}

export interface Item {
	img: string;
	name: string;
	id: number;
	price: number;
	date: string;
	quantity?: any | number;
}
