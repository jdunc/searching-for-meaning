$(document).ready(
  function(){
    var page = 1;
    var search = '';
    var count2 = 0;
    var poetryLines = [];
    var poetryCount = 0;
    console.log('jQuery on one');
    $(document).keypress(function(e) {
      if(e.which == 13) {
        search = $('#searchingHere').val();
        console.log(search);
        getImages(search);
        // getPoetry(search);
        $.get( `http://www.poetry.net/psearch/${search}`, function( data ) {
          var data = $.parseHTML(data);
          getPoetry1(data);
        });
        $.get( `http://www.poetry.net/serp.php?st=${search}&p=2`, function( data ) {
          var data = $.parseHTML(data);
          getPoetry2(data);
        });
        $.get( `http://www.poetry.net/serp.php?st=${search}&p=3`, function( data ) {
          var data = $.parseHTML(data);
          getPoetry2(data);
        });
      }
    });
    function getImages(str, page){
      console.log(str);
      $.get( `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b10d5a4bb4af77943a8907d9475771d2&tags=${str}&page=${page}&per_page=250&format=json&nojsoncallback=1`, function( data ) {
        console.log( data );
        var count = 0;
        // console.log(data.photos.photo[0]['farm']);
        // console.log(data.photos.photo[0]['id']);
        // console.log(data.photos.photo[0]['secret']);
        // console.log(data.photos.photo[0]['server']);
        setTimeout(function(){
          appendImages(data, count);
          count++;
        },0000);

      });
    }

    function getPoetry1(data){
      console.log('getting poetry now for ', data);
              console.log('poetry data ', data);
              // var html = $('.tdata', data);
              var first = $(data[57]).children()[1];
              var second = $(first).children()[1];
              var third = $(second).children()[0];
              var fourth = $(third).children()[1];
              var fifth = $(fourth).children()[0];
              var sixth = $(fifth).children()[2];
              var seventh = $(sixth).children()[0];
              var eighth = $(seventh).children()[1];
              var tableRows = $(eighth).children();
              for (var i = 0; i < tableRows.length; i++) {
                var info = $(tableRows)[i];
                var info2 = $(info).children()[1];
                var info3 = $(info2).children()[0];
                var info4 = $(info3).text()
                poetryLines.push(info4);
               }
               console.log('pairing down ', poetryLines);
               displayPoetry(poetryLines);

              // console.log('pairing down ', data.innerHTML(filter($('#page-container'))));
    }

    function getPoetry2(data){
      console.log('getting poetry now for ', data);
              console.log('poetry data ', data);
              // var html = $('.tdata', data);
              var first = $(data[57]).children()[1];
              var second = $(first).children()[1];
              var third = $(second).children()[0];
              var fourth = $(third).children()[1];
              var fifth = $(fourth).children()[0];
              var sixth = $(fifth).children()[2];
              var seventh = $(sixth).children()[0];
              var eighth = $(seventh).children()[1];
              var tableRows = $(eighth).children();
              for (var i = 0; i < tableRows.length; i++) {
                var info = $(tableRows)[i];
                var info2 = $(info).children()[1];
                var info3 = $(info2).children()[0];
                var info4 = $(info3).text()
                poetryLines.push(info4);
               }
               console.log('pairing down ', poetryLines);
              // console.log('pairing down ', data.innerHTML(filter($('#page-container'))));
    }

    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function displayPoetry(arr){
      console.log(arr);
      if(poetryCount < arr.length){
        $('.quotes').remove();
        var w = window.innerWidth;
        var h = window.innerHeight;
        var newW = Math.ceil(Math.random()*w*.8);
        var newH = Math.ceil(Math.random()*h*.8);
        var color = getRandomColor();
        console.log(color);
        $('.container').append(`<div class="quotes" style="left:${newW}px; top:${newH}px ; color:${color}; text-shadow: 1px 1px white;"><p>${arr[poetryCount]}</p></div>`);
        poetryCount++;
        setTimeout(function(){displayPoetry(arr)}, 4000);
      } else{
        poetryCount = 0;
        setTimeout(function(){displayPoetry(arr)}, 4000);
      }
    }

    function appendImages(data, count){
      if(count<250){
        var farmId = data.photos.photo[count]['farm'];
        var id = data.photos.photo[count]['id'];
        var secret = data.photos.photo[count]['secret'];
        var serverId = data.photos.photo[count]['server'];
        var w = window.innerWidth;
        var h = window.innerHeight;
        var newW = Math.ceil(Math.random()*w);
        var newH = Math.ceil(Math.random()*h);
        var imgW = Math.ceil(Math.random()*100);
        var imgH = Math.ceil(Math.random()*100);
        var borderR = Math.ceil(Math.random()*100);
        var opacityVal = (Math.random()*1.5).toFixed(2);
        count2++;
        $('.container').append(`<img class='images2' src=https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg style="top:${newH}px; left:${newH}px; height:${imgH}%; width:${imgW}%; border-radius:${borderR}%; opacity:${opacityVal}; z-index:5"/>`);
        setTimeout(function(){
          count++;
          appendImages(data, count);
          $('.images2').mouseover(function(){
            $(this).css('opacity', 1);
            $(this).css('border-radius', 0);
            $(this).css('width', 'auto');

          });
          $('.images2').mouseout(function(){
            $(this).css('opacity', Math.random());
            $(this).css('border-radius', Math.ceil(Math.random()*100));
            var imgW = Math.ceil(Math.random()*100);
            $(this).css('width', `${imgW}vw`);
          });
        },Math.random()*5000);
        if(count2 === 300){
          $('.images2')[0].remove();
        }
      } else{
        page++;
        getImages(search, page);
      }
    }

  })
