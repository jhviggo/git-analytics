function initSVG() {
  const draw = SVG().addTo('#container').size(300, 300);
  draw.circle(100).attr({ fill: '#f06' });
  draw.circle(50, 150).attr({ fill: '#60f' }).x(100).y(100);
}

initSVG();