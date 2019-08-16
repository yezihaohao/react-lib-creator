import nodeResolve from 'rollup-plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';

function fromSource(format) {
    return {
        input: 'src/index.ts',
        external: ['react', 'chalk', 'path', 'commander', 'fs-extra'],
        output: {
            ...(format === 'umd' && forUmd()),
            file: `lib/index.${format}.js`,
            format: format,
            sourcemap: true,
        },
        plugins: [
            nodeResolve({
                extensions: ['.ts', '.tsx'],
                mainFields: ['module', 'main'],
            }),
            typescriptPlugin(),
        ],
    };
}
export default [...['cjs'].map(format => fromSource(format))];
