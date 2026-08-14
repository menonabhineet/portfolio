/**
 * High-performance, zero-dependency fuzzy matching & ranking utility.
 * Supports:
 * - Multi-word query tokenization ("legal rag python")
 * - Substring and prefix matching
 * - Acronym & Initialism matching ("ppl" -> "Pro Pundits League")
 * - Subsequence fuzzy matching ("snwflk" -> "Snowflake")
 * - Typo tolerance via Levenshtein distance ("pythn" -> "Python", "dockr" -> "Docker")
 * - Weighted multi-field scoring and relevance sorting
 */

/**
 * Calculates Levenshtein distance between two strings with early exit for performance.
 */
export function levenshteinDistance(a: string, b: string, maxLimit = 3): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > maxLimit) return maxLimit + 1;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const v0 = new Array(b.length + 1);
  const v1 = new Array(b.length + 1);

  for (let i = 0; i <= b.length; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1;
    let minInRow = v1[0];

    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      if (v1[j + 1] < minInRow) {
        minInRow = v1[j + 1];
      }
    }

    if (minInRow > maxLimit) return maxLimit + 1;

    for (let j = 0; j <= b.length; j++) {
      v0[j] = v1[j];
    }
  }

  return v0[b.length];
}

/**
 * Checks if query is an acronym/initialism of target text (e.g. "ppl" -> "Pro Pundits League").
 */
function checkAcronym(query: string, targetWords: string[]): boolean {
  if (query.length < 2 || query.length > targetWords.length) return false;
  let acronym = "";
  for (const word of targetWords) {
    if (word.length > 0) {
      acronym += word[0];
    }
  }
  return acronym.toLowerCase().includes(query.toLowerCase());
}

/**
 * Checks if all characters of query appear sequentially in target.
 */
function subsequenceMatch(query: string, target: string): { match: boolean; score: number } {
  let qIdx = 0;
  let tIdx = 0;
  let gapScore = 0;
  let lastMatch = -1;

  while (qIdx < query.length && tIdx < target.length) {
    if (query[qIdx] === target[tIdx]) {
      if (lastMatch !== -1) {
        gapScore += (tIdx - lastMatch - 1);
      }
      lastMatch = tIdx;
      qIdx++;
    }
    tIdx++;
  }

  const match = qIdx === query.length;
  if (!match) return { match: false, score: 0 };

  const score = Math.max(10, 250 - gapScore * 5);
  return { match: true, score };
}

/**
 * Fuzzy score for a single term against a target string.
 */
function scoreTermAgainstString(term: string, target: string): number {
  if (!term || !target) return 0;
  const t = target.toLowerCase();
  const q = term.toLowerCase();

  // 1. Exact match
  if (t === q) return 1000;

  // 2. Starts with query
  if (t.startsWith(q)) return 700 + Math.min(200, (q.length / t.length) * 200);

  // 3. Substring match
  const subIdx = t.indexOf(q);
  if (subIdx !== -1) {
    return 500 - Math.min(100, subIdx * 5);
  }

  // 4. Word-level check
  const words = t.split(/[\s\-_,./\\()]+/);
  for (const w of words) {
    if (w === q) return 850;
    if (w.startsWith(q)) return 650;
    if (w.includes(q)) return 450;
  }

  // 5. Acronym match
  if (checkAcronym(q, words)) {
    return 600;
  }

  // 6. Typo / Levenshtein distance check on words
  if (q.length >= 3) {
    const maxAllowedDistance = q.length <= 4 ? 1 : 2;
    for (const w of words) {
      if (Math.abs(w.length - q.length) <= maxAllowedDistance) {
        const dist = levenshteinDistance(q, w, maxAllowedDistance);
        if (dist <= maxAllowedDistance) {
          return 350 - dist * 80;
        }
      }
    }
  }

  // 7. Subsequence match (only for terms with 3+ chars)
  if (q.length >= 3) {
    const subResult = subsequenceMatch(q, t);
    if (subResult.match) {
      return subResult.score;
    }
  }

  return 0;
}

export interface WeightedField {
  text: string | string[];
  weight: number;
}

/**
 * Matches a multi-term search query against multiple weighted fields of an item.
 * Returns { isMatch: boolean, score: number }
 */
export function fuzzyMatchItem(query: string, fields: WeightedField[]): { isMatch: boolean; score: number } {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { isMatch: true, score: 100 };

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
  if (queryTerms.length === 0) return { isMatch: true, score: 100 };

  let totalScore = 0;

  // Flatten text entries with weights
  const flattened: { str: string; weight: number }[] = [];
  for (const field of fields) {
    if (Array.isArray(field.text)) {
      for (const item of field.text) {
        if (item) flattened.push({ str: String(item), weight: field.weight });
      }
    } else if (field.text) {
      flattened.push({ str: String(field.text), weight: field.weight });
    }
  }

  // Every query term must match at least one field (AND logic for multi-term queries)
  for (const term of queryTerms) {
    let bestTermScore = 0;

    for (const { str, weight } of flattened) {
      const termScore = scoreTermAgainstString(term, str);
      const weightedScore = termScore * weight;
      if (weightedScore > bestTermScore) {
        bestTermScore = weightedScore;
      }
    }

    // If a term didn't match anywhere, this item is not a match
    if (bestTermScore === 0) {
      return { isMatch: false, score: 0 };
    }

    totalScore += bestTermScore;
  }

  return { isMatch: true, score: totalScore };
}
