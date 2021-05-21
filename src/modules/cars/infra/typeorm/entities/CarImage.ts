import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4} from "uuid";
import { Car } from "./Car";

@Entity("cars_image")
class CarImage {

    @PrimaryColumn()
    id: string;

    @OneToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @Column()
    created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export {CarImage}