import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
    private readonly bookings: Booking[] = [];

    constructor(
        private id: string,
        private title: string,
        private description: string,
        private maxGuest: number,
        private pricePerNight: number,
    ) {
        this.validateAttributes(title, maxGuest);
    }

    private validateAttributes(title: string, maxGuest: number): void {
        if (!title) {
            throw new Error('Property need to have a title');
        }

        if (maxGuest <= 0) {
            throw new Error('Property need to max guest greather than zero');
        }
    }

    public validateGuestCount(guestCount: number): void {
        if (guestCount > this.maxGuest) {
            throw new Error(`Max guest exceed. Guest max value is ${this.maxGuest}`);
        }
    }

    public calculateTotalPrice(dateRange: DateRange): number {
        const totalNights = dateRange.getTotalNights();
        const totalPrice = totalNights * this.pricePerNight;
        if (totalNights >= 7) {
            return totalPrice * 0.9;
        }
        return totalPrice;
    }

    public isAvailable(dateRange: DateRange): boolean {
        return !this.bookings.some(booking => (
            booking.getStatus() === 'CONFIRMED' && booking.getDateRange().overlap(dateRange)
        ));
    }

    public addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }

    public getBookings(): Booking[] {
        return this.bookings;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getMaxGuest(): number {
        return this.maxGuest;
    }

    public getPricePerNight(): number {
        return this.pricePerNight;
    }
}
