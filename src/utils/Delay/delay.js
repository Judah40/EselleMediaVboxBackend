exports.randomDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
