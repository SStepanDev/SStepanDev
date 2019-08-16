// Samples
function getDoc() {
  url = 'https://docs.google.com/document/d/1SN-nFmyeqVWeJRjJ_-X4V_vuHj206_mLTNFGU4YogW0/edit#';
  var doc = DocumentApp.openByUrl(url);

  // get paragraph
  var paragraphs = doc.getBody().getParagraphs();

  // get paragraphs attributes
  var attribute = paragraphs[1].getAttributes();
  Logger.log(attribute);
  var headingtype = attribute["HEADING"];

  return doc;
}

//
function getAllMatches(){
  var textArray = getHeadings1234();
  Logger.log(textArray.heading2);
  //iterate all paragraphs in array
  textArray.forEach(function(item, index){
    //find keywords in paragraph
    
  })
}

function getHeadings1234(doc){
  if(!doc){ doc=getDoc(); }
  var heading1 = [];
  var paragraphs = doc.getBody().getParagraphs();
//  Logger.log(paragraphs);

  paragraphs.forEach( function(paragraph, index){
    var headingtype = paragraph.getAttributes()["HEADING"];
    // split body text to H1,H2,H3,H4 and Normal Text and save to array
    if(headingtype=="Heading 1"){ heading1.push(paragraph.getText());
    }
  })
  // Save all data
  var summary = {
    heading1: heading1,
    heading2: heading2,
    heading3: heading3,
    heading4: heading4,
    normalText: normalText
  }
//  Logger.log(summary)
  return summary;
}
