import { getRelativeSize } from './';

describe.only('getRelativeSize', () => {
    it('Should return the correct percentage size ', () => {
        const res0 = getRelativeSize(255, 20);
        const res1 = getRelativeSize(255 / 2, 20);
        expect(res0).toEqual(20);
        expect(res1).toEqual(10);

    })
})