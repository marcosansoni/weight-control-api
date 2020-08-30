const getWeight = (req, res) => {
  const weights = [{
    weight: 88.5,
    user: 'marco'
  }];
  return res.json(weights);
};

module.exports = {getWeight};
