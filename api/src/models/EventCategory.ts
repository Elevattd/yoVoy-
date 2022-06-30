import {Model, Column, Table, ForeignKey} from 'sequelize-typescript';
import { Category } from './Category';
import { Event } from './Event';



@Table
export class EventCategory extends Model<EventCategory> {
    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @ForeignKey(() => Category)
    @Column
    categoryId!: number
}
