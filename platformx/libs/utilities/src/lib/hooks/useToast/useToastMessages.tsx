// write a custom hook to use the toast messages
const useToastMessages = () => {
  return {
    success: () => console.log('success'),
    error: () => console.log('error'),
    warn: () => console.log('warn'),
    info: () => console.log('info'),
    default: () => console.log('default'),
  };
};
