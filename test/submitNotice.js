const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const notice = require('../lib');

const DATABASE = "ISInformationPlatform";
const COLLECTION = "noticelist_1";

describe('submitPost', function () {
    before(async function () {
        try {
            let connect = await getConnect();
            let collect = connect.db(DATABASE).collection(COLLECTION);

            await collect.deleteMany({});
            connect.close();
        } catch (err) {
            throw err;
        }
    });

    it('test', async function () {
        var data = {
            "notice_title": "saber",
            "notice_author": "she",
            "notice_content": "hello",
        };

        try {
            await notice.submitNotice(1, data);
            let connect = await getConnect();
            var result = await connect.db(DATABASE).collection(COLLECTION).find({}).sort({}).toArray();

            expect(result).lengthOf(1);
            expect(result[0].notice_title).to.be.equal("saber");
            expect(result[0].notice_author).to.be.equal("she");
            expect(result[0].notice_content).to.be.equal("hello");
        } catch (error) {
            throw error;
        }
    });
});

async function getConnect() {
    try {
        let connect = await MongoClient.connect(url);

        return connect;
    } catch (err) {
        throw err;
    }
}