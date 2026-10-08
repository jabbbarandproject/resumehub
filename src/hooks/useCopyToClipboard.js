import useToast from './useToast';

export default function useCopyToClipboard() {
  const toast = useToast();
  return async (text, successMessage = 'Copied to clipboard') => {
    try {
      await navigator.clipboard.writeText(text);
      toast(successMessage);
    } catch {
      toast('Could not copy. Please select and copy manually.');
    }
  };
}
