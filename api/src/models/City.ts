import { Model, Column, Table, HasMany } from 'sequelize-typescript';
import { Location } from './Location';


@Table
export class City extends Model<City> {
    @Column
    name!: string;

    @HasMany(() => Location)
    locations!: Location[];
} 