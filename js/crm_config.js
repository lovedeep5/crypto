$(document).ready(function(){

    // Your code in here
  $("form").submit(function(e){
    e.preventDefault();
var first_name = $("[name='first-name']").val();
var last_name = $("[name='last-name']").val();
var email = $("[name='email']").val();
var phone_number = $("[name='phone']").val();
var dailing_code = $("[name='country-dailing-code']").val();
var countryCode = $("[name='country-code']").val().toUpperCase();
let obj = {
  firstname : first_name,
  lastname : last_name,
  email: email,
  phone: (dailing_code +""+ phone_number),
  country: countryCode     
}


    submitFormToPlatform(obj);
})

//

//UPDATE line 17,18,19,73,77.

var allowSend=true;
function getQueryVariable(variable)
{
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return(false);
}

function submitFormToPlatform(obj){
var newLead={
    "affiliateId": 1664, //Insert default affiliateId
    "campaignId": 1073,
    "offerId": 54,
    "funnelname":"",
    "funnellink":"",
    "firstname":obj.firstname,
    "lastname":obj.lastname,
    "email":obj.email,
    "phonenumber":obj.phone,
    "countrycode":obj.country
}
var affiliateId=getQueryVariable("afid");
if(affiliateId){
    newLead.affiliateId=affiliateId;
}
var utmTerm=getQueryVariable("utm_term");
if(utmTerm){
    newLead.clickId=utmTerm;
}
var utm_campaign=getQueryVariable("utm_campaign");
if(utm_campaign){
    newLead.pixel=utm_campaign;
}



if(newLead.lastname===''){
newLead.lastname=newLead.firstname;
}

if(!allowSend){
  console.log('Already sent');
  return true;
}
allowSend=false;
newLead=JSON.stringify(newLead);
$.ajax({
    url: "https://afnetwork.herokuapp.com/api/leads",
    type: "post",
    
    headers:{
        
    },
    data: newLead,
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
      console.log(data);
     window.location="/thank-you.html"; //Insert success link
    },
    error: function(data) {
      console.log(data);
    //  window.location="/error.html"; //Insert error link
      if (data.status === 403 || data.status === 400) {
        
      }
    }
  });

}



})


