import {Model, Column, Table, BelongsTo, ForeignKey, DataType, Default} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Ticket extends Model<Ticket> {

    @Column(DataType.STRING(500))
    preferenceId!: string;

    @Column
    status!: string;

    @Column
    status_detail!: string
    
    @Column
    paymentId!: number;
    
    @Column
    paymentType!: string;

    @Column
    transaction_amount!: number;

    @Column
    quantity!: number;

    @Column
    location!: string;

    @Column
    date!: string

    @Default(false)
    @Column
    confirmation_email!: boolean

    @Default(false)
    @Column
    ticket_email!: boolean
    
    @ForeignKey(() => Event)
    @Column
    eventId!: number

    @BelongsTo(() => Event)
    event!: Event

    @ForeignKey(() => User)
    @Column
    userId!: number

    @BelongsTo(()=> User)
    user!: User
}
