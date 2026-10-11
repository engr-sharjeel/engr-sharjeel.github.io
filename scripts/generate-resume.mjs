// The owner now supplies the final PDF. This command deliberately cannot
// regenerate or overwrite public/downloads/muhammad-sharjeel-cv.pdf.
console.error('generate:resume is retired: the public CV is an unchanged owner-supplied PDF.');
console.error('To replace it, inspect the chosen source, copy its bytes to public/downloads/muhammad-sharjeel-cv.pdf, and update the explicit hash/page-count manifest after review. See README.md.');
process.exitCode = 1;
