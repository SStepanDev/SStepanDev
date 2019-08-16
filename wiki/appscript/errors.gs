//https://stackoverflow.com/questions/44913717/unhandled-exceptions-in-google-apps-script

// index.html
//
<script>
  google.script.run
        .withSuccessHandler(function(){console.log('OK')})
        .withFailureHandler(function(e){console.error(e)})
        .withLogger(function(e){console.warn("The following log was generated:"+e)})
        .serverFunctionCall();
</script>

// code.gs
//
function serverFunctionCall(){
   console.log("This log will generate a callback");
   return true;

}

// Check if arrai is empty
if(wordsNum == 1 && (sumArr ===undefined || sumArr.length == 0) ){
      return SpreadsheetApp.getUi().alert('ERROR: Blank document or not enough words');
    }
