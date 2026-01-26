import {
	defineConfig,
} from 'rolldown';

export default defineConfig([
	{
		input: 'benchmark.ts',
		output: {
			format: 'esm',
			name: 'Benchmark',
			file: 'benchmark.js',
			minify: false,
			sourcemap: true,
		}
	},
	{
		input: 'benchmark.ts',
		input: 'benchmark.js',
		output: {
			format: 'umd',
			name: 'Benchmark',
			file: 'benchmark.umd.js',
			minify: false,
			sourcemap: true,
		}
	},
]);
