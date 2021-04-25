const cheerio = require('cheerio'); // librería para hacer scrapping
const fetch = require('sync-fetch'); // librería para leer la web
let newsModel = {};

const url = "https://www.tarreo.com/noticias";

newsModel.getNews = async () => {
  const $ = cheerio.load(fetch(url).text());
  let news = [];
  
  // por cada noticia obtenemos su titulo, descripción y fecha de publicación
  $('div.content').has('.elementHeader').has('p').map((i, el) => {
    news.push({
      "uid": `NOTICIA_${i+1}`,
      "updateDate": $(el).find('time').attr('datetime'),
      "titleText": $(el).find('a.rC').attr('title'),
      "mainText": $(el).find('.elementIntro').text(),
      "redirectionUrl": $(el).find('elementHeader a').attr('href')
     })
  })

  return news
}

module.exports = newsModel;