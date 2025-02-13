import { type Plugin } from '@elizaos/core';
export declare function saveBase64Image(base64Data: string, filename: string): string;
export declare function saveHeuristImage(imageUrl: string, filename: string): Promise<string>;
export declare const imageGenerationPlugin: Plugin;
export default imageGenerationPlugin;
