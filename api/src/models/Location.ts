import {Model, Column, Table, BelongsTo, ForeignKey, HasMany ,BelongsToMany, DataType} from 'sequelize-typescript';
import { City } from './City';
import { Event } from './Event';
import { EventLocation } from './EventLocation';


@Table
export class Location extends Model<Location> {
    @Column
    name!: string;

    @Column
    address!: string;

    @Column(DataType.DOUBLE)
    latitude!: number;

    @Column(DataType.DOUBLE)
    longitude!: number;

    @BelongsToMany(() => Event, () => EventLocation)
    events!: Event[]

    @HasMany(()=> EventLocation)
    events_dates!: EventLocation[]

    @ForeignKey(() => City)
    @Column
    cityId!: number; 

    @BelongsTo(() => City)
    city!: City;
}