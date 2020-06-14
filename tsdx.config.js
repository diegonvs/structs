module.exports = {
    rollup(config, options) {
        options = {
            ...options,
            name: 'structs',
            input: './src/index.ts',
            env: 'production',
            format: ['cjs', 'umd', 'esm', 'system'],
            target: ['node', 'browser'],
            minify: true,
        }

        return config;
    }
}