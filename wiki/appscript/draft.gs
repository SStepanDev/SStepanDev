
function main(){
  var doc = getDoc();
  var spreadsheet = getSpreadsheet();
  var sheet1 = spreadsheet.getSheetByName("Res1");          //getSheet("Res1");
  var sheet2 = spreadsheet.getSheetByName("Res2");          //getSheet("Res2");
  var sheetParam = spreadsheet.getSheetByName("Parameters");//getSheet("Parameters");

  // Sheet1 Section
  var keyWordsList = getKeyWords(sheet1);                                       // return keywords list from A2:
  var totalWordsArray = getTotalWords(doc, sheetParam);                         // return array of all words minus excuded words
//  var totalWords = totalWordsArray.length;                                      // return number of words
//  var paragraphsSorted = sortParagraphs(doc);                                   // return sorted paragraphs by h1,h2,h3,h4 and NormalText
//  var keyWordsMatchesFound = getAllMatches(paragraphsSorted, keyWordsList);     // return array with numbers of matches
//  var summForEachKeyword = getSummForEachKeyword(keyWordsMatchesFound);         // return array
//  var keywordDistribution  = countDistribution(totalWords, summForEachKeyword); // %Dist = Percent Distribution (Total / Word Count) Return array 2d
//  printKeywordsMatchesRes(sheet1, keyWordsMatchesFound);                        // (Range B2:G...)
//  printSumm(sheet1, summForEachKeyword);                                        // (Range G:)
//  printTotal(sheet1, totalWords);                                               // (Cell L1)
//  printDistribution(sheet1, keywordDistribution);                               // (Range H:)

  //Sheet2 Section
  var textAnalyzer = new TextAnalyzer(sheet2, totalWordsArray);
//  textAnalyzer.oneKeywordAnalysis();
//  textAnalyzer.twoKeywordAnalysis();
  textAnalyzer.keywordAnalysis(1);
  textAnalyzer.keywordAnalysis(2);
  textAnalyzer.keywordAnalysis(3);
  textAnalyzer.keywordAnalysis(4);

}
// =========== Do analysis of body text ====================//
var TextAnalyzer = function(sheet2,totalWordsArray) {
  this.sheet2 = sheet2;
  this.totalWordsArray = totalWordsArray.map(function(word){return word.toLowerCase();}); // Chancge all wordds to Lower Case
  this.totalWords = this.totalWordsArray.length;


  this.print = function(row, col, rowNum, colNum, array){
//   Logger.log('test print');
    var range = this.sheet2.getRange(row, col, rowNum, colNum);
    this.sheet2.getRange(row, col, 10000, colNum).clearContent();
    range.setValues(array);
  }
  // get words series, depends request
  this.getWords = function(wordsNum, wArr, i){
    if(wordsNum == 1){
     return wArr[i];
    }else if(wordsNum == 2){
      return wArr[i]+" "+wArr[i+1];
    }else if(wordsNum == 3){
      return wArr[i]+" "+wArr[i+1]+" "+wArr[i+2];
    }else if(wordsNum == 4){
      return wArr[i]+" "+wArr[i+1]+" "+wArr[i+2]+" "+wArr[i+3];
    }
  }
  //not in use
  this.getCol = function(wordsNum){
    if(wordsNum == 1){
     return 1;
    }else if(wordsNum == 2){
      return 4;
    }else if(wordsNum == 3){
      return 7;
    }else if(wordsNum == 4){
      return 10;
    }
  }

  this.keywordAnalysis = function(wordsNum){
    var unicWords = [], repetitions = [], distributions = [];
    var wArr = this.totalWordsArray;
    //iterate array
    var arrLength = wArr.length-wordsNum-1;
    for(var i=0; i<arrLength; i++){
      var compareWords = this.getWords(wordsNum, wArr, i);
//      Logger.log(compareWords);
      var unic = (unicWords.indexOf(compareWords)==-1);
      if(unic){                                                  // if word is unic do...
        // Count number of Repetition
        var num = 0;
        for(var j = i; j<arrLength; j++){               // iterate array and count (j=i to skip old repetition)
          var currWord = this.getWords(wordsNum, wArr, j);
          if(currWord==compareWords){
            num++;
          }
        }
        // Add res to arr
        unicWords.push(compareWords);
        repetitions.push(num);
        distributions.push(num/this.totalWords*100);
      }
    }
    // save all data in array to print data in Cells Range
    var sumArr = [];
    unicWords.forEach(function(item, index){
      sumArr.push([item, repetitions[index], distributions[index]]);
    })
    var col = 1+(wordsNum-1)*3;
    this.print(3, col, sumArr.length, sumArr[0].length, sumArr )
  }

  this.twoKeywordAnalysis = function(){
    var unicWords = [], repetitions = [], distributions = [];
    var wArr = this.totalWordsArray;
    //iterate array
    for(var i=0; i<wArr.length-1; i++){
      var compareWords = wArr[i]+" "+wArr[i+1];
      Logger.log(compareWords);
      var unic = (unicWords.indexOf(compareWords)==-1);
      if(unic){                                                  // if word is unic do...
        // Count number of Repetition
        var num = 0;
        for(var j = i; j<wArr.length-1; j++){               // iterate array and count (j=i to skip old repetition)
          var currWord = wArr[j]+" "+wArr[j+1];
          if(currWord==compareWords){
            num++;
          }
        }
        // Add res to arr
        unicWords.push(compareWords);
        repetitions.push(num);
        distributions.push(num/this.totalWords*100);
      }
//      wArrInner.splice(0, 1); //
    }
     // save all data in array to print data in Cells Range
    var sumArr = [];
    unicWords.forEach(function(item, index){
      sumArr.push([item, repetitions[index], distributions[index]]);
    })
    this.print(3, 4, sumArr.length, sumArr[0].length, sumArr )
  }

  this.oneKeywordAnalysis = function(){
    var unicWords = [], repetitions = [], distributions = [];
    var wArr = this.totalWordsArray;
    var totalWords = wArr.length;
    wArr.forEach(function(word, index){                          // iterate each word in
      var unic = (unicWords.indexOf(word)==-1);
      if(unic){                                                  // if word is unic do...
        // Count number of Repetition
        var num = 0;
        for(var i = 0; i<wArr.length; i++){                      // iterate array and count Repetition
          if(wArr[i]==word){
            num++;
          }
        }
//        var regExp = new RegExp(word, 'gim');
//        //  Logger.log(regExp);
//        var matches = string.match(regExp);      // get all word matches
//        var num = matches.length;

        // Add res to arr
        unicWords.push(word);
        repetitions.push(num);
        distributions.push(num/totalWords*100);
      }
    });
//    Logger.log(unicWords.length);
//    Logger.log(repetitions.length);
//    Logger.log(distributions.length);
    // save all data in array to print data in Cells Range
    var sumArr = [];
    unicWords.forEach(function(item, index){
      var row = [item, repetitions[index], distributions[index]];
      sumArr.push(row);
    })
//    Logger.log(sumArr);
    this.print(3, 1, sumArr.length, sumArr[0].length, sumArr )
  }


}


