import { PropertyService } from './property_service';
import { FakePropertyRepository } from '../infrastructure/repositories/fake_property_repository';

describe('PropertyService', () => {
    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        fakePropertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(fakePropertyRepository);
    });

    it('Should return null when an invalid ID is passed', async () => {
        const user = await propertyService.findById('1');
        expect(user).toBe(null);
    });

    it('Should return a Property when an valid ID is passed', async () => {
        const user = await propertyService.findById('111');
        expect(user).not.toBeNull();
        expect(user?.getId()).toBe('111');
    });
});
