import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

function forUmd() {
    return {
        name: pkg.name,
        globals: {
            react: 'React',
            'react-dom': 'ReactDom',
        },
    };
}
function fromSource(format) {
    return {
        input: 'src/index.tsx',
        external: ['react'],
        output: {
            ...(format === 'umd' && forUmd()),
            file: `lib/index.${format}.js`,
            format: format,
            sourcemap: true,
        },
        plugins: [
            eslint(),
            nodeResolve({
                extensions: ['.ts', '.tsx'],
                mainFields: ['module', 'main'],
            }),
            typescriptPlugin(),
        ],
    };
}
export default [...['esm', 'cjs', 'umd'].map((format) => fromSource(format))];