// ====== Count %Dist = Percent Distribution (Total / Word Count) for each Keyword ===//
function countDistribution(totalWords, summForEachKeyword){
  var keywordDistribution =  summForEachKeyword.map(function(num){
     var newNum =  num/totalWords*100;
     return newNum.toFixed(3);
  });
  var distribution = [];
  keywordDistribution.forEach(function(item, index){
    distribution.push([item])
  });
  Logger.log(distribution);
  return distribution;
}

// ====== Get Total Words minus excluded words =============================//
function getTotalWords(doc, sheetParam){
  var bodyText = doc.getBody().getText();
//  Logger.log(bodyText);
  var excludedWords = sheetParam.getRange(2, 1, sheetParam.getLastRow()-1).getValues(); // get words list
//  var excludedWords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "it's", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "we've", "we're", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
  excludedWords = excludedWords.join("|");
  excludedWords = "(\\b(?:"+excludedWords+")\\b)";  // build RegExp like (\b(?:are|a|of|on|and)\b)
  var regExp = new RegExp(excludedWords, 'gim');
  var regExpLinks = new RegExp("https?:\/\/.*[\r\n]*", 'gim');
//  Logger.log(regExp);
  bodyText = bodyText.replace(regExpLinks, "");   // remove links
  bodyText = bodyText.replace(regExp, "");        // remove excluded words
//  Logger.log(bodyText);
  var matches = bodyText.match(/(?!-)([\w\d\&\’\'-]+)/gi); // get all words from body text. Return Array
//  Logger.log(matches.length);
//  Logger.log(matches);
  return matches ? matches : 0;
}

// ====== Get Summ for Each Keyword Matches ( For Range G:) ====================//
function getSummForEachKeyword(keyWordsMatchesFound){
  // Count summ
  var summ = [];
  keyWordsMatchesFound.forEach(function(item, index){
    var arrSum = item.reduce(function(total,current){
        return total+current;
      },0);
//    Logger.log(arrSum);
    summ.push([arrSum]);
  });
  return summ;
}

// ====== Print Summ for Each Keyword Matches (Range G:) =====================//
function printSumm(sheet1, summ){
  //print summary
  var range = sheet1.getRange(2, 7, sheet1.getLastRow()-1);
  range.clearContent();
  range.setValues(summ);
}
// ====== Print Total Words in body text (Range L1)===========================//
function printTotal(sheet1, totalWords){
  var range = sheet1.getRange(1, 12, 1, 1);
  range.clearContent();
  range.setValue(totalWords);
}
// ====== Print Keyword Matches for Each Paragraph Type (Range B2:G...) =======//
function printKeywordsMatchesRes(sheet, keyWordsMatchesFound){
  var range = sheet.getRange(2, 2, sheet.getLastRow()-1, 5);
  range.clearContent();
  range.setValues(keyWordsMatchesFound);
}
// ====== Print Distribution ==================================================//
function printDistribution(sheet1, data){
  var range = sheet1.getRange(2, 8, sheet1.getLastRow()-1, 1);
  range.clearContent();
  range.setValues(data);
}

// ====== Get Keywords from Sheet1 Range A2: ==================================//
function getKeyWords(sheet){
//  var sheet = getSheet();
  var keyWordsList = sheet.getRange(2, 1, sheet.getLastRow()-1).getValues();
//  Logger.log(keyWordsList);
  return keyWordsList;
}

// ======
function getDoc() {
  url = 'https://docs.google.com/document/d/1SN-nFmyeqVWeJRjJ_-X4V_vuHj206_mLTNFGU4YogW0/edit#';
  var doc = DocumentApp.openByUrl(url);
  return doc;
}
// ======
function getSpreadsheet(){
//  var sheetName = sheetName;
  var url = "https://docs.google.com/spreadsheets/d/1pOu4sVneX6JTGX9ncoDwCyhFBI6cArGpaIWsNSm7vng/edit#gid=70729781";
  var ss = SpreadsheetApp.openByUrl(url);
//  var sheet = ss.getSheetByName(sheetName);
  return ss;
}

// =====Get Keyword Matches for Each Paragraph Type ========================//
// =============Return 2d Array===================
function getAllMatches(textObj, keyWords){
  var matchCounter = [] ;
//  var textObj = sortParagraphs();
//  var keyWord = /Drum/gi;
//  var keyWords = getKeyWords();//return array []

  // Iterate All Keywords
  keyWords.forEach(function(item, ind){
    var keyWord = new RegExp(item, 'gi');
    //Logger.log(keyWord);

    //Iterate keys from textObj
    for(var keyName in textObj){
    var counter = 0; // count matches for each paragraph type
    //check if the index exists in the outer array
    if (!(ind in matchCounter)) {
        //if it doesn't exist, we need another array to fill
        matchCounter.push([]);
    }
    //Logger.log(keyName);

      // Iterate All paragraphs in obj
      textObj[keyName].forEach(function(paragraph, index){
        // Find all matches of keywords in paragraph
        var match = paragraph.match(keyWord);
//        Logger.log(keyWord);
//        Logger.log(match);
//        Logger.log(paragraph);
        if(match != null){
          counter = counter + match.length ;
        }
      })
      matchCounter[ind].push(counter);
    }
  })
  return matchCounter;
//  Logger.log(matchCounter);
}

// ====== Sort all Paragraphs by H1, H2, H3, H4, and Normal Text ===============//
function sortParagraphs(doc){
  if(!doc){ doc=getDoc(); }
  var heading1 = [], heading2 = [], heading3 = [], heading4 = [],normalText = [];
  var paragraphs = doc.getBody().getParagraphs();
//  Logger.log(paragraphs);

  paragraphs.forEach( function(paragraph, index){
    var headingtype = paragraph.getAttributes()["HEADING"];
    // split body text to H1,H2,H3,H4 and Normal Text and save to array
    if(headingtype=="Heading 1"){ heading1.push(paragraph.getText());
    }else if(headingtype=="Heading 2"){ heading2.push(paragraph.getText());
    }else if(headingtype=="Heading 3"){ heading3.push(paragraph.getText());
    }else if(headingtype=="Heading 4"){ heading4.push(paragraph.getText());
    }else if(headingtype=="Normal"){ normalText.push(paragraph.getText());
//      Logger.log(paragraph.getText());
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
