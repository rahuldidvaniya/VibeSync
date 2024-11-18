import { showToast } from '../utils/toast';

export const getRecommendations = async (params) => {
  const toastId = showToast.loading('Getting recommendations...');
  try {
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    
    if (!response.ok) throw new Error('Failed to get recommendations');
    
    const data = await response.json();
    toast.dismiss(toastId);
    showToast.success('Found perfect tracks for you!');
    return data;
  } catch (error) {
    toast.dismiss(toastId);
    showToast.error('Failed to get recommendations');
    throw error;
  }
}; 