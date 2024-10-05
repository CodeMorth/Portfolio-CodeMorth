export interface Metadata {
    Spanish: Record<string, PageMetadata>;
    English: Record<string, PageMetadata>;
}

export interface PageMetadata {
    title: string;
    description: string;
}
