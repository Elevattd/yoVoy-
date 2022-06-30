import {Model, Column, Table, HasMany, BelongsTo, ForeignKey, Default, DataType} from 'sequelize-typescript';
import { Event } from './Event';
import { User } from './User';

@Table
export class Organization extends Model<Organization> {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Default("active")
    @Column(DataType.ENUM("active","banned"))
    status!: string

    @Column
    name!: string;

    @Column
    cuit!: string;

    @Column
    phone_number!: string;
    
    @Column
    cbu!: string;

    @Column
    business_email!: string;

    @Column
    alias!: string;

    @HasMany(() => Event)
    events!: Event[]
}