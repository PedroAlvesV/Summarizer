function getSeedElement(index) {
  var seed = new Date().getTime().toString();
  return Number(seed[seed.length-index]);
}

function makeAdjective(expression){
  return expression.replace(/ /g,"-");
}

function summarizeText(name, whatIs, objective, lang, public, id) {
  if ((whatIs == "") || (objective == "")){
    alert("Fill the necessary fields.");
    return null;
  }
  whatIs = whatIs.toLowerCase();
  objective = objective.toLowerCase();
  public = public.toLowerCase();
  var starting_summary = ""
  if ((name != "") && (getSeedElement(2) < 8))
    starting_summary = name + " is ";
  if (starting_summary == "")
    starting_summary = getSeedElement(2) % 2 == 0 ? "The " : "A " ;
  else
    starting_summary += getSeedElement(2) % 2 == 0 ? "the " : "a " ;
  function buildSummary(){
    var summary = starting_summary
    switch (getSeedElement(1)) {
      case 0:
      case 1:
        if (lang !== "")
          summary += lang + " " + whatIs + " to " + objective;
        else
          summary += whatIs + " to " + objective;
        break;
      case 2:
      case 3:
        summary += whatIs + " to " + objective;
        if (lang !== "")
          summary += ", using " + lang;
        break;
      case 4:
      case 5:
        summary += makeAdjective(objective) + ", " + whatIs;
        if (lang !== "")
          summary += " in " + lang;
        break;
      case 6:
      case 7:
        if (lang !== "")
          summary += makeAdjective(objective) + " " + lang + " " + whatIs;
        else
          summary += makeAdjective(objective) + " " + whatIs;
        break;
      default:
        summary += whatIs + " to " + objective;
//        return "sorry, i'm working on more combinations (try again)"
    }
    summary = summary.replace(/ a (a|e|i|o|u)+/g, ' an $1');
    if ((public !== "") && (getSeedElement(2) % 2 == 0)) {
      summary += " for " + public;
    }
    return summary
  }
  var summary = buildSummary();
  while (summary == document.getElementById(id).value) {
    summary = buildSummary();
  }
  if (id == "summary-text")
    document.getElementById(id).innerHTML = summary + ".";
  else
    document.getElementById(id).value = summary + ".";
}
