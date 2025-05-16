import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";

export class FakePropertyRepository implements PropertyRepository {
    private properties: Property[] = [
        new Property('111', 'John Doe\'s House', 'Blue House', 3, 80),
        new Property('222', 'Jane Smith\'s House', 'Pink House', 7, 170),
    ];

    public async findById(id: string): Promise<Property | null> {
        const property = this.properties.find(property => property.getId() === id);

        if (!property) {
            return null;
        }

        return property;
    }

    public async save(property: Property): Promise<void> {
        this.properties.push(property);
    }
}
