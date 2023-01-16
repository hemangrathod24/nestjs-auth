import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number;

@Column({
    name: 'first_name'
})
firstName: string;


@Column({
    name: 'last_name'
})
lastName: string

@Column({
    name: 'user_name'
})
userName: string

@Column()
password: string

}
