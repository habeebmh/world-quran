import {createCompatibilityConfig} from '@open-wc/building-rollup'
import scss from 'rollup-plugin-scss';
import cpy from 'rollup-plugin-cpy';

const configs = createCompatibilityConfig({input: './src/index.html'});

export default configs.map(config => ({
  ...config,
  plugins: [
    scss({
      output: false,
      outputStyle: 'compressed',
      includePaths: ['node_modules']
    }),
    ...config.plugins,
    cpy([
      {
        files: "./src/assets/",
        dest: "./dist/assets/"
      },
      {
        files: "./src/book/",
        dest: "./dist/book/"
      },
      {
        files: "./src/main.css",
        dest: "./dist/"
      },
    ])
  ]
}));
