const MAX_BYTES = 10 * 1024 * 1024;

// Reads PDF, DOCX or TXT in the browser. Heavy libraries are loaded only when needed.
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file selected.');
  if (file.size > MAX_BYTES) throw new Error('That file is larger than 10 MB.');
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf') || file.type === 'application/pdf') return extractPdf(file);
  if (name.endsWith('.docx')) return extractDocx(file);
  if (name.endsWith('.doc')) throw new Error('Old .doc files are not supported. Save the file as .docx or PDF and try again.');
  if (name.endsWith('.txt') || file.type.startsWith('text/')) return { text: await file.text(), kind: 'txt', pages: null };
  throw new Error('Please upload a PDF, DOCX or TXT file.');
}

async function extractPdf(file) {
  const pdfjs = await import('pdfjs-dist');
  const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;

  const pages = [];
  for (let n = 1; n <= pdf.numPages; n += 1) {
    const content = await (await pdf.getPage(n)).getTextContent();
    const lines = [];
    let line = '';
    let lastY = null;
    let lastEnd = null;
    content.items.forEach((it) => {
      if (typeof it.str !== 'string') return;
      const [, , , , x, y] = it.transform;
      if (lastY !== null && Math.abs(y - lastY) > 3) { lines.push(line); line = ''; lastEnd = null; }
      if (line && lastEnd !== null && x - lastEnd > 1 && !line.endsWith(' ') && !it.str.startsWith(' ')) line += ' ';
      line += it.str;
      lastY = y;
      lastEnd = x + (it.width || 0);
      if (it.hasEOL) { lines.push(line); line = ''; lastY = null; lastEnd = null; }
    });
    if (line) lines.push(line);
    pages.push(lines.join('\n'));
  }
  return { text: pages.join('\n'), kind: 'pdf', pages: pdf.numPages };
}

async function extractDocx(file) {
  const mod = await import('mammoth/mammoth.browser');
  const mammoth = mod.default || mod;
  const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return { text: value, kind: 'docx', pages: null };
}
