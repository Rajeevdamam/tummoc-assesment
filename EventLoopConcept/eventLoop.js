import fs from 'fs';
import path from 'path';

// Define the absolute paths of the files to process
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filesToProcess = [path.join(__dirname, 'file1.txt'), path.join(__dirname, 'file2.txt'), path.join(__dirname, 'file3.txt')];

// Function to process a single file
function processFile(filePath, callback) {
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			callback(err);
			return;
		}
		console.log(`Processing ${filePath}: ${data}`);
		callback();
	});
}

// Function to process all files in the array
function processAllFiles(callback) {
	let processedCount = 0;

	function handleFileProcessed(err) {
		if (err) {
			callback(err);
			return;
		}

		processedCount++;

		if (processedCount === filesToProcess.length) {
			callback();
		}
	}

	filesToProcess.forEach((filePath) => {
		processFile(filePath, handleFileProcessed);
	});
}

// This log statement will be executed first
console.log('Starting file processing...');

// Use setImmediate to call processAllFiles asynchronously in the event loop
setImmediate(() => {
	processAllFiles(() => {
		// This log statement will be executed after file processing completes
		console.log('File processing complete!');
	});
});

// This log statement will be executed before file processing completes
console.log('File processing initiated!');
