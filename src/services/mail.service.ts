import { RequestWithToast } from "@/interceptor";
import { DataLanguageType, FormDataMail } from "@/interface/Language";
/**
 * Function to send an email via POST request.
 * 
 * @param {FormDataMail} data - The data to be sent in the email, adhering to the FormDataMail interface.
 * @param {DataLanguageType} language - The language type to be used, adhering to the DataLanguageType interface.
 * @returns {Promise} - Returns a promise from the RequestWithToast function, 
 * which handles the POST request and displays a toast notification based on the response.
 */
export const spostMail = (data: FormDataMail, language: DataLanguageType) => {
  return RequestWithToast({
    method: "post",       // Specifies that the request method is POST
    url: "send",         // The URL endpoint for sending the email
    data: data,
    language           // The email data to be sent
  });          // Passes the language type to the RequestWithToast function
};
