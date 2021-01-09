// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

var objs = []
var colorChooser =document.getElementById('color');
function addRect(){
  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: colorChooser.value,
    width: 100,
    height: 100
  });
  objs.push(rect)
  canvas.add(rect);
}


function printPos(){
  console.log(objs);
  for( obj of objs){
    
    console.log("top",this.obj.lineCoords.tr.x,this.obj.lineCoords.tr.y,"bottom",this.obj.lineCoords.bl.x,this.obj.lineCoords.bl.y);
  }
}
