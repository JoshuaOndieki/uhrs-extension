function setupFirebase(callback){
    var firebaseScript = document.createElement("script");
    // firebaseScript.setAttribute("defer", "");
    firebaseScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase.js";

    // var firebaseAppScript = document.createElement("script");
    // // firebaseAppScript.setAttribute("defer", "");
    // firebaseAppScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js";

    // var firebaseDatabaseScript = document.createElement("script");
    // // firebaseDatabaseScript.setAttribute("defer", "");
    // firebaseDatabaseScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-database.js";

    // var firebaseAnalysisScript = document.createElement("script");
    // // firebaseAnalysisScript.setAttribute("defer", "");
    // firebaseAnalysisScript.src = "https://www.gstatic.com/firebasejs/7.6.2/firebase-analytics.js";

    // document.body.appendChild(firebaseAppScript);
    document.head.appendChild(firebaseScript);
    // document.body.appendChild(firebaseDatabaseScript);
    // document.body.appendChild(firebaseAnalysisScript);

    setTimeout(callback, 5000);


}

function draftsetupFirebaseCallback(){
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
    firebase.analytics();
    console.log(firebase);
    `;

    var firebaseAPIConfigScript = document.createElement("script");
    firebaseAPIConfigScript.setAttribute("defer", "");
    firebaseAPIConfigScript.innerHTML = firebaseAPIConfigScriptRaw;
    document.body.appendChild(firebaseAPIConfigScript);

    var firebaseAPIScriptRaw = `
    var firebaseRef = firebase.database().ref();

    function createQueryKey(){
        console.log('create query key..');
        console.log(firebaseRef);
        
        firebaseRef.child("queries").child("2").set("two");
    }

    // Get all queries
    function firebaseGetQueries(){
        console.log("firebase get queries..");
        firebaseRef.on("value", function(data){
            console.log(data.val()["queries"]);
        });
    }

    firebaseGetQueries();
    console.log("firebase..");
    // Add query
    function firebaseAddQuery(){

    }
    // Search query
    function searchQuery(){

    }`;

    var firebaseAPIScript = document.createElement("script");
    firebaseAPIScript.setAttribute("defer", "");
    firebaseAPIScript.innerHTML = firebaseAPIScriptRaw;
    document.body.appendChild(firebaseAPIScript);
}

function setupFirebaseCallback(){
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
    console.log(firebase);
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var firebaseRef = firebase.database().ref();

    function createQueryKey(){
        console.log('create query key..');
        console.log(firebaseRef);
        
        firebaseRef.child("queries").child("2").set("two");
    }

    // Get all queries
    function firebaseGetQueries(){
        console.log("firebase get queries..");
        firebaseRef.on("value", function(data){
            console.log(data.val()["queries"]);
        });
    }

    firebaseGetQueries();
    console.log("firebase..");
    // Add query
    function firebaseAddQuery(){

    }
    // Search query
    function searchQuery(){

    }
}

// setupFirebase(setupFirebaseCallback);