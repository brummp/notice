const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;

var collect_mapped=[
    {section_id:"0",content:'fac'},
    {section_id:"1",content:'fbc'}
]
const notice = require('../lib')(collect_mapped);

const DATABASE = "ISInformationPlatform"
const COLLECTION = "fbc"

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

        let result = await notice.getAllNotice(1);
        let first = result[0];
        let second = result[1];
        let third = result[2];

        expect(first.a).to.be.equal(1);
        expect(second.a).to.be.equal(2);
        expect(third.a).to.be.equal(3);
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