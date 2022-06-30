import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import { Event } from './Event';

@Table
export class Favorites extends Model<Favorites> {
    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @ForeignKey(() => User)
    @Column
    userId!: number
}