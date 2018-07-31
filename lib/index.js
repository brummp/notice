"use strict";
/**
 ** notice Module
 **
 ** @version 0.0.1
 **
 */
var url = "mongodb://localhost:27017/",
    database = "ISInformationPlatform";
var mongo = require('kqudie')(url);
var collect_mapped;
var notice = module.exports=function(collect_mapp) {
  if(!collect_mapp){
    throw new Error("config is undefined");
  }
  collect_mapped=collect_mapp;
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
    if(!collect_mapped[section_id]){
      throw new Error("section_id is not found");
    }
    else{
      return collect_mapped[section_id].content;
    }
} 
/**
 ** getAllNotice
 **
 ** @param section_id section id
 **
 */

notice.getAllNotice = async function (section_id) {
    try {
      return await mongo.find(database, findcollect(section_id), {});
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

