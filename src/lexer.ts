type Token = {
  type: 'SET_COLOR' | 'PEN_DOWN' | 'MOVE_FORWARD' | 'TURN_RIGHT' | 'DRAW_PARALLEL' | 'UNKNOWN';
  value?: string;
};

function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  
  const rules = [
    { type: 'SET_COLOR',    regex: /^SET_COLOR\s+([A-Z]+)/ },
    { type: 'PEN_DOWN',     regex: /^PEN_DOWN/ },
    { type: 'MOVE_FORWARD', regex: /^MOVE_FORWARD\s+([0-9]+)/ },
    { type: 'TURN_RIGHT',   regex: /^TURN_RIGHT\s+([0-9]+)/ },
    { type: 'DRAW_PARALLEL', regex: /^DRAW_PARALLEL\s+([0-9]+)/ },
    { type: 'WHITESPACE',   regex: /^\s+/ },
  ];

  let cursor = 0;

  while (cursor < input.length) {
    const remainingInput = input.slice(cursor);
    let matched = false;

    for (const { type, regex } of rules) {
      const match = remainingInput.match(regex);

      if (match) {
        if (type !== 'WHITESPACE') {
          const value = match[0];
          console.log(`TOKEN: ${type}${match[1] ? `, VALUE: ${value}` : ''}`);
          
          tokens.push({ type: type as Token['type'], value });
        }
        cursor += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const unknownChar = input[cursor];
      console.log(`UNKNOWN: ${unknownChar}`);
      tokens.push({ type: 'UNKNOWN', value: unknownChar });
      cursor++;
    }
  }

  return tokens;
}

const code = `
  SET_COLOR RED
  PEN_DOWN
  MOVE_FORWARD 100
  TURN_RIGHT 90
  INVALID_CMD
`;

lexer(code);
