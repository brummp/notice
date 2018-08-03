"use strict";
/**
 ** notice Module
 **
 ** @version 0.0.1
 **
 */
var post_collection_map = new Map();
var config;
var mongo;
var database = null;
var pageSize
var notice = module.exports = function (config_data) {
  if (!config_data)
    throw new Error('config can not be undefined');

  config = config_data;
  mongo = require('kqudie')(config.URL);
  database = config.DATABASE

  post_collection_map = new Map();

  config.notice.forEach(item => {
    if (post_collection_map.get(item.section_id))
      throw new Error("section_id can not be duplicated");

    post_collection_map.set(item.section_id, item.collection);
  });
  pageSize=config.notice_item_number_a_page;
  return notice;
};
/**
 ** getCurrentTime
 **
 ** @return unix timestamp
 **
 */
function getCurrentTime(){
    return Math.round(new Date().getTime()/1000);
  }
function findcollect(section_id){
  if (!section_id)
    throw new Error('section_id can not be undefined');

  if (typeof section_id != 'number')
    throw new Error('section_id must be a number');
  return post_collection_map.get(section_id);
} 
/**
 ** getAllNotice
 **
 ** @param section_id section id
 ** @param page_num page_num
 **
 */

notice.getAllNotice = async function(section_id){
  try {
    return await mongo.find(database, findcollect(section_id), {});
  }
  catch (error) {
    throw error;
  }
}
notice.getNotice = async function (section_id,opt) {
    var page_num=opt.page_num;
    try {
      let result = await mongo.find(database, findcollect(section_id), {});
      let total_page_num = Math.ceil(result.length / pageSize);
      var page_result={};
      var h=0;
      for(var i=((page_num-1)*pageSize);i<(page_num*pageSize);i++ ){
        page_result[h] = result[i];
        h++;
      }
      return {page_result , total_page_num};
    } catch (error) {
      throw error;
    }
  }
/**
 ** getNoticeDetail
 **
 ** @param section_id section id
 ** @param notice_id Notice id (string)
 **
 */

notice.getNoticeDetail = async function (section_id, notice_id) {
    var findObj = {
      "_id": mongo.String2ObjectId(notice_id)
    };
  
    return await mongo.find(database, findcollect(section_id), {
      find: findObj, sort: {}
    });
  }

/**
 ** submitNotice
 **
 ** @param section_id section id
 ** @param data post data
 **
 */

notice.submitNotice = async function(section_id, data){
    var insertListObj = {
      "notice_title" : data.notice_title,
      "notice_author" : data.notice_author,
      "notice_content" : data.notice_content,
      "notice_time" : getCurrentTime()
    };
  
    return await mongo.insert(database, findcollect(section_id), insertListObj);
  }
  /**
 ** updateNoticeDetail
 **
 ** @param section_id section id
 ** @param notice_id notice id (string)
 ** @param data json data
 **
 */

notice.updateNoticeList = async function(section_id, notice_id, data){
    var query = {
      "_id" : mongo.String2ObjectId(notice_id)
    };
    var option = {
      "upsert" : false,
      "multi" : false
    };
    var updateObj = {
      $set : {
        "notice_title" : data.notice_title,
        "notice_content" : data.notice_content,
        "notice_time" : getCurrentTime()
      }
    };
    try {
      await mongo.update(database, findcollect(section_id), query, updateObj, option);
      return true;
    } catch (error) {
      throw error;
    }
  }

