import { DateRange } from '../value_objects/date_range';
import { Booking } from './booking';
import { Property } from './property';
import { User } from './user';

describe('Booking Entity', () => {
    it('Should create an instance of Booking with all attributes', () => {
        const property = new Property('1', 'My House', 'A beautiful house', 3, 100);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );
        
        const id = '1';
        const guestCount = 2;
        const booking = new Booking(id, property, user, dateRange, guestCount);

        expect(booking.getId()).toBe(id);
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
        expect(booking.getGuestCount()).toBe(guestCount);
    });

    it('Should check if property is available', () => {
        const property = new Property('1', 'My House', 'A beautiful house', 3, 100);
        const user = new User('1', 'Timoteo');
        const dateRange1 = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );
        const dateRange2 = new DateRange(
            new Date('2025-05-22'),
            new Date('2025-05-27'),
        );

        new Booking('1', property, user, dateRange1, 2);

        expect(property.isAvailable(dateRange1)).toBe(false);
        expect(property.isAvailable(dateRange2)).toBe(false);
    });

    it('Should throw error when guest is zero or negative', () => {
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 3, 100);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );

        expect(() => {
            new Booking('1', property, user, dateRange, 0);
        }).toThrow('Guest must be greather than zero');
    });

    it('Should throw error when try booking above max guest allowed', () => {
        const maxGuest = 3;
        const property = new Property('1', 'Casinha', 'Uma linda casinha', maxGuest, 100);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );

        expect(() => {
            new Booking('1', property, user, dateRange, 5);
        }).toThrow(`Max guest exceed. Guest max value is ${maxGuest}`);
    });

    it('Should calculate total price with discount', () => {
        // ARRANGE
        const pricePerNight = 300;
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 5, pricePerNight);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-01'),
            new Date('2025-05-10'),
        );

        // ACT
        const booking = new Booking('1', property, user, dateRange, 5);

        // ASSERT
        expect(booking.getTotalPrice()).toBe(pricePerNight * booking.getDateRange().getTotalNights() * 0.9);
    });

    it('Shouldn\'t do payment when property is not available', () => {
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 7, 100);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );
        const dateRange1 = new DateRange(
            new Date('2025-05-21'),
            new Date('2025-05-23'),
        );

        new Booking('1', property, user, dateRange, 5);

        expect(() => {
            new Booking('2', property, user, dateRange1, 3);
        }).toThrow('The property is not available for this date range');
    });

    it('Should cancel booking without refunded when it is cancelled one day before start date', () => {
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 7, 300);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-22'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);
        const currentDate = new Date('2025-05-20');
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(600);
    });

    it('Should cancel booking with total refund when it is cancelled seven day before start date', () => {
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 7, 300);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-21'),
            new Date('2025-05-25'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);
        const currentDate = new Date('2025-05-11');
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(0);
    });

    it('Should cancel booking with partial refund when it is cancelled between one and seven day before start date', () => {
        const pricePerNight = 300;
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 5, pricePerNight);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);
        const currentDate = new Date('2025-05-15');
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe('CANCELLED');
        expect(booking.getTotalPrice()).toBe(pricePerNight * booking.getDateRange().getTotalNights() * 0.5);
    });

    it('Should allow to cancel a booking only once', () => {
        const pricePerNight = 300;
        const property = new Property('1', 'Casinha', 'Uma linda casinha', 5, pricePerNight);
        const user = new User('1', 'Timoteo');
        const dateRange = new DateRange(
            new Date('2025-05-20'),
            new Date('2025-05-25'),
        );

        const booking = new Booking('1', property, user, dateRange, 5);
        const currentDate = new Date('2025-05-15');
        booking.cancel(currentDate);

        expect(() => {
            booking.cancel(currentDate);
        }).toThrow('Booking is already cancelled');
    });
});
