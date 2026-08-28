type TsxTokenKind =
  | "attribute"
  | "comment"
  | "keyword"
  | "number"
  | "operator"
  | "punctuation"
  | "string"
  | "tag"
  | "type";

export interface TsxToken {
  content: string;
  kind?: TsxTokenKind;
}

const KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "return",
  "satisfies",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

const OPERATORS = [
  "===",
  "!==",
  ">>>",
  "**=",
  "=>",
  "==",
  "!=",
  "<=",
  ">=",
  "&&",
  "||",
  "??",
  "?.",
  "++",
  "--",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "**",
  "<<",
  ">>",
  "=",
  "+",
  "-",
  "*",
  "/",
  "%",
  "!",
  "?",
  ":",
  "&",
  "|",
  "^",
  "~",
] as const;

const isIdentifierStart = (character: string): boolean =>
  /[A-Za-z_$]/.test(character);

const isIdentifierPart = (character: string): boolean =>
  /[A-Za-z0-9_$]/.test(character);

const readQuotedValue = (
  source: string,
  start: number,
  quote: string,
): number => {
  let cursor = start + 1;
  while (cursor < source.length) {
    if (source[cursor] === "\\") {
      cursor += 2;
      continue;
    }
    if (source[cursor] === quote) return cursor + 1;
    cursor += 1;
  }
  return source.length;
};

const appendToken = (
  tokens: TsxToken[],
  content: string,
  kind?: TsxTokenKind,
): void => {
  if (content.length === 0) return;
  const previous = tokens.at(-1);
  if (previous && previous.kind === kind) {
    previous.content += content;
    return;
  }
  tokens.push({ content, kind });
};

/**
 * A small deterministic TSX lexer for the generated source panel. Keeping the
 * source as text nodes means React performs all escaping for us.
 */
export const tokenizeTsx = (source: string): readonly TsxToken[] => {
  const tokens: TsxToken[] = [];
  let cursor = 0;
  let insideJsxTag = false;

  while (cursor < source.length) {
    const rest = source.slice(cursor);

    if (rest.startsWith("//")) {
      const newlineIndex = source.indexOf("\n", cursor + 2);
      const end = newlineIndex === -1 ? source.length : newlineIndex;
      appendToken(tokens, source.slice(cursor, end), "comment");
      cursor = end;
      continue;
    }

    if (rest.startsWith("/*")) {
      const closingIndex = source.indexOf("*/", cursor + 2);
      const end = closingIndex === -1 ? source.length : closingIndex + 2;
      appendToken(tokens, source.slice(cursor, end), "comment");
      cursor = end;
      continue;
    }

    const character = source[cursor] ?? "";
    if (character === '"' || character === "'" || character === "`") {
      const end = readQuotedValue(source, cursor, character);
      appendToken(tokens, source.slice(cursor, end), "string");
      cursor = end;
      continue;
    }

    const jsxTagMatch = rest.match(/^<(\/)?([A-Za-z][A-Za-z0-9:._$-]*)/);
    if (jsxTagMatch) {
      const prefix = jsxTagMatch[1] ? "</" : "<";
      const tagName = jsxTagMatch[2] ?? "";
      appendToken(tokens, prefix, "punctuation");
      appendToken(tokens, tagName, "tag");
      cursor += prefix.length + tagName.length;
      insideJsxTag = true;
      continue;
    }

    if (insideJsxTag && rest.startsWith("/>")) {
      appendToken(tokens, "/>", "punctuation");
      cursor += 2;
      insideJsxTag = false;
      continue;
    }

    if (insideJsxTag && character === ">") {
      appendToken(tokens, character, "punctuation");
      cursor += 1;
      insideJsxTag = false;
      continue;
    }

    const numberMatch = rest.match(
      /^(?:0[xob][\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/i,
    );
    if (numberMatch) {
      const value = numberMatch[0];
      appendToken(tokens, value, "number");
      cursor += value.length;
      continue;
    }

    if (isIdentifierStart(character)) {
      let end = cursor + 1;
      while (end < source.length && isIdentifierPart(source[end] ?? "")) {
        end += 1;
      }
      const identifier = source.slice(cursor, end);
      const kind = insideJsxTag
        ? "attribute"
        : KEYWORDS.has(identifier)
          ? "keyword"
          : /^[A-Z]/.test(identifier)
            ? "type"
            : undefined;
      appendToken(tokens, identifier, kind);
      cursor = end;
      continue;
    }

    const operator = OPERATORS.find((candidate) => rest.startsWith(candidate));
    if (operator) {
      appendToken(tokens, operator, "operator");
      cursor += operator.length;
      continue;
    }

    if ("{}[](),;.".includes(character)) {
      appendToken(tokens, character, "punctuation");
      cursor += 1;
      continue;
    }

    appendToken(tokens, character);
    cursor += 1;
  }

  return tokens;
};

interface TsxCodeProps {
  source: string;
}

export function TsxCode({ source }: TsxCodeProps) {
  const tokens = tokenizeTsx(source);
  let tokenOffset = 0;
  const renderedTokens = tokens.map((token) => {
    const key = `${tokenOffset}-${token.kind ?? "plain"}`;
    tokenOffset += token.content.length;
    return token.kind ? (
      <span className={`syntax-token syntax-${token.kind}`} key={key}>
        {token.content}
      </span>
    ) : (
      token.content
    );
  });

  return (
    // biome-ignore lint/a11y/useSemanticElements: A textarea cannot preserve token-level syntax markup.
    <div
      aria-label="Generated TSX source code"
      aria-multiline="true"
      aria-readonly="true"
      className="code-view"
      role="textbox"
      tabIndex={0}
    >
      <pre>
        <code>{renderedTokens}</code>
      </pre>
    </div>
  );
}
