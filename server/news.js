const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getHTML = async(keyword) =>  {
    const browser = await puppeteer.launch({
        headless : false
    });

    const page = await browser.newPage();
    await page.goto("https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" + encodeURI(keyword));

    await page.screenshot({ path: "image.png" });

    let data = [];

    for (let index = 1; index <= 11; index+=10) {
        await page.goto("https://search.naver.com/search.naver?where=news&sm=tab_pge&query="+ keyword +"sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=203&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start="+index);
        data.push(page);
    }

    console.log(data);

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    })

    const $ = cheerio.load(pageData.html);

    const $newsList = $(".api_ani_send");
    let news = [];

    $newsList.each((idx, node) => {
        news.push({
            pressImg: $(node).find(".info_group > a > span > img").attr("src"),
            pressUrl: $(node).find(".info_group > a").attr("href"),
            // press: $(node).find(".info_group > a").text(),
            title: $(node).find(".news_tit").text(),
            time: $(node).find(".info_group > span").text(),
            img: $(node).find(".dsc_thumb  > img").attr("src"),
            newUrl: $(node).find(".news_tit").attr("href")
        })
    });

    console.log(news);

    await page.waitFor(10000);
    await browser.close();
}


getHTML("코로나");

// const axios = require('axios');
// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');

// const getHTML = async(keyword) => {
//     try{
//         return await axios.get("https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=" + encodeURI(keyword))
//     } catch(err) {
//         console.log(err);
//     }
// }

// const parsing = async(keyword) => {
//     const html = await getHTML(keyword);
//     const $ = cheerio.load(html.data);
//     const $newsList = $(".api_ani_send");

    // let news = [];
    // $newsList.each((idx, node) => {
    //     news.push({
    //         pressImg: $(node).find(".info_group > a > span > img").attr("src"),
    //         // press: $(node).find(".info_group > a").text(),
    //         title: $(node).find(".news_tit").text(),
    //         time: $(node).find(".info_group > span").text(),
    //         img: $(node).find(".dsc_thumb  > img").attr("src"),
    //         newUrl: $(node).find(".news_tit").attr("href")
    //     })
    // });

//     console.log(news);
// }

// getHTML("코로나");

