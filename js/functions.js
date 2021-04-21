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

function getDetails(){

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ip-geo-location.p.rapidapi.com/ip/check?format=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1d68f3ebffmshfb94a56fb52803dp1590f2jsn07b0b9c8ae2b",
            "x-rapidapi-host": "ip-geo-location.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        var country_calling_code = response.country.phone_code;
        var country_code = response.country.code;
        var country_flag_url = response.country.flag.file;
        $(".country-flag img").attr('src', country_flag_url);
        $('[name=country-code]').val(country_code);
        $('[name=country-dailing-code]').val("+" + country_calling_code);
    
    });
   



}

getDetails();




    // DOCUMENT READY
})