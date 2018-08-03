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
                { a: 1 }, { a: 2 }, { a: 3 },{ a : 4 },{ a : 5 }
            ]);
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        var opt={
            page_num:2
        };
        let notification = await notice.getAllNotice(1,opt);
        let first = notification.page_result[0];
        let second = notification.page_result[1];

        expect(first.a).to.be.equal(4);
        expect(second.a).to.be.equal(5);
        expect(notification.total_page_num).to.be.equal(2)
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