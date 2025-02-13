export declare const debugLog: {
    request: (method: string, url: string, data?: any) => void;
    response: (response: any) => void;
    error: (error: any) => void;
    validation: (config: any) => void;
};
