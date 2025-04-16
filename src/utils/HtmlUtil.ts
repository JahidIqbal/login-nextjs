import { JSDOM } from "jsdom";
const window = new JSDOM("").window;
import DOMPurify from "dompurify";
const DOMPurifyServer = DOMPurify(window);

export function purifyHtml(html: string) {
  return {
    __html: DOMPurifyServer.sanitize(html),
  };
}
