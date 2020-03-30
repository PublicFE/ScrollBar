import babel from 'rollup-plugin-babel';

export default {
    input: 'index.js',
    output: {
        file: './build/bundle.js',
        format: 'umd',
        name: 'ScrollBar'
    },
    watch: {
        include: './src/**'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        }),
    ]
};

