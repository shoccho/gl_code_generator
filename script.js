// create a wrapper around native canvas element (with id="c")
var canvas = (this.__canvas = new fabric.Canvas("c"));
uuid = 0;
var objs = [];
var colorChooser = document.getElementById("color");

var code = "";
var stateColor = null;
function addRect() {
  var rect = new fabric.Rect({
    id: uuid++,
    left: 100,
    top: 100,
    fill: colorChooser.value,
    width: 100,
    height: 100,
  });
  objs.push(rect);
  canvas.add(rect);
}
function addCircle() {
  var circle = new fabric.Circle({
    id: uuid++,
    left: 100,
    top: 100,
    fill: colorChooser.value,
    radius: 50,
  });

  objs.push(circle);
  canvas.add(circle);
}

function addTriangle() {
  var Triangle = new fabric.Triangle({
    id: uuid++,
    left: 0,
    top: 100,
    fill: colorChooser.value,
    width: 100,
    height: 100,
  });
  console.log(Triangle);
  objs.push(Triangle);
  canvas.add(Triangle);
}

function removeObj() {
  var element = canvas.getActiveObject();
  for (idx in objs) {
    if (objs[idx].id == element.id) {
      objs.splice(idx, 1);
    }
  }
  canvas.remove(element);
  canvas.renderAll();
  canvas.requestRenderAll();
}

function printPos() {
  code = "";

  console.log(objs);
  for (obj of objs) {
    // console.log(obj.type)
    if (obj.type == "circle") {
      console.log(parseInt(obj.left), parseInt(obj.top), obj.radius / 2);
    } else if (obj.type == "rect") {
      // console.log("top",this.obj.lineCoords.tl.x,this.obj.lineCoords.tl.y,"bottom",this.obj.lineCoords.br.x,this.obj.lineCoords.br.y);
      genRect(obj);
    } else if (obj.type == "triangle") {
      genTriangle(obj);
      // console.log(obj);
      // console.log("first ",parseInt(this.obj.lineCoords.bl.x+this.obj.lineCoords.br.x/2),"second ",this.obj.lineCoords.bl,"third ",this.obj.lineCoords.br);
    }
  }
  document.getElementById("generatedCode").innerText = code;
}

function genRect(rect) {
  var color = rect.fill;
  if (color != stateColor) {
    stateColor = color;
    code += genGlcolor(color);
  }
  var tx = rect.lineCoords.tl.x.toFixed(2);
  var ty = rect.lineCoords.tl.y.toFixed(2);

  var bx = rect.lineCoords.br.x.toFixed(2) - 1;
  var by = rect.lineCoords.br.y.toFixed(2) - 1;

  var line = `glRectf(${tx}f,${ty}f, ${bx}f,${by}f);\n`;
  code += line;
}

function genTriangle(triangle) {
  var color = triangle.fill;
  if (color != stateColor) {
    stateColor = color;
    code += genGlcolor(color);
  }
  var fx = triangle.lineCoords.bl.x.toFixed(2);
  var fy = triangle.lineCoords.bl.y.toFixed(2);

  var sx = triangle.lineCoords.br.x.toFixed(2);
  var sy = triangle.lineCoords.br.y.toFixed(2);

  var tx = triangle.left.toFixed(2) + (parseFloat(fx) + parseFloat(sx)) / 2;
  var ty = triangle.lineCoords.tr.y.toFixed(2);

  code += "glBegin(GL_TRIANGLES);\n";
  code += `glVertex2f(${fx}f,${fy}f);\n`;
  code += `glVertex2f(${sx}f,${sy}f);\n`;
  code += `glVertex2f(${tx}f,${ty}f);\n`;
  code += "glEnd();\n";
}

function genGlcolor(colorCode) {
  var vals = [];
  for (i = 1; i < colorCode.length; i += 2) {
    vals.push(
      (parseInt("0x" + colorCode[i] + colorCode[i + 1]) / 255).toFixed(2)
    );
  }
  return `glColor3f(${vals[0]}f,${vals[1]}f,${vals[2]}f);\n`;
}
