import {
	defineConfig,
} from 'rolldown';

export default defineConfig([
	{
		input: 'benchmark.ts',
		output: {
			format: 'esm',
			file: 'benchmark.js',
			exports: 'named',
			minify: false,
			sourcemap: true,
		}
	},
	{
		input: 'lib/integrations/Bencher.ts',
		output: {
			format: 'esm',
			file: 'lib/integrations/Bencher.js',
			exports: 'named',
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
			exports: 'named',
			minify: false,
			sourcemap: true,
		}
	},
]);
