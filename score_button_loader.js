//------------------------------------------------------------------------------
var SCOREBUTTONUPDATE = undefined;

(function() {
  //----------------------------------------------------------------------------
  // Handle pending jobs.
  //----------------------------------------------------------------------------

  // Queue structure for pendding jobs.
  var pendingQueue = [];
  var withoutPending = false;

  var runPendingJob = function() {
    withoutPending = true;
    for (var i = 0; i < pendingQueue.length; i++) {
      var job = pendingQueue[i];
      if (typeof job === 'function') {
        job();
      }
    }
  };

  var addPendingJob = function(job) {
    if (typeof job === 'function') {
      if (withoutPending === false) {
        pendingQueue.push(job);
      } else {
        job();
      }
    } else {
      console.error("Pending job must be a function");
    }
  };

  //----------------------------------------------------------------------------
  // Load required scripts
  //----------------------------------------------------------------------------
  var scoreServer = "http://localhost:5000/";

  // Load jQuery
  var jq = document.createElement('script');
  jq.setAttribute('src',
                  'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js');
  jq.setAttribute('type', 'text/javascript');
  (document.getElementsByTagName('head')[0]||
   document.getElementsByTagName('body')[0]).appendChild(jq);

  // Setup to handle the event of script's loading.
  if (jq.readyState) {
    // For IE. Can IE follow the standard??
    jq.onreadystatechange = function () {
      if (jq.readyState == "loaded" || jq.readyState == "complete") {
        script.onreadystatechange = null;
        runPendingJob();
      }
    };
  } else {
    // Good browsers.
    jq.onload = function () {
      runPendingJob();
    };
  }

  // CSS
  var css = document.createElement('link');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('type', 'text/css');
  css.setAttribute('href', 'score_button.css');
  document.getElementsByTagName('head')[0].appendChild(css);

  //----------------------------------------------------------------------------
  // End of loading script
  //----------------------------------------------------------------------------


  //----------------------------------------------------------------------------
  // Interact with server.
  //----------------------------------------------------------------------------

  // plus score by one
  var plusScore = function(id, updateFunction) {
    addPendingJob(function(){
      $.getJSON(scoreServer + "plus?id=" + id + "&callback=?",
                function(d) {
                  updateFunction(d['score']);
                });
    });
  };

  // minus score by one
  var minusScore = function(id, updateFunction) {
    addPendingJob(function() {
      $.getJSON(scoreServer + "minus?id=" + id + "&callback=?",
                function(d) {
                  updateFunction(d['score']);
                });
    });
  };

  // Get score without modifying it.
  var getScore = function(id, updateFunction) {
    addPendingJob(function() {
      $.getJSON(scoreServer + "score?id=" + id + "&callback=?",
                function(d) {
                  updateFunction(d['score']);
                });
    });
  };

  // Build up button
  var buildUp = function(id, updateFunction) {
    var btn = document.createElement('div');
    btn.className = "button plus left";
    btn.innerHTML = "+";
    btn.addEventListener('click', function(e) {
      plusScore(id, updateFunction);
    });
    return btn;
  }

  // Build down button
  var buildDown = function(id, updateFunction) {
    var btn = document.createElement('div');
    btn.className = "button minus right";
    btn.innerHTML = "-";
    btn.addEventListener('click', function(e) {
      minusScore(id, updateFunction);
    });
    return btn;
  }

  // Build score display
  var buildScore = function(id) {
    var display = document.createElement('div');
    display.className = "score";
    return display;
  };

  // Function that update value of score.
  var updateScore = function(scoreElement, score) {
    scoreElement.innerHTML = score + '';
  };

  // Build score buttons
  var buildButton = function(elem, id) {
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    table.className = "layout-frame";
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");
    td1.className = "layout-cell";
    td2.className = "layout-cell";
    td3.className = "layout-cell";

    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    elem.appendChild(table);

    var score = buildScore(id);
    var uf = updateScore.bind(score, score);
    var btnUp = buildUp(id, uf);
    var btnDown = buildDown(id, uf);
    getScore(id, uf);

    td1.appendChild(btnUp);
    td2.appendChild(score);
    td3.appendChild(btnDown);
  };

  SCOREBUTTONUPDATE = function() {
    console.log('Reload score button');
    // Modify all the score buttons in the page.
    var btns = document.querySelectorAll(".score-button");
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      var loaded = btn.getAttribute("sb-loaded");
      if (loaded !== "1") {
        var sbid = btn.getAttribute("sb-id");
        buildButton(btn, sbid);
        btn.setAttribute("sb-loaded", "1");
      }
    }
  };

  SCOREBUTTONUPDATE();
  console.log('Score button loader loaded');
})();
