import { type Action, type Content } from '@elizaos/core';
export interface GetLatestNFTContent extends Content {
    collectionAddr: string;
    limit: number;
}
declare const _default: Action;
export default _default;
