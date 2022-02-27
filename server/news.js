const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const getHTML = async(keyword) => {
    try{
        return await axios.get("https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" + encodeURI(keyword))
    } catch(err) {
        console.log(err);
    }
}

const parsing = async(keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $newsList = $(".api_ani_send");

    let news = [];
    $newsList.each((idx, node) => {
        news.push({
            pressImg: $(node).find(".info_group > a > span > img").attr("src"),
            // press: $(node).find(".info_group > a").text(),
            title: $(node).find(".news_tit").text(),
            time: $(node).find(".info_group > span").text(),
            img: $(node).find(".dsc_thumb  > img").attr("src"),
            newUrl: $(node).find(".news_tit").attr("href")
        })
    });

    console.log(news);
}

parsing("코로나");

