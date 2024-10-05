// Import the JSON file containing metadata in different languages
import metadataLanguage from '@/data/metadataLanguage.json';
// Import the necessary interfaces for metadata typing
import { Metadata, PageMetadata } from '@/interface/Data/metadataType';

// Ensure that metadataLanguage is of type Metadata for better type safety
const metadata = metadataLanguage as Metadata; 

// Function to get metadata based on the language and path
export const getMetadata = (lang: boolean, path: string): PageMetadata => {
    // Determine the language key based on the boolean value of lang
    const languageKey = lang ? "Spanish" : "English";
    
    // Access the metadata specific to the path using the language key
    const page = metadata[languageKey][path]; 

    // Throw an error if no metadata is found for the specified path
    if (!page) {
        throw new Error(`No metadata found for path: ${path}`);
    }

    // Return an object with the title and description of the page
    return {
        title: page.title,
        description: page.description,
    };
};
