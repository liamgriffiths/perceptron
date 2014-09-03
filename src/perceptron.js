'use strict';

export { perceptron };

const randomArray = (size) =>
  new Array(...new Array(size)).map(_ => Math.random());

const step = (n) =>
  n > 0.5 ? 1 : 0;

const perceptron = (size, activate = step, alpha = 0.005) => {
  // initialize with random weights
  var [bias, ...weights] = randomArray(size + 1);

  let predict = (x) =>
    // apply the activation function to the sum of the product of the weights
    // and the input
    activate(x.reduce((acc, val, i) => acc + weights[i] * val, bias));

  let train = (x, y) => {
    // compute the error (difference betweeen actual and guess)
    let error = y - predict(x);
    
    // adjust weights according to error
    bias += error * alpha;
    weights = weights.map((w, i) => {
      // calculate the change to make, if the error is 0, the change will be 0,
      // if the change is positive, we will make a positive change to the weight
      // else we will make a negative change to the weight
      let delta = error * x[i];

      // multiply the change by alpha (learning rate) to control the rate at
      // which we update the weights. this allows us to make small incremental
      // changes to the wieght, so that a single training example has a much
      // smaller effect on the end result
      return w + delta * alpha;
    });
  };

  return { predict, train };
};
