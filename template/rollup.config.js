import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';
import pkg from './package.json';

function forUmd() {
    return {
        name: pkg.name,
        globals: {
            react: 'React',
        },
    };
}
function fromSource(format) {
    return {
        input: 'src/index.ts',
        external: ['react'],
        output: {
            ...(format === 'umd' && forUmd()),
            file: `lib/index.${format}.js`,
            format: format,
            sourcemap: true,
        },
        plugins: [
            nodeResolve({
                extensions: ['.ts', '.tsx'],
                mainFields: ['module', 'main']
            }),
            typescriptPlugin(),
        ],
    };
}
export default [...['esm', 'cjs', 'umd'].map(format => fromSource(format))];
