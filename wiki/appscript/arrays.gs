
// Search for string in array
var myarr = [["I", "like", " I turtles"], ["lima", "", ""], ["l"]];
var arraycontainsturtles = (myarr[0].indexOf("I")== -1);
Logger.log(arraycontainsturtles);


// Sort array byColumn (start from 0) in descending order
this.sort = function(arr,byColumn){
//    var arr = [[12, 'AAA', 1], [58, 'BBB', 2], [28, 'CCC', 3],[18, 'DDD', 4]]
  arr = arr.sort(function(a,b) {
      return b[byColumn]-a[byColumn];
  });
  return arr;
}
