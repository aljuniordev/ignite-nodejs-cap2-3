import { v4 as uuidv4 } from 'uuid';
import {Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity("users")
class User {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: String;

    @Column()
    password: String;

    @Column()
    email: String;

    @Column()
    driver_license: String;
    
    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export {User};