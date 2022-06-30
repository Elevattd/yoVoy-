import {Model, Column, Table, BelongsTo, ForeignKey, DataType, Default} from 'sequelize-typescript';
import { EventLocation } from './EventLocation';



@Table
export class Date extends Model<Date> {
    @Column
    date!: string;

    @Column
    price!: number;

    @Default("active")
    @Column(DataType.ENUM("active","inactive", "canceled"))
    status!: string

    @Column
    total_tickets!: number;
    
    @Default(0)
    @Column
    tickets_sold!: number;

    @ForeignKey(() => EventLocation)
    @Column
    eventLocationId!: number

    @BelongsTo(() => EventLocation)
    event!: EventLocation
}