import { DateRange } from './date_range';

describe('DateRange Value Object', () => {
    it('Should throw error if startDate is bigger than endDate', () => {
        expect(() => {
            new DateRange(new Date('2025-05-25'), new Date('2025-05-20'));
        }).toThrow('End date must be later than Start date');
    });

    it('Should create an instance of DateRange with startDate and endDate', () => {
        const startDate = new Date('2025-05-20');
        const endDate = new Date('2025-05-25');
        
        const dateRange = new DateRange(startDate, endDate);

        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    });

    it('Should calculate total nights correctly', () => {
        const startDate = new Date('2025-05-20');
        const endDate = new Date('2025-05-25');
        const dateRange = new DateRange(startDate, endDate);
        const totalNights = dateRange.getTotalNights();

        const startDate1 = new Date('2025-05-10');
        const endDate1 = new Date('2025-05-25');
        const dateRange1 = new DateRange(startDate1, endDate1);
        const totalNights1 = dateRange1.getTotalNights();
        
        expect(totalNights).toBe(5);
        expect(totalNights1).toBe(15);
    });

    it('Should check if two intervals overlap', () => {
        const dateRange1 = new DateRange(new Date('2025-05-20'), new Date('2025-05-25'));
        const dateRange2 = new DateRange(new Date('2025-05-22'), new Date('2025-05-27'));

        const overlap = dateRange1.overlap(dateRange2);

        expect(overlap).toBe(true);
    });

    it('Should throw error if startDate is equal to endDate', () => {
        const date = new Date();

        expect(() => {
            new DateRange(date, date);
        }).toThrow('Start date can\'t be equal to End date');
    });
});
