'use client';

// Import the useLanguage hook to access language data
import { useLanguage } from '@/Hooks';

export const LoadingComponent = () => {
  // Retrieve the language data from the useLanguage hook
  const { languageData } = useLanguage();

  return (
    <div className={`LoadingComponent${languageData?.customLoading}`}>{/*Modify the class name, so that it takes different values, depending on the language*/}
      <div className="custom-loader" />
      {/* Another div that uses the custom loading class from languageData */}
      <div className={languageData?.customLoading} />
    </div>
  );
};
