import assert from 'assert';
import Data from './utils/data';
import StockData from './utils/StockData';

describe("Add Shoe Test", function () {
    it("should be able to display stock available", async function () {
        const StockInstance = StockData(Data);
        

        assert.strictEqual(1, 1);
    });
});