import {Model, Column, Table, BelongsToMany} from 'sequelize-typescript';
import { Event } from './Event';
import { EventCategory } from './EventCategory';

@Table
export class Category extends Model<Category> {
    @Column
    name!: string;

    @BelongsToMany(() => Event, () => EventCategory)
    events!: Event[]
}
