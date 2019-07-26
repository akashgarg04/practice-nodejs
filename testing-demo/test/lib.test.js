const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe ('getCurrencies' , () => {
    it('should validate the currencies', () => {
        expect(lib.getCurrencies()).toContain('USD');
        expect(lib.getCurrencies()).toContain('AUD');
        expect(lib.getCurrencies()).toContain('EUR');

        expect(lib.getCurrencies()).toEqual(expect.arrayContaining(['AUD','USD','EUR']));
    });
});

describe ('getProduct' , () => {
    it('Should get the product object', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({
            "id": 1,
            "price": 10
        });
        
        expect(result).toHaveProperty('id',1);
        expect(result).toHaveProperty('price',10);
    });
});

describe ('registerUser' , () => {
    it ('Should reject a falsy username', () => {
        const arg  = [null, undefined, NaN , '' , 0 , false] ;
        arg.forEach(name => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });
    it ('Should return user object for a valid user ID', () => {
        const result = lib.registerUser('kuchbhi');
        expect(result.id).toBeGreaterThan(0);
        expect(result).toMatchObject({username: 'kuchbhi'});
    });
});

describe ('applyDiscout' , () => {
    it ('should apply discount', () => {
        db.getCustomer = function(id) {
            console.log('Faking getCustomer');
            return ({ customerId: id , points: 11 });
        };
        order = {  customerId: 1 , totalPrice : 10}
        lib.applyDiscount (order);
        expect(order.totalPrice).toBe(9);
    });
});

describe ('notifyCustomer' , () => {
    it ('should notify customer', () => {
        db.getCustomerSync = jest.fn()
                .mockReturnValue({email:'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1, email: 'a' });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send).toHaveBeenCalledWith('a',
                'Your order was placed successfully.');
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/success/);

    });
});



// describe ('' , () => {
//     it ('', () => {

//     });
// });
