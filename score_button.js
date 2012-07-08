//------------------------------------------------------------------------------
(function() {
  var id = SCOREBUTTONID;  // SCOREBUTTONID will be replaced by button id.
  document.write('<div class="score-button" sb-id="' + id + '"></div>');
  console.log("Button created");

  // Load ScoreButton's script
  if (window['SCOREBUTTONLOADED'] !== true) {
    window['SCOREBUTTONLOADED'] = true;

    var jq = document.createElement('script');
    // SCOREBUTTONLOADED will be replaced by script's absolute path.
    jq.setAttribute('src', SCOREBUTTONLOADER);
    jq.setAttribute('type', 'text/javascript');
    (document.getElementsByTagName('head')[0]||
     document.getElementsByTagName('body')[0]).appendChild(jq);
  } else {
    if (SCOREBUTTONUPDATE !== undefined) {
      SCOREBUTTONUPDATE();
    }
  }
})();
