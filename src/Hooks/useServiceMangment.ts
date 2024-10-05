import { FormDataMail } from '@/interface/Language';
import { useLanguage } from './useLanguage';
import { spostMail } from '@/services/mail.service';
/**
 * Custom hook to manage service operations related to email functionality.
 * 
 * @returns {Object} - An object containing the hPostMail function for posting email data.
 */
export const useServiceMangment = () => {
  // Retrieve the current language data using the useLanguage hook
  const { languageData } = useLanguage();

  /**
   * Function to handle posting email data.
   * 
   * @param {FormDataMail} data - The data for the email, conforming to the FormDataMail interface.
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if the email was posted successfully, 
   * or false if an error occurred.
   */
  const hPostMail = async (data: FormDataMail): Promise<boolean> => {
    return spostMail(data, languageData) // Call spostMail with the email data and current language
      .then(() => true)                  // Resolves to true if the request is successful
      .catch(() => false);               // Resolves to false if there is an error
  };

  // Return the hPostMail function for use in components
  return { hPostMail };
};
