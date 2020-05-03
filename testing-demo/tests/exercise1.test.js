const exercise = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw if input is not a number', () => {
        expect(() => { exercise.fizzBuzz('Hello') }).toThrow();
        expect(() => { exercise.fizzBuzz(undefined) }).toThrow();
        expect(() => { exercise.fizzBuzz(null) }).toThrow();
        expect(() => { exercise.fizzBuzz({}) }).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is only divisible by 3', () => {
        const result = exercise.fizzBuzz(6);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is only divisible by 5', () => {
        const result = exercise.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });

    it('should return input if not divisible by 3 and 5', () => {
        const result = exercise.fizzBuzz(4);
        expect(result).toBe(4);
    });
});