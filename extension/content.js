setTimeout(timer, 3000);

function timer(){
    var iframe0 = document.getElementById('HitFrame_0_0').contentWindow;
    var iframe1 = document.getElementById('HitFrame_1_0').contentWindow;

    console.log('Starting extension load..');

    var hintdivhtml = `
    <style>
    * {
      box-sizing: border-box;
    }

    /* Create two unequal columns that floats next to each other */
    .column {
      float: left;
    }

    .left {
      width: 25%;
      height: 120px;
    }

    .right {
      width: 75%;
      height: 120px;
    }

    /* Clear floats after the columns */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    </style>

    <div class="row">
    <div id="hintsratingdiv" class="column left" style="background-color:#aaa;">
    <h1 id="hintsrating" style="color: green; font-weight: bold; line-height: 60px; text-align: center; vertical-align: middle">RATING</h1>
    </div>
    <div id="hintshitlevelreasondiv" class="column right" style="background-color:#bbb;">
    <div style="overflow-y: scroll; height: 80%">
    <p id="hintshitlevelreason" style="text-align: center; vertical-align: middle">Hit level reason..</p>
    </div>
    <div style="height: 20%">
    <p id="nextupquery" style="text-align: center">Next Up.. Next Up.. Next Up.. Next Up.. Next Up.. Next Up..</p>
    </div>
    </div>
    </div>`;

    var hints = document.createElement('DIV');
    hints.id = 'hints';
    hints.style.width = "500px";
    hints.style.height = "120px";
    hints.style.backgroundColor = "grey";
    hints.style.position = "fixed";
    hints.style.left = "50%";
    hints.style.top = "15%";
    hints.innerHTML = hintdivhtml;

    document.getElementById("realBody").appendChild(hints);
    var infotd0 = iframe0.document.querySelector("body > div > table > tbody > tr:nth-child(1) > td:nth-child(2)");
    infotd0.parentNode.removeChild(infotd0);
    var infotd1 = iframe1.document.querySelector("body > div > table > tbody > tr:nth-child(1) > td:nth-child(2)");
    infotd1.parentNode.removeChild(infotd1);

    // FIREBASE API //
    function setupFirebase(callback){
        var firebaseScript = document.createElement("script");
        firebaseScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase.js";

        // var firebaseAppScript = document.createElement("script");
        // firebaseAppScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js";

        // var firebaseDatabaseScript = document.createElement("script");
        // firebaseDatabaseScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-database.js";

        // var firebaseAnalysisScript = document.createElement("script");
        // firebaseAnalysisScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-analytics.js";

        document.head.appendChild(firebaseScript);
        // document.body.appendChild(firebaseAppScript);
        // document.body.appendChild(firebaseDatabaseScript);
        // document.body.appendChild(firebaseAnalysisScript);

        setTimeout(callback, 1000);


    }

    function setupFirebaseCallback(){
        var firebaseAPIConfigScriptRaw = `
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDx0krgpOZ_3uKUpVxLqhkmMiMeBemBBso",
            authDomain: "uhrs-7a8c5.firebaseapp.com",
            databaseURL: "https://uhrs-7a8c5.firebaseio.com",
            projectId: "uhrs-7a8c5",
            storageBucket: "uhrs-7a8c5.appspot.com",
            messagingSenderId: "583114931028",
            appId: "1:583114931028:web:18aa208f075ebd44b3e6c1",
            measurementId: "G-K8E2BSSBJ7"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
        `;

        var firebaseAPIConfigScript = document.createElement("script");
        // firebaseAPIConfigScript.setAttribute("async", "false");
        firebaseAPIConfigScript.setAttribute("defer", "");
        firebaseAPIConfigScript.innerHTML = firebaseAPIConfigScriptRaw;
        document.body.appendChild(firebaseAPIConfigScript);

        var firebaseAPIScriptRaw = `
        console.log("firebase api..");

        var iframe0 = document.getElementById('HitFrame_0_0').contentWindow;
        var iframe1 = document.getElementById('HitFrame_1_0').contentWindow;


        function getQuery(){
            console.log("get query..");
            if (document.getElementById('HitFrame_0_0').style.display === "inline"){
                var iframe0query = iframeQuery(iframe0);
                setTimeout(updateNextUpQuery, 3000);
                return iframe0query;
            }
            else{
                var iframe1query = iframeQuery(iframe1);
                setTimeout(updateNextUpQuery, 3000);
                return iframe1query;
            }
        }

        function updateNextUpQuery(){
            var iframeX = "";
            if (document.getElementById('HitFrame_0_0').style.display === "inline"){
                iframeX = iframe1;
            }
            else{
                iframeX = iframe0;
            }
            document.getElementById("nextupquery").innerHTML = "<strong>NEXT QUERY: </strong>" +
            iframeX.document.getElementById("queryId").textContent;
        }

        function iframeQuery(iframeX){
            //Query
            rawQuery = iframeX.document.getElementById("queryId").textContent;
            queryText = rawQuery.replace(/[^a-zA-Z ]/g, "");

            // Ad title
            var adTitle = iframeX.document.getElementById("adTitleId").textContent;

            // Ad description
            var adDescription = iframeX.document.getElementById("adDescriptionId").textContent;

            // Ad url
            var adURL = iframeX.document.getElementById("adDisplayURLId").textContent;

            uniqueQueryID = adTitle.slice(0,Math.floor(adTitle.length/3)).replace(/[^a-zA-Z ]/g, "") + "-" +
            adDescription.slice(0,Math.floor(adDescription.length/3)).replace(/[^a-zA-Z ]/g, "") + "-" +
            adURL.slice(0,Math.floor(adURL.length/3)).replace(/[^a-zA-Z ]/g, "");

            return {
                "queryText": queryText,
                "adTitle": adTitle,
                "adDescription": adDescription,
                "adURL": adURL,
                "rawQuery": rawQuery
            };
        }

        currentUser = document.getElementById("userName").textContent.slice(6,);
        var currentVersion = "";
        var uniqueQueryID = "";
        var queryText = "";
        var query = getQuery();
        console.log(query);

        var officialRating = "";
        var officialComment = "";
        var submit0 = iframe0.document.querySelector("body > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(6) > input[type=button]");
        var submit1 = iframe1.document.querySelector("body > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > p:nth-child(6) > input[type=button]");
        var agreeButton = document.querySelector("#agreeButton");

        function getNextQuery(){
            console.log("next query..");
            query = getQuery();
            console.log(query);
            if (searchQuery() == true){
                var hintRating = firebaseQueries[queryText][uniqueQueryID]["rating"];
                var hintComment = firebaseQueries[queryText][uniqueQueryID]["comment"];
                document.getElementById("hintsrating").innerHTML = hintRating;
                document.getElementById("hintshitlevelreason").innerHTML = hintComment;
            }
            else{
                document.getElementById("hintsrating").innerHTML = "RATING";
                document.getElementById("hintshitlevelreason").innerHTML = "Hit level reason..";
            }
        }


        function onSubmitHit(){
            if (currentVersion["write-obsolete"]){
                console.log("This version is obsolete. Write access denied!");
            }
            else{
                firebaseRef.child("users").child(currentUser).child("hits").child(Date()).set(uniqueQueryID);

                officialRating = document.getElementById("officialJudgment").textContent;
                officialComment = document.getElementById("instantFeedbackOfficialComment").textContent;

                if (searchQuery() == false){
                    console.log("adding query..");
                    firebaseAddQuery(query, officialRating, officialComment);
                }
            }

            getNextQuery();

        }

        submit0.addEventListener("click", getNextQuery, false);
        submit1.addEventListener("click", getNextQuery, false);
        agreeButton.addEventListener("click", onSubmitHit, false);

        var firebaseRef = firebase.database().ref();

        // Get all queries
        var firebaseQueries = {};
        function firebaseGetQueries(){
            console.log("firebase get queries..");
            firebaseRef.on("value", function(data){
                firebaseQueries = data.val()["queries"];

            });
        }

        console.log("firebase get queries..");
        firebaseRef.on("value", function(data){
            if (data.val()["users"].hasOwnProperty(currentUser) == false){
                firebaseRef.child("users").child(currentUser).set({
                    "access": "denied",
                    "joined": Date()
                });
            }

            if (data.val()["versions"]["c0a62931421183c09b82b44fa4bdc7e7"]["read-obsolete"]){
                document.getElementById("hintsrating").innerHTML = "VERSION OUTDATED!";
                document.getElementById("hintsrating").style.color = "red";
                document.getElementById("hintsrating").style["line-height"] = "30px";
                document.getElementById("hintshitlevelreason").innerHTML = "This extension version has been outdated! Request for the updated extension!";
                document.getElementById("hintshitlevelreason").style.color = "red";
            }
            else{
                firebaseQueries = data.val()["queries"];
                currentVersion = data.val()["versions"]["c0a62931421183c09b82b44fa4bdc7e7"];
                if (data.val()["users"].hasOwnProperty(currentUser) && data.val()["users"][currentUser]["access"] == "granted"){
                    checkq();
                }
                else{
                    document.getElementById("hintsrating").innerHTML = "RATING ACCESS DENIED";
                    document.getElementById("hintsrating").style.color = "red";
                    document.getElementById("hintsrating").style["line-height"] = "30px";
                    document.getElementById("hintshitlevelreason").innerHTML = "You are not authorized to access hint ratings. Ask for access from the person who gave you this extension.";
                    document.getElementById("hintshitlevelreason").style.color = "red";

                }
            }

        });
        function checkq(){
            // query = getQuery();
            document.getElementById("hintsrating").style.color = "green";
            document.getElementById("hintshitlevelreason").style.color = "black";
            document.getElementById("hintsrating").style["line-height"] = "60px";
            if (searchQuery() == true){
                var hintRating = firebaseQueries[queryText][uniqueQueryID]["rating"];
                var hintComment = firebaseQueries[queryText][uniqueQueryID]["comment"];
                document.getElementById("hintsrating").innerHTML = hintRating;
                document.getElementById("hintshitlevelreason").innerHTML = hintComment;
            }
            else{
                document.getElementById("hintsrating").innerHTML = "RATING";
                document.getElementById("hintshitlevelreason").innerHTML = "Hit level reason..";
            }
        }
        console.log("firebase..");
        // Add query
        function firebaseAddQuery(query, rating, comment){
            console.log("current query");
            console.log(query);
            console.log(rating + " :: " + comment);

            firebaseRef.child("queries").child(queryText).child(uniqueQueryID).set({
                "adTitle": query["adTitle"],
                "adDescription": query["adDescription"],
                "adURL": query["adURL"],
                "rating": rating,
                "comment": comment,
                "rawQuery": query["rawQuery"]
            });

        }
        // Search query
        function searchQuery(){
            console.log("Searching query..");
            console.log(queryText, uniqueQueryID);
            if (firebaseQueries.hasOwnProperty(queryText)){
                if (firebaseQueries[queryText].hasOwnProperty(uniqueQueryID)){
                    return true;
                }
                else{
                    console.log("no unique prop: ", queryText);
                    return false;
                }
            }
            else{
                console.log("no query prop: ", queryText);
                return false;
            }
        }`;

        var firebaseAPIScript = document.createElement("script");
        firebaseAPIScript.setAttribute("asnyc", "false");
        // firebaseAPIScript.setAttribute("defer", "");
        firebaseAPIScript.innerHTML = firebaseAPIScriptRaw;
        document.body.appendChild(firebaseAPIScript);
    }


    setupFirebase(setupFirebaseCallback);


}
