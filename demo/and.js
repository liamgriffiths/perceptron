var perceptron = require('..');

var train = function(p, data, times) {
  while (times--) {
    data.forEach(function(row) {
      p.train(row[0], row[1]);
    });
  }
}

var test = function(p, data, title) {
  var right = 0;
  var wrong = 0;

  data.forEach(function(row) {
    if (p.predict(row[0]) === row[1]) {
      right++;
    } else {
      wrong++;
    }
  });

  console.log(title);
  console.log('````````````````````````````````');
  console.log('Percentage correct: %d%', (right / (right + wrong)) * 100);
  console.log('\n');
};

// learn 'and'
var data = [
  [[1, 1], 1],
  [[1, 0], 0],
  [[0, 1], 0],
  [[0, 0], 0]
];
var p = perceptron(2);

test(p, data, 'Learning "and": before training');
train(p, data, 100);
test(p, data, 'Learning "and": after training');
