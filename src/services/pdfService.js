import { FONTS, MARGIN, PAGE, SCALE, SECTION_ORDERS } from '../data/layoutSpec';
import { parseBullets } from './resumeText';

const INK = [27, 36, 32];
const GREY = [90, 104, 96];

// Standard PDF fonts only cover Latin text, so normalise common punctuation.
const clean = (s = '') =>
  String(s)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x20-\x7E\u00A0-\u00FF\u2022]/g, '?');

const hexToRgb = (hex) => {
  const h = (hex || '#000000').replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const tint = ([r, g, b], t = 0.12) => [r, g, b].map((c) => Math.round(c * t + 255 * (1 - t)));

export const resumeFileName = (resume) => {
  const base = (resume.personal.fullName || 'resume').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  return `${base || 'resume'}-resume.pdf`;
};

export async function buildResumePdf(resume) {
  const { jsPDF } = await import('jspdf');
  const s = resume.settings;
  const page = PAGE[s.pageSize] || PAGE.a4;
  const m = MARGIN[s.margin] ?? MARGIN.normal;
  const font = (FONTS[s.fontFamily] || FONTS.sans).pdf;
  const fs = Number(s.fontSize);
  const lh = Number(s.lineHeight);
  const W = page.w - 2 * m;
  const accent = hexToRgb(s.accent);
  const p = resume.personal;

  const doc = new jsPDF({ unit: 'pt', format: [page.w, page.h], compress: true });
  doc.setProperties({
    title: `${p.fullName || 'Resume'} - Resume`,
    subject: 'Resume',
    author: p.fullName || '',
  });

  let y = m;
  const setF = (size, style = 'normal', color = INK) => {
    doc.setFont(font, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };
  const ensure = (h) => {
    if (y + h > page.h - m + 0.5) { doc.addPage([page.w, page.h]); y = m; }
  };
  const baseline = (size, step) => y + (step - size) / 2 + size * 0.8;
  const xFor = (align) => (align === 'center' ? m + W / 2 : align === 'right' ? m + W : m);

  function para(str, { size = fs, style = 'normal', color = INK, align = 'left' } = {}) {
    const text = clean(str);
    if (!text) return;
    setF(size, style, color);
    const step = size * lh;
    doc.splitTextToSize(text, W).forEach((line) => {
      ensure(step);
      doc.text(line, xFor(align), baseline(size, step), { align });
      y += step;
    });
  }

  function heading(title) {
    y += fs * 0.9;
    const size = fs * SCALE.section;
    const step = size * 1.2;
    const style = s.headingStyle;
    const padV = style === 'band' ? fs * 0.2 : 0;
    const padH = fs * 0.5;
    ensure(step + 2 * padV + fs * 3);

    if (style === 'band') { doc.setFillColor(...tint(accent)); doc.rect(m, y, W, step + 2 * padV, 'F'); }
    if (style === 'bar') { doc.setFillColor(...accent); doc.rect(m, y, 3, step, 'F'); }

    const left = m + (style === 'band' ? padH : style === 'bar' ? 3 + padH : 0);
    const right = m + W - (style === 'band' ? padH : 0);
    const x = s.headingAlign === 'center' ? (left + right) / 2 : left;
    setF(size, 'bold', accent);
    doc.text(title.toUpperCase(), x, y + padV + (step - size) / 2 + size * 0.8, { align: s.headingAlign });
    y += step + 2 * padV;

    if (style === 'rule') {
      doc.setDrawColor(...accent);
      doc.setLineWidth(1);
      doc.line(m, y + 0.5, m + W, y + 0.5);
      y += 1;
    }
    y += fs * 0.5;
  }

  function entryRow(title, sub, date) {
    const step = fs * lh;
    ensure(step * 2);
    let dW = 0;
    if (date) { setF(fs * SCALE.small, 'normal', GREY); dW = doc.getTextWidth(clean(date)); }

    setF(fs, 'bold');
    const titleLines = doc.splitTextToSize(clean(title), W - dW - 10);
    const tW = doc.getTextWidth(titleLines[0]);
    const base = baseline(fs, step);
    doc.text(titleLines[0], m, base);

    let subOnOwnLine = Boolean(sub);
    if (sub && titleLines.length === 1) {
      setF(fs, 'italic', GREY);
      const t = ` - ${clean(sub)}`;
      if (tW + doc.getTextWidth(t) + dW + 8 <= W) { doc.text(t, m + tW, base); subOnOwnLine = false; }
    }
    if (date) {
      setF(fs * SCALE.small, 'normal', GREY);
      doc.text(clean(date), m + W, base, { align: 'right' });
    }
    y += step;

    titleLines.slice(1).forEach((l) => {
      ensure(step); setF(fs, 'bold'); doc.text(l, m, baseline(fs, step)); y += step;
    });
    if (subOnOwnLine) para(sub, { style: 'italic', color: GREY });
  }

  function bullets(text) {
    const step = fs * lh;
    parseBullets(text).forEach((line) => {
      setF(fs);
      doc.splitTextToSize(clean(line), W - 14).forEach((seg, i) => {
        ensure(step);
        const b = baseline(fs, step);
        if (i === 0) doc.text('\u2022', m + 3, b);
        doc.text(seg, m + 14, b);
        y += step;
      });
      y += fs * 0.12;
    });
  }

  // ---- Header ----
  const nameText = p.fullName || 'Your Name';
  para(s.nameUpper ? nameText.toUpperCase() : nameText, { size: fs * SCALE.name, style: 'bold', color: accent, align: s.headerAlign });
  if (p.jobTitle) para(p.jobTitle, { size: fs * SCALE.title, color: [60, 72, 66], align: s.headerAlign });
  const contact = [p.email, p.phone, p.location, p.linkedin].filter(Boolean).join('  |  ');
  if (contact) para(contact, { size: fs * SCALE.contact, color: GREY, align: s.headerAlign });
  if (s.headerRule) {
    y += fs * 0.5;
    doc.setDrawColor(...accent);
    doc.setLineWidth(1);
    doc.line(m, y + 0.5, m + W, y + 0.5);
    y += 1;
  }

  // ---- Sections (same order as the preview) ----
  const exps = resume.experience.filter((e) => e.jobTitle || e.company || e.bullets);
  const edus = resume.education.filter((e) => e.degree || e.school);
  const certs = resume.certifications.filter((c) => c.certName);
  const projs = resume.projects.filter((x) => x.projectName);

  const sections = {
    summary: () => { if (resume.summary) { heading('Professional Summary'); para(resume.summary); } },
    experience: () => {
      if (!exps.length) return;
      heading('Work Experience');
      exps.forEach((e) => {
        const date = [e.startDate, e.current ? 'Present' : e.endDate].filter(Boolean).join(' - ');
        entryRow(e.jobTitle || 'Job title', e.company, date);
        bullets(e.bullets);
        y += fs * 0.55;
      });
    },
    education: () => {
      if (!edus.length) return;
      heading('Education');
      edus.forEach((e) => {
        entryRow(e.degree || 'Degree', e.school, e.eduYear);
        if (e.eduExtra) para(e.eduExtra, { size: fs * SCALE.small, color: GREY });
        y += fs * 0.55;
      });
    },
    skills: () => { if (resume.skills.length) { heading('Skills'); para(resume.skills.join(', ')); } },
    certifications: () => {
      if (!certs.length) return;
      heading('Certifications');
      certs.forEach((c) => { entryRow(c.certName, c.certIssuer, c.certYear); y += fs * 0.55; });
    },
    projects: () => {
      if (!projs.length) return;
      heading('Projects');
      projs.forEach((x) => {
        entryRow(x.projectName, '', x.projectYear);
        if (x.projectDesc) para(x.projectDesc, { size: fs * SCALE.small, color: GREY });
        y += fs * 0.55;
      });
    },
  };
  (SECTION_ORDERS[s.sectionOrder] || SECTION_ORDERS.standard).forEach((k) => sections[k]());

  return doc;
}

export async function downloadResumePdf(resume) {
  const doc = await buildResumePdf(resume);
  doc.save(resumeFileName(resume));
}

export async function downloadTextPdf(text, fileName = 'cover-letter.pdf') {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  const m = 72;
  const W = doc.internal.pageSize.getWidth() - 2 * m;
  const H = doc.internal.pageSize.getHeight();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(27, 36, 32);
  let y = m;
  clean(text).split('\n').forEach((para) => {
    const lines = para.trim() ? doc.splitTextToSize(para, W) : [''];
    lines.forEach((l) => {
      if (y + 16 > H - m) { doc.addPage(); y = m; }
      doc.text(l, m, y + 11);
      y += 16;
    });
  });
  doc.save(fileName);
}
