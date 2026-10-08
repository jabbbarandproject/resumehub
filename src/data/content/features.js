import {
  BsSpeedometer2, BsKey, BsChatQuote, BsLayoutTextWindowReverse, BsEnvelopePaper,
  BsCloudCheck, BsDownload, BsPalette, BsCollection,
} from 'react-icons/bs';

export const FEATURE_DETAILS = [
  { icon: BsSpeedometer2, title: 'Live ATS score', text: 'Eight checks run as you type. Each one passes or fails and explains exactly how to fix it.', points: ['Contact details, numbers in bullets, action verbs', 'Length, standard sections, experience and skills', 'Tips appear only for the checks that fail'] },
  { icon: BsKey, title: 'Job description keyword match', text: 'Paste any job post and see which important terms your resume already covers and which are missing.', points: ['Frequency-based keyword extraction', 'Found and missing terms shown side by side', 'Works on your builder resume or any pasted text'] },
  { icon: BsLayoutTextWindowReverse, title: 'Ten ATS-safe templates', text: 'Every template is a single column of real text with standard fonts. No tables, images or icons.', points: ['Classic, Modern, Minimal, Executive, Compact', 'Banner, Elegant, Tech, Corporate, Academic', 'Change any template into your own style'] },
  { icon: BsPalette, title: 'Full design control', text: 'Change color, font, size, line spacing, margins, alignment and heading style without leaving ATS-safe territory.', points: ['Accent color and custom color picker', 'Header and heading alignment', 'A4 or Letter page size'] },
  { icon: BsDownload, title: 'Real-text PDF download', text: 'Download a PDF generated in your browser. The text is selectable, so ATS software reads it correctly.', points: ['No browser header, footer or date added', 'Preview matches the PDF', 'Page breaks shown in the preview'] },
  { icon: BsCollection, title: 'My Resumes library', text: 'Every resume you save or download stays on your device so you can edit and download it again.', points: ['Edit, duplicate or delete saved resumes', 'Tailor a copy for each job', 'Export and import a backup file'] },
  { icon: BsChatQuote, title: 'Action verb library', text: 'More than 60 strong verbs grouped by skill area. Click one to copy it into a bullet.', points: ['Leadership, technical, analysis and more', 'Search by keyword', 'One-click copy'] },
  { icon: BsEnvelopePaper, title: 'Cover letter builder', text: 'Write a tailored cover letter in a few fields and download it as PDF or text.', points: ['Formal, friendly or confident tone', 'Editable draft', 'Standalone tool, no resume needed'] },
  { icon: BsCloudCheck, title: 'Private by design', text: 'Your resume is created and stored in your own browser. Nothing is uploaded and there is no account.', points: ['Autosave while you type', 'No sign-up', 'Optional analytics and ads only with your consent'] },
];

export const HOW_STEPS = [
  { title: 'Fill in your details', text: 'Start with personal info and a short summary, then add work experience, education and skills. The form is split into steps so you never face one long page. Write one achievement per line and start each with an action verb.' },
  { title: 'Choose a template and style it', text: 'Pick one of ten ATS-safe templates, then adjust color, font, spacing and alignment. The live preview is page-accurate, so what you see is what you download.' },
  { title: 'Check your ATS score', text: 'Open the ATS check tab. Fix any failed check using the tip beneath it. Paste a job description to see which keywords you are missing and add them where they are true.' },
  { title: 'Download your PDF', text: 'Click Download PDF. The file contains real text and no browser header or footer. The resume is also saved to My Resumes on your device.' },
  { title: 'Edit and tailor later', text: 'Open My Resumes any time to edit, duplicate or download again. Duplicate your resume for each application and adjust the keywords for each job.' },
];
