var iframe0 = document.getElementById('HitFrame_0_0').contentWindow;
var iframe1 = document.getElementById('HitFrame_1_0').contentWindow;


function getQuery(){
    console.log("get query..")
    if (document.getElementById('HitFrame_0_0').style.display === "inline"){
        return iframeQuery(iframe0);
    }
    else{
        return iframeQuery(iframe1);
    }
}

function iframeQuery(iframeX){
    //Query
    var queryText = iframeX.document.getElementById("queryId").textContent;

    // Ad title
    var adTitle = iframeX.document.getElementById("adTitleId").textContent;

    // Ad description
    var adDescription = iframeX.document.getElementById("adDescriptionId").textContent;

    // Ad url
    var adURL = iframeX.document.getElementById("adDisplayURLId").textContent;

    return {
        "queryText": queryText,
        "adTitle": adTitle,
        "adDescription": adDescription,
        "adURL": adURL
    };
}

var officialRating = "";
var officialComment = "";
var submit0 = iframe0.document.querySelector("body > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(6) > input[type=button]");
var submit1 = iframe1.document.querySelector("body > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(6) > input[type=button]");
var agreeButton = document.querySelector("#agreeButton");

function onSubmitHit(){
    console.log(document.getElementById("instantFeedbackPanel"));
    console.log(agreeButton.textContent);
    
    officialRating = document.getElementById("officialJudgment").textContent;
    officialComment = document.getElementById("instantFeedbackOfficialComment").textContent;

    console.log("current query")
    console.log(query);
    console.log(officialRating + " :: " + officialComment);

    console.log("next query..");
    query = getQuery();
    console.log(query);

}

// submit0.addEventListener("click", onSubmitHit, false);
// submit1.addEventListener("click", onSubmitHit, false);
agreeButton.addEventListener("click", onSubmitHit, false);

