import { Property } from '../domain/entities/property';
import { PropertyService } from './property_service';
import { FakePropertyRepository } from '../infrastructure/repositories/fake_property_repository';

describe('PropertyService', () => {
    let globalProperty: Property;
    let propertyService: PropertyService;
    let fakePropertyRepository: FakePropertyRepository;

    beforeEach(() => {
        globalProperty = new Property('333', 'My Property', 'A beautiful property', 1, 100);
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

    it('Should save an user using a fake repository and finding again', async () => {
        await fakePropertyRepository.save(globalProperty);
        const user = await propertyService.findById('333');
        expect(user?.getId()).toBe(globalProperty.getId());
    });
});
