const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');


module.exports = composePlugins(withNx(), withReact(), (config) => {
  return config;
});
