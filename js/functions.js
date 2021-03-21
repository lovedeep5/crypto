$(document).ready(function(){
    // DOCUMENT READY

    // HEADER DYNAMIC WIDGET
    setInterval(() => {
        ChnageImage();
        ChangeNumber()
    }, 3000);

function ChnageImage(){
    $.ajax({
    url: 'https://randomuser.me/api/?inc=picture',
    dataType: 'json',
    success: function(data) {
        let imageSource = data.results[0].picture.medium;
        $(".random-image").attr("src", imageSource);
         }
    });
}

function ChangeNumber(){
    $('.dynamic-content-line-2').text("$"+Math.floor(Math.random()*1000/2));
}

// GETTING COUNTRY CODE WITH IP



function getIP(){
    $.get("http://ip-api.com/json/", function(data, status){
    console.log({ip:data.query});
    getDetails(data.query);
  });
};


// set endpoint and your access key
function getDetails(userIP){
    var ip = userIP
var access_key = '318462090f02650f71c709fd36ea72f9';

// get the API result via jQuery.ajax
$.ajax({
    url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {

        // output the "capital" object inside "location"
        var country_calling_code = json.location.calling_code;
        var country_code = json.country_code;
        var country_flag_url = json.location.country_flag;
        $(".country-flag img").attr('src', country_flag_url);
        $('[name=country-code]').val(country_code);
        $('[name=phone]').val("+"+country_calling_code);
        $('[name=phone]').css({
            "background-image": "url("+ country_flag_url +")",
            "background-size": "50px",
            "background-position": "right",
            "background-repeat": "no-repeat"
        });
        
    }
});

}


getIP();




    // DOCUMENT READY
})