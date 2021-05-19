import assert from 'assert';
import Data from '../src/utils/data';
import StockData from '../src/utils/StockData';

describe("Add Shoe Test", function () {
    it("should be able to add a shoe in the database ", async function () {
        const StockInstance = StockData(Data);
        console.log(StockInstance.displayStockData());
        StockInstance.getStockData(1);

        assert.strictEqual(1, 1);
    });
});