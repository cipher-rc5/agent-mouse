// plugins/plugin-firecrawl/src/templates.ts

export const getSearchDataContext = `
{{recentMessages}}

analyze the conversation history to extract search parameters:
1. Look for explicit search terms or keywords in the most recent message
2. Consider context from previous messages to refine the search
3. Identify any filters or constraints mentioned (date ranges, categories, etc.)
4. Note any sort preferences or result limitations

format the extracted information into a structured search query.
only respond with the search parameters in the specified JSON format, no additional text.

`;

export const getSearchDataPrompt = `
You are to parse data given by Firecrawl and you have to give a meaningful response
Every search response must be human readable and make sense to the user
`;
