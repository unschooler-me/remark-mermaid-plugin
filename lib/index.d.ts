import type { Plugin } from "unified";
import type mermaidAPI from "mermaid/mermaidAPI";
export interface RemarkMermaidOptions {
    theme?: mermaidAPI.Theme;
}
declare const remarkMermaid: Plugin<[RemarkMermaidOptions?], any>;
export default remarkMermaid;
