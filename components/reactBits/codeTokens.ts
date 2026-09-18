export interface CodeToken {
  text: string;
  start: number;
  className: string;
}

// Lightweight highlighting for the object-literal snippets shown by TextType.
// Tokenize the complete source so unfinished strings keep their color while typing.
export function tokenizeTypeScript(source: string): CodeToken[] {
  const pattern =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`)|(\b(?:const|let|var|export|default|return|function|async|await|new|type|interface|as|satisfies)\b)|(\b(?:true|false|null|undefined|\d+(?:\.\d+)?)\b)|([A-Za-z_$][\w$]*(?=\s*:))|([A-Za-z_$][\w$]*)|([{}\[\](),;:.=])|(\s+|[\s\S])/g;

  const colors = [
    "text-slate-400 italic", // comments
    "text-emerald-700", // strings
    "text-violet-600", // keywords
    "text-amber-700", // literals
    "text-sky-700", // object properties
    "text-slate-800", // identifiers
    "text-slate-400", // punctuation
    "text-slate-600", // whitespace and remaining characters
  ];

  return Array.from(source.matchAll(pattern), (match) => {
    const kind = match.slice(1).findIndex((group) => group !== undefined);
    return {
      text: match[0],
      start: match.index,
      className: colors[kind],
    };
  });
}
