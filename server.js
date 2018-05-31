var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  //url = 'https://www.imdb.com/title/tt3756788/';
  url = process.argv[2];

  request(url, function(error, response, html){

        if(!error){
            // The cheerio library gives us jquery functionalities
            var $ = cheerio.load(html);

            var json = { title : "", release : "", rating : ""};

            $('meta').filter(function(){
                var data = $(this);

                if(data.attr('property') === 'og:title'){
                	json.title = data.attr('content');
                	console.log(json.title);
                }  
            })

            $('a').filter(function(){
               var data = $(this);

                if(data.attr('title') === 'See more release dates'){
                	json.release = data.text().trim();
                	console.log(json.release);
                }
            })

            $('span').filter(function(){
               var data = $(this);

               if (data.attr('itemprop')==='ratingValue'){
               		json.rating = data.text();
               		console.log(json.rating);
               }               
            })
        }else{
        	console.log("error");
        }
    })
  res.send('Check your console!\n');
})

app.listen('8081')

console.log('Listening on port 8081');

//module.exports = app;