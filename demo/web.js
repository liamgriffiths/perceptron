const perceptron = require('../src/perceptron').perceptron;

function Points(n) {
  this.canvas = document.createElement('canvas');
  this.canvas.width = document.documentElement.clientWidth;
  this.canvas.height = document.documentElement.clientHeight;
  this.context = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);

  this.points = new Array(n);
  this.perceptron = perceptron(2);

  this.frame = 0;
  this.angle = Math.random() * 2;

  this.lineFn = (x) => this.angle * x;

  // create new random point && train n points on the perceptron
  for (let i = 0; i < n; i++) {
    let point = new RandomPoint(this.canvas.width, this.canvas.height);
    this.points[i] = point;

    let answer = point.y > this.lineFn(point.x) ? 1 : 0;
    this.perceptron.train([point.x, point.y], answer);
  }

}

Points.prototype = {
  run: function() {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.run.bind(this));
  },

  update: function() {
    this.frame++;
  },

  draw: function() {
    // clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawPoints();
    this.drawLine();
  },

  drawLine: function() {
    this.context.beginPath();
    this.context.moveTo(0, this.lineFn(0));
    this.context.lineTo(this.canvas.width, this.lineFn(this.canvas.width));
    this.context.strokeStyle = 'red';
    this.context.stroke();
  },

  drawPoints: function() {
    let count = this.frame % this.points.length;

    // draw points
    this.points.slice(0, count).forEach(point => {
      this.context.beginPath();
      this.context.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);

      let guess = this.perceptron.predict([point.x, point.y]);
      if (guess > 0.5){
        this.context.fillStyle = 'rgba(100, 100, 150, 0.2)';
        this.context.fill();
      } else {
        this.context.strokeStyle = 'rgba(100, 100, 150, 0.2)';
        this.context.stroke();
      }
    });
  }
};

function RandomPoint(w, h) {
  this.x = Math.random() * w;
  this.y = Math.random() * h;
}


window.onload = function(){
  new Points(3000).run();
};
