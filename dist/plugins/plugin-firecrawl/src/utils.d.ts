interface ParsedUrl {
    url: string | null;
    originalText: string;
}
export declare function extractUrl(text: string): ParsedUrl;
export {};
