import { type Action, type Content } from '@elizaos/core';
export declare const TOKEN_SALES_QUERY = "\nquery TokenSales($collectionAddr: String!, $limit: Int) {\n    tokenSales(\n        filterByCollectionAddrs: [$collectionAddr]\n        limit: $limit\n        sortBy: USD_PRICE_DESC\n    ) {\n        tokenSales {\n            id\n            token {\n                tokenId\n                name\n                media {\n                    url\n                }\n            }\n            price\n            priceUsd\n            date\n            saleDenomSymbol\n            saleType\n            buyer {\n                address\n            }\n            seller {\n                address\n            }\n        }\n    }\n}";
export interface GetTokenSalesContent extends Content {
    collectionAddr: string;
    limit: number;
}
declare const _default: Action;
export default _default;
