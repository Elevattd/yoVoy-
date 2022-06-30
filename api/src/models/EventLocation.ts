import {Model, Column, Table, ForeignKey, HasMany, PrimaryKey, AutoIncrement, BelongsTo} from 'sequelize-typescript';
import { Location } from './Location';
import { Event } from './Event';
import { Date } from './Date';



@Table
export class EventLocation extends Model<EventLocation> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;
    
    @HasMany(() => Date)
    dates!: Date[]

    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @BelongsTo(() => Event)
    event!: Event

    @ForeignKey(() => Location)
    @Column
    locationId!: number

    @BelongsTo(() => Location)
    location!: Location

}