import {
	defineConfig,
} from 'rolldown';

export default defineConfig([
	{
		input: 'benchmark.js',
		output: {
			format: 'umd',
			name: 'Benchmark',
			file: 'benchmark.umd.js',
			minify: false,
			sourcemap: true,
		}
	}
]);
