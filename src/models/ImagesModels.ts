import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Orphanages from './OrphanageModels';


@Entity('images')
export default class Image{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=> Orphanages, orphanage => orphanage.images)
    @JoinColumn({name:'orphanage_id'})
    orphanage: Orphanages;

}