"use strict";
/**
 ** notice Module
 **
 ** @version 0.0.1
 **
 */

var notice = module.exports;

var url = "mongodb://localhost:27017/",
    database = "ISInformationPlatform",
    base_noticelist_collection = "noticelist";

var mongo = require('kqudie')(url);
/**
 ** getCurrentTime
 **
 ** @return unix timestamp
 **
 */

function getCurrentTime(){
    return Math.round(new Date().getTime()/1000);
  }
/**
 ** getAllNotice
 **
 ** @param section_id section id
 **
 */

notice.getAllNotice = async function (section_id) {
    var noticelist_section_collection = base_noticelist_collection + "_" + section_id;
  
    try {
      return await mongo.find(database, noticelist_section_collection, {});
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
    var noticelist_section_collection = base_noticelist_collection + "_" + section_id;
    var findObj = {
      "_id": mongo.String2ObjectId(notice_id)
    };
  
    return await mongo.find(database, noticelist_section_collection, {
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
    var noticelist_section_collection = base_noticelist_collection + "_" + section_id;
  
    var new_ObjectId = mongo.String2ObjectId();
  
    var insertListObj = {
      "_id" : new_ObjectId,
      "notice_title" : data.notice_title,
      "notice_author" : data.notice_author,
      "notice_content" : data.notice_content,
    };
  
    return await mongo.insert(database, noticelist_section_collection, insertListObj);
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
    var noticelist_section_collection = base_noticelist_collection + "_" + section_id;
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
      await mongo.update(database, noticelist_section_collection, query, updateObj, option);
      return true;
    } catch (error) {
      throw error;
    }
  }

