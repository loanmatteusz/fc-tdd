import { Property } from './property';
import { DateRange } from '../value_objects/date_range';
import { User } from './user';
import { Booking } from './booking';

describe('Property Entity', () => {
    it('Should create an instance with all attributes', () => {
        const id = '1';
        const title = 'Casa';
        const description = 'Uma linda casinha';
        const maxGuest = 3;
        const pricePerNight = 80.0;

        const property = new Property(id, title, description, maxGuest, pricePerNight);

        expect(property.getId()).toBe(id);
        expect(property.getTitle()).toBe(title);
        expect(property.getDescription()).toBe(description);
        expect(property.getMaxGuest()).toBe(maxGuest);
        expect(property.getPricePerNight()).toBe(pricePerNight);
    });

    it('Should throw error case title is empty', () => {
        const id = '1';
        const title = '';
        const description = 'Uma linda casinha';
        const maxGuest = 3;
        const pricePerNight = 80.0;

        expect(() => {
            new Property(id, title, description, maxGuest, pricePerNight);
        }).toThrow('Property need to have a title');
    });

    it('Should throw error case max guest is zero or negative', () => {
        const id = '1';
        const title = 'Casinha';
        const description = 'Uma linda casinha';
        const pricePerNight = 80.0;

        expect(() => {
            new Property(id, title, description, 0, pricePerNight);
        }).toThrow('Property need to max guest greather than zero');

        expect(() => {
            new Property(id, title, description, -1, pricePerNight);
        }).toThrow('Property need to max guest greather than zero');
    });

    it('Should check max guest', () => {
        const id = '1';
        const title = 'Casinha';
        const description = 'Uma linda casinha';
        const maxGuest = 5;
        const pricePerNight = 80.0;

        const property = new Property(id, title, description, maxGuest, pricePerNight);

        expect(() => {
            property.validateGuestCount(6);
        }).toThrow(`Max guest exceed. Guest max value is ${maxGuest}`);
    });

    it('Shouldn\'t apply discount for stays of less than 7 days', () => {
        const id = '1';
        const title = 'Casinha';
        const description = 'Uma linda casinha';
        const maxGuest = 5;
        const pricePerNight = 100.0;

        const property = new Property(id, title, description, maxGuest, pricePerNight);
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-26'),
        );

        const totalPrice = property.calculateTotalPrice(dateRange);

        expect(totalPrice).toBe(600);
    });

    it('Should apply discount for stays of greather than or equal 7 days', () => {
        const id = '1';
        const title = 'Casinha';
        const description = 'Uma linda casinha';
        const maxGuest = 5;
        const pricePerNight = 100.0;

        const property = new Property(id, title, description, maxGuest, pricePerNight);
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-27'),
        );

        const totalPrice = property.calculateTotalPrice(dateRange);

        expect(totalPrice).toBe(630);
    });

    it('Should add booking in property booking list', () => {
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 7, 100);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);

        expect(booking.getProperty().getBookings()).toHaveLength(1);
    });
});
