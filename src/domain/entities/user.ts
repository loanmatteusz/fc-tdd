export class User {
    private readonly id: string;
    private readonly name: string;
    
    constructor(id: string, name: string) {
        this.validateAttributes(id, name);
        
        this.id = id;
        this.name = name;
    }

    private validateAttributes(id: string, name: string): void {
        if (!id) {
            throw new Error('Id can\'t be empty');
        }
        if (!name) {
            throw new Error('Name can\'t be empty');
        }
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}
