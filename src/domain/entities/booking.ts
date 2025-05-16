import { RefundRuleFactory } from "../cancelation/refund_rule_factory";
import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    private readonly id: string;
    private readonly property: Property;
    private readonly user: User;
    private readonly dateRange: DateRange;
    private readonly guestCount: number;

    private status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    private totalPrice: number;

    constructor(
        id: string,
        property: Property,
        user: User,
        dateRange: DateRange,
        guestCount: number,
    ) {
        if (guestCount <= 0) {
            throw new Error('Guest must be greather than zero');
        }
        if (!property.isAvailable(dateRange)) {
            throw new Error('The property is not available for this date range');
        }

        property.validateGuestCount(guestCount);

        this.id = id;
        this.property = property;
        this.user = user;
        this.dateRange = dateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(dateRange);

        this.property.addBooking(this);
    }

    public getStatus(): 'CONFIRMED' | 'CANCELLED' {
        return this.status;
    }

    public getId(): string {
        return this.id;
    }

    public getProperty(): Property {
        return this.property;
    }

    public getUser(): User {
        return this.user;
    }

    public getDateRange(): DateRange {
        return this.dateRange;
    }

    public getGuestCount(): number {
        return this.guestCount;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public cancel(currentDate: Date): void {
        if (this.status === 'CANCELLED') {
            throw new Error('Booking is already cancelled');
        }

        const diffTime = this.dateRange.getStartDate().getTime() - currentDate.getTime();
        const diffTimeInDay = Math.ceil(diffTime / (1000 * 3600 * 24));
        
        const refundRule = RefundRuleFactory.getRefundRule(diffTimeInDay);
        
        this.totalPrice = refundRule.calculateRefund(this.totalPrice);
        this.status = 'CANCELLED';
    }
}
