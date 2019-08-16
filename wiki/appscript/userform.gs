//https://developers.google.com/apps-script/reference/base/ui
function showUserForm() {
  // create User from from userform.html
  var template = HtmlService.createTemplateFromFile("userform");
  var html = template.evaluate();
  SpreadsheetApp.getUi().showSidebar(html);

//  var ui = SpreadsheetApp.getUi();
//  var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);
}
