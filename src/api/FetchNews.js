/**
 * 接口介绍：获取新闻接口
 * 数据来源：聚合API
 */

import axios from "axios";

// 基本参数配置
const apiUrl = '/juhe/areanews/query';  // 接口请求URL
const apiKey = "7efc76ce3a57b8d971116ee9542f250a";  // 在个人中心->我的数据,接口名称上方查看

/**
 * 说明：根据城市吗获取新闻。
 * 参数：cityName
 */
export async function getNews(cityName) {
    return [
        {
            "id": "69a876ebbb6e5dfca9b930ebbe0023d1",
            "ctime": "2024-09-19 09:48:00",
            "title": "擦亮历史文化“金名片” 北京促发展成果惠及更多民众",
            "description": "",
            "picUrl": "",
            "url": "https:\/\/www.bj.chinanews.com\/news\/2024\/0919\/96419.html",
            "source": ""
        },
        {
            "id": "32535d86d4128ef755053aef4e76e3a9",
            "ctime": "2024-09-17 22:44:00",
            "title": "中秋假期北京接待游客817.2万人次",
            "description": "",
            "picUrl": "",
            "url": "https:\/\/www.bj.chinanews.com\/news\/2024\/0917\/96410.html",
            "source": ""
        }];
    const data = cityName.slice(0, -1);//去除“省/市”字样
    const requestParams = {
        key: apiKey,
        areaname: data,
        word: '',
        page: '20',
    };

    // 发起接口网络请求
    const response = await axios.get(apiUrl, { params: requestParams });
    const responseResult = response.data.result.list;
    // 网络请求成功。可依据业务逻辑和接口文档说明自行处理。
    console.log(responseResult);
    return responseResult;
}