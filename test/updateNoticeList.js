const expect = require('chai').expect;

const url = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
var config = require('./config.js');
const notice = require('../lib')(config);

const DATABASE = "ISInformationPlatform";
const COLLECTION = "notice_normal";

describe('updateNoticeList', function () {
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
            "notice_title": "国际化",
            "notice_author": "龚佑成",
            "notice_content": "婷姐的项目",
        };
        var data1 = {
            "notice_title": "saber",
            "notice_author": "she",
            "notice_content": "hello",
        };
        var opt={
            page_num:1
        };

        try {
            await notice.submitNotice(1, data1);
            let post_id = await notice.getAllNotice(1,opt);
            await notice.updateNoticeList(1,post_id.notice_list[0]['_id'],data);
            let connect = await getConnect();
            var result = await connect.db(DATABASE).collection(COLLECTION).find({}).sort({}).toArray();

            expect(result).lengthOf(1);
            expect(result[0].notice_title).to.be.equal("国际化");
            expect(result[0].notice_author).to.be.equal("she");
            expect(result[0].notice_content).to.be.equal("婷姐的项目");
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