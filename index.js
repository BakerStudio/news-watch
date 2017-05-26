var SOURCES_BASE_URL = "https://newsapi.org/v1/sources";
var ARTICLES_BASE_URL = " https://newsapi.org/v1/articles";

function returnArticles(data) {
    debugger;
}


function renderSources(sources) {
    for (var i = 0; i < sources.length; i++) {
        var textLine = '<p>' + sources[i].name + " - " + sources[i].desc + '</p>';
        $('.js-sources').append(textLine);
        //
        //	Get the articles for this source
        //
        var parms = {
            source: sources[i].sourceId,
            apikey: 'b54b01d96a8b4fac8b2e60a8211e8c2c'
        }
        $.getJSON(ARTICLES_BASE_URL, parms, returnArticles);
    };
}


function addToSources(newObj) {
    sources.push(newObj);
}


function returnResults(data) {
    console.log("in returnResults");
    sources = [];
    for (var i = 0; i < data.sources.length; i++) {
        addToSources({
            name: data.sources[i].name,
            sourceId: data.sources[i].id,
            url: data.sources[i].url,
            desc: data.sources[i].description,
            sortbys: [data.sources[i].sortBysAvailable]
        });
    }
    renderSources(sources);
}


$(function() {
    'use strict';
    //
    //  format the parms object containing selection criteria
    //
    var parms = {
        category: "technology",
        language: "en",
    }
    $.getJSON(SOURCES_BASE_URL, parms, returnResults);


    //
    //  Event handler for search request
    //
    $('#js-search').submit(function(event) {
        event.preventDefault();
        query = $(this).find('.js-value').val();
        //
        //  format the api search request
        //
        var paramsObj = {
            part: 'snippet',
            key: 'AIzaSyCVj_TB8yxxUwB5_x-WSj90qlNYxjLSejU',
            q: query,
            maxResults: '6',
        };
        //
        //  submit with a callback function
        //
        getJ(paramsObj, displayResults);
    });

})

