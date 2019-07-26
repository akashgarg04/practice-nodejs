const ex = require('../exercise1');

describe ('fizzBuzz' , () => {
    it ('is not a number, should throw and exception', () => {
        const arg = ['text',null, undefined, {} ];
        arg.forEach(a => {
            expect(() => {ex.fizzBuzz(a)}).toThrow();
        } )
    });
    it ('is not divisible by 3 or 5', () => {
        const result = ex.fizzBuzz(1);
        expect(result).toBe(1);
    });    
    it ('is divisible by 3 and 5', () => {
        const result = ex.fizzBuzz(15)
        expect(result).toBe('FizzBuzz');
    });
    it ('is divisible by 3', () => {
        const result = ex.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    it ('is divisible by 5', () => {
        const result = ex.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
});


