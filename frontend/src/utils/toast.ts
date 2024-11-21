import toast, { ToastOptions, Toast } from 'react-hot-toast';

interface ToastIconTheme {
  primary: string;
  secondary: string;
}

interface ToastStyle {
  background: string;
  backdropFilter?: string;
  color?: string;
  border: string;
  boxShadow: string;
}

interface ToastVariant {
  iconTheme: ToastIconTheme;
  style: ToastStyle;
}

interface ToastConfig extends ToastOptions {
  style: ToastStyle;
  success?: ToastVariant;
  error?: ToastVariant;
  duration: number;
}

interface LastToast {
  time: number;
  message: string;
  type: string;
}

const toastConfig: ToastConfig = {
  style: {
    background: 'rgba(24, 24, 24, 0.95)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  success: {
    iconTheme: {
      primary: '#1DB954',
      secondary: '#fff',
    },
    style: {
      background: 'rgba(29, 185, 84, 0.05)',
      border: '1px solid rgba(29, 185, 84, 0.1)',
      boxShadow: '0 8px 32px rgba(29, 185, 84, 0.1)',
    },
  },
  error: {
    iconTheme: {
      primary: '#FF5757',
      secondary: '#fff',
    },
    style: {
      background: 'rgba(255, 87, 87, 0.05)',
      border: '1px solid rgba(255, 87, 87, 0.1)',
      boxShadow: '0 8px 32px rgba(255, 87, 87, 0.1)',
    },
  },
  duration: 2000,
};

// Keep track of the last toast time and type
let lastToast: LastToast = {
  time: 0,
  message: '',
  type: '',
};

const TOAST_COOLDOWN = 2000; // 2 seconds cooldown

interface ToastManager {
  success: (message: string) => Toast | string | undefined;
  error: (message: string) => Toast | string | undefined;
  loading: (message: string) => Toast | string;
  dismiss: (toastId?: string) => void;
}

export const showToast: ToastManager = {
  success: (message: string): Toast | string | undefined => {
    const now = Date.now();
    // Prevent duplicate toasts within cooldown period
    if (
      now - lastToast.time < TOAST_COOLDOWN && 
      lastToast.message === message &&
      lastToast.type === 'success'
    ) {
      return;
    }
    toast.dismiss(); // Dismiss all existing toasts
    lastToast = { time: now, message, type: 'success' };
    return toast.success(message, toastConfig);
  },
  
  error: (message: string): Toast | string | undefined => {
    const now = Date.now();
    if (
      now - lastToast.time < TOAST_COOLDOWN && 
      lastToast.message === message &&
      lastToast.type === 'error'
    ) {
      return;
    }
    toast.dismiss();
    lastToast = { time: now, message, type: 'error' };
    return toast.error(message, toastConfig);
  },
  
  loading: (message: string): Toast | string => {
    toast.dismiss(); // Dismiss existing toasts before showing loading
    return toast.loading(message, {
      ...toastConfig,
      duration: Infinity, // Loading toasts should stay until dismissed
    });
  },
  
  dismiss: (toastId?: string): void => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },
}; 