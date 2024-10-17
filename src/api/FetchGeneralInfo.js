/**
 * 简介：获取城市的基本信息
 * 数据来源：wikipedia
 * url：https://en.wikipedia.org/w/api.php
 */

import axios from "axios"

/**
 * 功能：传入从API中获取的字符串，从中提取出简介部分。
 * 参数：content
 * 返回值：summary
 */
async function getSummary(content) {
    let preChar = "";
    let summary = "";
    let isText = true;
    for (let char of content) {
        if (isText) {
            if (char == "[" || char == "]" || char == "'" || char == "{" || char == "}" || char == "<" || char == ">");//去除[]'三个格式符号
            else {
                summary += char;
            }
        }
        else {
            // 格式部分结束
            if (preChar == "}" && char == "}" || char == ">") {
                isText = true;
            }
        }
        // 最后一个"}\n"作为开始标志
        if (preChar == "}" && char == "\n") {
            summary = "";
        }
        // 连续两个等号作为结束标志
        if (preChar == "=" && char == "=") {
            return summary.slice(0, -2);
        }
        // 格式部分判断
        if (preChar == "{" && char == "{" || char == "<") {
            isText = false;
        }
        preChar = char;
    }
}

async function extractFirstSection(str) {
    const match = str.match(/==经济==\n+([\s\S]+?)(={2}|$)/);
    if (match) {
        const economicParagraph = match[1].trim();
        return economicParagraph;
    }
    // 如果没有找到匹配项，返回空字符串
    return '';
}

async function getEconomy(content) {
    let preChar = "";
    let summary = "";
    let isText = true;
    for (let char of content) {
        if (isText) {
            if (char == "[" || char == "]" || char == "'" || char == "{" || char == "}" || char == "<" || char == ">");//去除[]'三个格式符号
            else {
                summary += char;
            }
        }
        else {
            // 格式部分结束
            if (preChar == "}" && char == "}" || char == ">") {
                isText = true;
            }
        }
        /*
        // 最后一个"}\n"作为开始标志
        if (preChar == "}" && char == "\n") {
            summary = "";
        }
        // 连续两个等号作为结束标志
        if (preChar == "=" && char == "=") {
            return summary.slice(0, -2);
        }
        */
        // 格式部分判断
        if (preChar == "{" && char == "{" || char == "<") {
            isText = false;
        }
        preChar = char;
    }
    return summary;
}
/**
 * 功能：从API获取数据。返回gbk编码的简介
 * 参数：cityName
 * 返回值：summary_gbk
 */
export async function fetchGeneralInfo(cityName) {
    console.log("开始获取基本数据")
    const params = {
        action: "query",
        format: "json",
        prop: "revisions",
        titles: cityName,
        rvprop: "content",
        rvslots: "*",
        formatversion: "2",
    };
    const url = "/wikipediaAPI/w/api.php";
    try {
        const response = await axios.get(url, { params }); // 使用 await 等待 Promise 解决
        const content = response.data.query.pages[0].revisions[0].slots.main.content;
        const summary = await getSummary(content);
        const economicParagraph = await extractFirstSection(content);
        console.log(economicParagraph);
        const economy = await getEconomy(economicParagraph);
        console.log(economy);
        return summary; // 返回处理后的数据
    } catch (error) {
        // 处理错误情况
        if (error.code === 'ECONNABORTED') {
            console.log('连接超时，请检查您的网络连接或服务器状态。');
        } else {
            console.log('请求失败:', error);
        }
        return null; // 在错误情况下返回 null 或适当的错误信息
    }
}