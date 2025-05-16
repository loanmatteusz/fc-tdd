import { User } from './user';

describe('User Entity', () => {
    it('Should create an instance of User with ID and Name', () => {
        const id = '1';
        const name = 'Tester';
        
        const user = new User(id, name);
        
        expect(user.getId()).toEqual(id);
        expect(user.getName()).toEqual(name);
    });

    it('Should throw error when ID is empty', () => {
        const id = '';
        const name = 'Tester';
        
        expect(() => {
            new User(id, name);
        }).toThrow('Id can\'t be empty');
    });

    it('Should throw error when name is empty', () => {
        const id = '1';
        const name = '';
        
        expect(() => {
            new User(id, name);
        }).toThrow('Name can\'t be empty');
    });
});
