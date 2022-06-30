import { Ticket } from "../models/Ticket";

export interface iUser {
    name : string;
    password : string;
    id?:number;
    email : string;
    refreshToken? : string;
    ticket? : Ticket
    rolesId?: number[];
    organizationId?: number;
  }
