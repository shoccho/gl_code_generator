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
  document.getElementById("generatedCode").innerText = "";
  console.log(objs);
  for (obj of objs) {
    if (obj.type == "circle") {
      genCircle(obj);
    } else if (obj.type == "rect") {
      genRect(obj);
    } else if (obj.type == "triangle") {
      genTriangle(obj);
    }
  }

  document.getElementById("generatedCode").innerText = part1 + code + part2;
}

function genRect(rect) {
  var color = rect.fill;
  if (color != stateColor) {
    stateColor = color;
    code += genGlcolor(color);
  }


  code += "\tglBegin(GL_QUADS);\n";
  code += `\t\tglVertex2f(${rect.lineCoords.tr.x}f,${rect.lineCoords.tr.y}f);\n`;
  code += `\t\tglVertex2f(${rect.lineCoords.tl.x}f,${rect.lineCoords.tl.y}f);\n`;
  code += `\t\tglVertex2f(${rect.lineCoords.bl.x}f,${rect.lineCoords.bl.y}f);\n`;
  code += `\t\tglVertex2f(${rect.lineCoords.br.x}f,${rect.lineCoords.br.y}f);\n`;
  code += "\tglEnd();\n";

}

function genCircle(circle) {
  var color = circle.fill;
  if (color != stateColor) {
    stateColor = color;
    code += genGlcolor(color);
  }
  code += `\tdrawFilledelipse(${circle.left + circle.radius},${
    circle.top + circle.radius
  },${circle.radius},${circle.radius});\n`;
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

  var tx = parseFloat(fx) + (parseFloat(sx) - parseFloat(fx)) / 2;
  var ty = triangle.lineCoords.tr.y.toFixed(2);

  code += "\tglBegin(GL_TRIANGLES);\n";
  code += `\t\tglVertex2f(${fx}f,${fy}f);\n`;
  code += `\t\tglVertex2f(${sx}f,${sy}f);\n`;
  code += `\t\tglVertex2f(${tx}f,${ty}f);\n`;
  code += "\tglEnd();\n";
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
