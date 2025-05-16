export class DateRange {
    private readonly startDate;
    private readonly endDate;
    
    constructor(startDate: Date, endDate: Date) {
        this.validateDates(startDate, endDate);

        this.startDate = startDate;
        this.endDate = endDate;
    }

    private validateDates(startDate: Date, endDate: Date): void {
        if (startDate == endDate) {
            throw new Error('Start date can\'t be equal to End date');
        }

        if (startDate > endDate) {
            throw new Error('End date must be later than Start date');
        }
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getTotalNights(): number {
        const diffTime = this.endDate.getTime() - this.startDate.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }

    public overlap(dateRange: DateRange): boolean {
        return (
            this.startDate < dateRange.endDate && dateRange.getStartDate() < this.endDate
        );
    }
}
