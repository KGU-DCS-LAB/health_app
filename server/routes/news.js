const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const express = require('express')
const router = express.Router();


router.get('/news', function(req,res) {
  let keyword = req.query.keyword
  // console.log(keyword);
    const getHTML = async (keyword) => {
        const browser = await puppeteer.launch({
            headless : true
          });
        const page = await browser.newPage();
    
        let data = [];

        await page.goto('https://search.naver.com/search.naver?where=news&sm=tab_pge&query='+encodeURI(keyword)+'&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=352&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start=1');
        data.push(await parsing(page));
    
        // for(let idx = 1; idx<=121; idx+=10){
        //     await page.goto('https://search.naver.com/search.naver?where=news&sm=tab_pge&query='+encodeURI(keyword)+'&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=352&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start='+idx);
        //     data.push(await parsing(page));
        // }
      };
    
      const parsing = async (page) =>{
        const pageData =  await page.evaluate(() => {
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
                  // press: $(node).find(".info_group > a").text(),
                  title: $(node).find(".news_tit").text(),
                  time: $(node).find(".info_group > span").text(),
                  img: $(node).find(".dsc_thumb  > img").attr("src"),
                  newsUrl: $(node).find(".news_tit").attr("href")
              })
          });
        //   console.log(news);
          return res.json(news);
      }
      getHTML(keyword);
})
  
module.exports = router;

