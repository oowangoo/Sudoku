/**
 * Created by wang on 2015/7/25.
 */
var datas = []
maxIndex = 9
//for(var i = 0; i < maxIndex; i++){
//  datas[i] = new Array(maxIndex + 1)
//}

datas = [
  [2,7,6,0,0,0,0,8,0],// 2,4,6
  [3,0,0,8,0,0,0,1,5],
  [5,0,0,2,0,9,7,0,0],
  [0,8,2,3,0,0,4,0,0],
  [0,0,0,0,5,0,0,0,0],
  [0,0,1,0,0,4,3,6,0],
  [0,0,4,5,0,8,0,0,7],
  [1,6,0,0,0,3,0,0,4],
  [0,3,0,0,0,0,5,2,1]
]

//for(var i = 0; i < maxIndex; i++) {
//  data[i][3] =
//}

function reverseNumber(numbers){
  var dataSource = [1,2,3,4,5,6,7,8,9]
  for(var i = 0; i < numbers.length; i++){
    var n = numbers[i]
    dataSource[n - 1] = 0
  }
  return removeZero(dataSource)

}
function concatSame(a,b){
  var ma = a.length;
  var mb = b.length;
  var rs = [];
  for(var i = 0; i < ma;i++){
    var va = a[i];
    var hasFind = false;
    for(var j = 0; j < mb; j++){
      var vb = b[j];
      if(va === vb){
        hasFind = true;
        break;
      }
    }
    if(hasFind){
      rs.push(va)
    }
  }
  return rs
}
function getLineMayBe(array,rowIndex,colIndex){
  var hasNumber = [];
  for(var i = 0; i < maxIndex; i++){
    if(i === colIndex ||array[rowIndex][i] === 0)
      continue;
    hasNumber.push(array[rowIndex][i])
  }
  return reverseNumber(hasNumber)
}
function getColMayBe(array,rowIndex,colIndex){
  var hasNumber = [];
  for(var i = 0; i < maxIndex; i++){
    if(i === rowIndex || array[i][colIndex] === 0)
      continue;
    hasNumber.push(array[i][colIndex])
  }
  return reverseNumber(hasNumber)
}
function getSquareMayBe(array,rowIndex,colIndex){
  var Row = parseInt(rowIndex / 3);
  var Col = parseInt(colIndex / 3);
  var startRow = Row * 3;
  var startCol = Col * 3;
  var endRow = (Row + 1) * 3;
  var endCol = (Col + 1) * 3;

  var hasNumber = [];
  for(var i = startRow ; i < endRow; i++ ){
    for(var j = startCol ; j < endCol; j++){
      var n = array[i][j];
      if(n != 0)
        hasNumber.push(n)
    }
  }
  return reverseNumber(hasNumber)
}
function getMayBe(array,rowIndex,colIndex){
  var rowMay = getLineMayBe(array,rowIndex,colIndex);
  var colMay = getColMayBe(array,rowIndex,colIndex);
  var squareMay = getSquareMayBe(array,rowIndex,colIndex);
  var m = concatSame(rowMay,colMay);
  m = concatSame(m,squareMay);
  return m
}
function removeZero(array){
  var rs = []
  for(var i =0; i < array.length; i++){
    if(array[i] != 0)
      rs.push(array[i])
  }
  return rs;
}

function getSudoKuSupport(array){
  var support = []
  var hasNumber = false
  for(var i = 0; i < maxIndex; i++){
    support[i] = new Array(9);
  }
  for(var i = 0 ; i < maxIndex; i++){
    for(var j = 0 ; j < maxIndex; j++){
      if(array[i][j] != 0){
        continue;
      }
      support[i][j] = getMayBe(array,i,j)
    hasNumber = true
    }
  }
  return hasNumber ? support : null
}
function fillSudoKu(array,support){
  for(var i = 0 ; i < maxIndex; i++) {
    for (var j = 0; j < maxIndex; j++) {
      var value = support[i][j]
      if(!value || value.length != 1)
        continue;
      array[i][j] = value[0]
    }
  }
}
function sudoku(array){
  var support = null;
  var i = 0;
  while((support = getSudoKuSupport(array)) != null){
    fillSudoKu(array,support)
    i++;
    if(i > 100){
      break;
    }
  }
  console.log(array);
}
sudoku(datas)