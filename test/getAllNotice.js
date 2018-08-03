const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

var config = require('./config.js');
const notice = require('../lib')(config);

const DATABASE = "ISInformationPlatform"
const COLLECTION = "notice_normal"

describe('getAllNotice', function () {
    before(async function () {
        try {
            let collect = await getCollect();

            await collect.deleteMany({});
            await collect.insertMany([
                { a: 1 }, { a: 2 }, { a: 3 }
            ]);
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        var opt={
            page_num:2
        };
        let notification = await notice.getAllNotice(1);
        let first = notification[0];
        let second = notification[1];
        let third = notification[2];

        expect(first.a).to.be.equal(1);
        expect(second.a).to.be.equal(2);
        expect(third.a).to.be.equal(3)
    })
});

async function getCollect() {
    try {
        let connect = await MongoClient.connect(url);
        let db = connect.db(DATABASE);
        let collect = db.collection(COLLECTION);

        return collect;
    } catch (err) {
        throw err;
    }
}