
// Modify array with object
var data = [];
// ...
data[0] = { "ID": "1", "Status": "Valid" };
data[1] = { "ID": "2", "Status": "Invalid" };
// ...
var tempData = [];
for ( var index=0; index<data.length; index++ ) {
    if ( data[index].Status == "Valid" ) {
        tempData.push( data );
    }
}
data = tempData;

//returns an array of a given object's own property names
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object1));
// expected output: Array ["a", "b", "c"]
