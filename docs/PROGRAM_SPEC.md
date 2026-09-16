# Dev Cardio Program Specification

The technical specification for an adaptive React + TypeScript + Vitest practice system that rebuilds programming fundamentals in an AI-heavy workflow.

This document defines the curriculum, progression model, exercise schema, testing rules, and instruction contract for any AI agent that generates or reviews exercises. The learner-facing introduction and daily usage guide are in [`README.md`](../README.md). The repository-backed architecture is in [`SYSTEM_DESIGN.md`](SYSTEM_DESIGN.md).

The system begins with small, explicit operations and repeatedly reuses them inside larger, production-shaped problems. Tests are the main evaluator. AI may create requirements, fixtures, tests, and feedback, but it must not write or reveal the learner's implementation before the exercise is completed.

---

## 1. Goal

Build fast, reliable programming judgment, not merely familiarity with solutions.

After completing the program, the learner should be able to:

- translate requirements into data transformations;
- select appropriate arrays, objects, maps, and sets;
- reason about mutation, references, state, and pure functions;
- handle asynchronous work, failures, cancellation, and race conditions;
- implement and test React components and hooks;
- recognize familiar fundamentals inside production-shaped code;
- explain correctness, edge cases, complexity, and tradeoffs;
- use AI as a reviewer and tutor without surrendering the implementation.

This is not LeetCode preparation and is not a race through disconnected puzzles. Each concept returns several times in increasingly realistic combinations.

## 2. Default Program

- **Duration:** 5 days
- **Exercises:** exactly 50
- **Daily target:** 10 exercises
- **Session size:** batches of 2–5 exercises
- **Primary stack:** React, TypeScript, Vitest, Testing Library
- **Evaluator:** automated tests plus a short learner explanation
- **Adaptation signal:** correctness, attempts, elapsed active time, hints, regressions, explanation quality, and git commit history

The five-day and 50-exercise structure is fixed. Adaptation changes which concepts return, how they combine, and which difficulty dimension increases. It does not change the total number of exercises.

## 3. Non-Negotiable Learning Rules

1. **Fundamentals first.** Do not introduce React complexity before the underlying TypeScript operation has appeared in isolation.
2. **Reuse before novelty.** At least 60% of each new batch must reuse earlier concepts in a new combination or context.
3. **One main difficulty increase at a time.** Increase data complexity, ambiguity, scale, state, async behavior, or testing difficulty, but not all simultaneously.
4. **Tests define observable behavior.** They must not require one exact internal implementation unless that implementation is the lesson.
5. **Passing is not enough.** The learner must briefly explain the solution before an exercise is marked complete.
6. **No premature solutions.** AI must not provide implementation code, pseudocode that maps line-for-line to the answer, or a completed diff before completion.
7. **No artificial speed pressure.** Faster work raises difficulty only when accuracy, retention, and explanations remain strong.
8. **Production realism arrives gradually.** Messy records, optional fields, UI state, API failures, and stale requests come after the relevant primitive is understood.

## 4. Repository Structure

```text
dev-cardio/
├── README.md                      # Personal learner guide
├── docs/
│   ├── PROGRAM_SPEC.md            # Curriculum and AI tutor specification
│   └── SYSTEM_DESIGN.md           # Architecture and GitHub persistence design
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.setup.ts
├── src/
│   ├── exercises/
│   │   ├── day-01/
│   │   │   ├── 001-find-max.ts
│   │   │   └── 002-sort-numbers.ts
│   │   └── day-05/
│   ├── components/               # React exercise implementations
│   ├── hooks/                    # Hook exercises
│   └── shared/                   # Shared types and approved helpers
├── tests/
│   ├── public/                   # Visible tests: normal behavior and examples
│   ├── boss/                     # Visible only when a boss exercise unlocks
│   └── hidden/                   # Optional evaluator-owned tests, not committed
├── exercises/
│   ├── manifest.json             # Machine-readable exercise definitions
│   ├── current-batch.md          # Current requirements, no solutions
│   └── completed/                # Archived batch requirements and reflections
├── progress/
│   ├── learner-state.json        # Mastery, attempts, timings, hints, regressions
│   ├── concepts.json             # Concept graph and mastery estimates
│   └── reflections.md            # Learner explanations and review notes
└── scripts/
    ├── verify-batch.ts           # Runs relevant tests and records results
    ├── summarize-history.ts      # Produces safe commit metrics
    └── generate-next-batch.ts    # Invokes the generation contract below
```

Suggested commands:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:current": "vitest run --project current",
    "cardio:verify": "tsx scripts/verify-batch.ts",
    "cardio:history": "tsx scripts/summarize-history.ts",
    "cardio:next": "tsx scripts/generate-next-batch.ts"
  }
}
```

## 5. Five-Day Progression

| Day | Primary focus | Typical shape |
|---|---|---|
| 1 | Loops, conditions, indexing, accumulation, simple array operations | One function, clean primitives, explicit requirements |
| 2 | Array/Object/Map/Set, sorting, filtering, deduplication, grouping | Multiple operations, records, edge cases |
| 3 | Functions, scope, references, mutation, immutability, pure transformations | Domain objects, state transitions, reducer-like logic |
| 4 | Promise, async/await, errors, concurrency, cancellation | Service functions, loading/error states, request coordination |
| 5 | React components, hooks, derived state, effects, integrated workflows | Production-shaped features and boss exercises |

This is not a strict wall between topics. React can appear earlier as a thin rendering shell, and earlier fundamentals must continue to appear on later days.

### Recommended distribution

- 20% isolated fundamentals
- 30% combined transformations
- 25% production-shaped TypeScript
- 20% React behavior
- 5% boss/integration exercises

## 6. Difficulty Levels

Each exercise has a level from 1 to 5.

### Level 1: Isolated primitive

- clean input;
- one operation;
- explicit output;
- examples reveal the shape;
- public tests cover the main path and basic edge cases.

### Level 2: Primitive with constraints

- same core concept;
- additional edge cases or ordering rules;
- no mutation, stable ordering, case handling, or invalid values;
- two related operations may be combined.

### Level 3: Composed transformation

- three or more familiar operations;
- domain records instead of primitives;
- requirements must be decomposed;
- tests assert behavior rather than the chosen implementation.

### Level 4: Production-shaped feature

- optional or partial data;
- business rules and explicit tie-breakers;
- React state, async behavior, error handling, or performance constraints;
- requirements resemble a ticket rather than a textbook prompt.

### Level 5: Boss/integration exercise

- several previously mastered concepts;
- incomplete-looking but sufficient requirements;
- public tests provide only a safety rail;
- hidden tests probe invariants and edge cases;
- learner must justify design and testing choices.

Difficulty must not rise merely by making descriptions confusing. Harder means deeper reasoning, composition, state, constraints, or transfer.

## 7. Concept Mastery Model

Track each concept independently, for example:

```json
{
  "sort": {
    "mastery": 0.64,
    "successfulUses": 3,
    "recentFailures": 1,
    "lastSeenExercise": "D3-E04",
    "highestLevelPassed": 3,
    "needsSpacedReview": false
  }
}
```

Mastery ranges from `0.0` to `1.0`.

Suggested update after an exercise:

```text
quality =
  0.45 × correctness
+ 0.20 × independence
+ 0.15 × explanation
+ 0.10 × edge-case coverage
+ 0.10 × retention

newMastery = clamp(
  oldMastery × 0.75 + quality × 0.25 - regressionPenalty,
  0,
  1
)
```

Where:

- `correctness`: final public and boss/hidden test result;
- `independence`: reduced by progressively stronger hints;
- `explanation`: learner can state the transformation and tradeoffs;
- `edge-case coverage`: learner adds or predicts relevant cases;
- `retention`: performance when a concept returns after other exercises;
- `regressionPenalty`: `0.05–0.15` when a previously passed concept fails again.

Advance a concept when mastery is at least `0.75` across two appearances, including one combined or delayed appearance. Do not infer mastery from one fast pass.

## 8. Exercise Difficulty Score

Each exercise has a numeric score used for selection:

```text
difficulty =
  baseLevel
+ conceptCount × 0.25
+ dataShapeComplexity × 0.30
+ edgeCaseDensity × 0.25
+ stateOrAsyncComplexity × 0.40
+ requirementAmbiguity × 0.15
+ hiddenInvariantWeight × 0.20
```

All component values use a small documented scale, normally `0–3`. `baseLevel` is `1–5`.

After a completed batch, compute a learner performance score:

```text
performance =
  0.35 × passRate
+ 0.20 × firstAttemptRate
+ 0.15 × independence
+ 0.15 × explanationQuality
+ 0.15 × retention
```

Choose the next batch adjustment:

| Performance | Next batch action |
|---|---|
| `>= 0.85` with no regressions | Raise one difficulty dimension by one step; include one transfer problem |
| `0.70–0.84` | Hold difficulty; combine one mastered concept with the current concept |
| `0.50–0.69` | Hold level; reduce composition and add a near-transfer exercise |
| `< 0.50` | Step back one level; isolate the failing primitive and schedule a retry later |

Every batch should contain:

- one confidence builder;
- one current-level exercise;
- one spaced-review exercise;
- one composition exercise when readiness permits;
- at most one stretch exercise.

## 9. Git Commit Adaptation

Git history is supporting evidence, never the sole judge of ability.

### Expected commit format

```text
cardio(D2-E03): pass group active users
cardio(D2-E04): pass dedupe and sort tags
cardio(D2): reflection and cleanup
```

Prefer one exercise per commit. A batch commit is acceptable if the learner records exercise-level timing and attempts separately.

### Safe metrics

The history summarizer may calculate:

- median active completion time for the last 3–5 comparable exercises;
- time trend only among exercises of similar difficulty;
- tests failing-to-passing transitions;
- number of learner-authored commits;
- revert/fix commits indicating regressions;
- diff size as context, not quality;
- whether a reflection was recorded.

Do not treat raw time between commits as active working time across sleep, meetings, or breaks. The learner state should support optional `startedAt`, `pausedAt`, and `completedAt` timestamps.

### Adaptation rules

Increase difficulty by one dimension only when all are true:

- median time improves by at least 15% across three comparable exercises;
- first-attempt or final correctness does not decline;
- no recent regression exists for the target concepts;
- explanations remain adequate;
- hints do not increase.

Hold difficulty when speed improves but evidence is mixed.

Reduce or isolate difficulty when any are true:

- two consecutive exercises require strong hints;
- a previously mastered concept fails twice;
- commits become faster while tests, explanations, or retention worsen;
- the learner repeatedly patches individual assertions without articulating the rule;
- a large implementation appears with no visible test-driven progression and the learner cannot explain it.

Never punish thoughtful refactoring, small commits, interruptions, accessibility work, or additional learner-written tests.

## 10. Exercise Schema

Store each exercise in `exercises/manifest.json` using this shape:

```ts
type Exercise = {
  id: string                    // e.g. "D2-E04"
  title: string
  day: 1 | 2 | 3 | 4 | 5
  level: 1 | 2 | 3 | 4 | 5
  concepts: string[]            // primary and reused concepts
  prerequisites: string[]       // exercise IDs or concept thresholds
  context: "isolated" | "combined" | "production" | "react" | "boss"
  objective: string
  requirements: string[]
  constraints: string[]
  examples: Array<{ input: unknown; output: unknown }>
  starterFiles: string[]
  publicTestFiles: string[]
  bossTestFiles?: string[]
  hiddenTestContract?: string[]  // invariants, never exact hidden cases
  completion: {
    publicTestsPass: boolean
    bossTestsPass?: boolean
    explanationRecorded: boolean
    learnerTestsAdded?: number
  }
  telemetry: {
    attempts: number
    hintLevelUsed: 0 | 1 | 2 | 3
    activeMinutes?: number
    commit?: string
  }
}
```

Each starter implementation should contain a typed signature and `throw new Error("Not implemented")` or a minimal render shell. Do not include solution-shaped comments.

## 11. Test Rules

### Public tests

Public tests must:

- begin with an exercise contract that states every observable rule needed to solve the exercise;
- describe observable behavior in plain language;
- include the documented happy path;
- include empty, single-item, duplicate, or boundary inputs when relevant;
- avoid asserting private helpers or exact implementation structure;
- remain deterministic;
- reset mocks and DOM state between tests;
- distinguish requirement failures from test setup failures;
- use accessible queries for React components, preferring role, label, and visible text;
- test user behavior rather than React internals;
- expose enough information to learn without revealing the algorithm;
- end with a research hint containing relevant concepts, useful Google search phrases, and API names when they help the learner find the right documentation;
- keep research hints free of implementation code, answer-shaped pseudocode, and complete solutions.

The exercise contract, manifest entry, current batch, and test descriptions must agree. Do not shorten a rule into vague wording such as `sort by name` when the behavior actually requires `lastName`, then `firstName`, then `email`. Difficulty comes from reasoning about clear rules, not from discovering requirements that were never stated.

The learner should normally read the tests before implementing.

### Learner-authored tests

From Level 2 onward, some exercises require the learner to add at least one test. At Level 4+, require tests for one failure path or invariant. AI may review these tests but may not silently replace them.

### Hidden tests

Hidden tests are optional and must test only behavior implied by the published contract. They may cover:

- empty and degenerate inputs;
- duplicate and tie behavior;
- immutability;
- stable ordering;
- missing optional fields;
- async rejection and cancellation;
- stale response protection;
- repeated rerenders;
- accessibility states;
- reasonable input scale.

Hidden tests must never depend on an undocumented formatting preference, private function name, exact algorithm, arbitrary timeout, or trick interpretation.

When a hidden test fails, reveal the violated invariant, not the secret input or implementation.

### Boss tests

A boss exercise unlocks only after its prerequisite concepts reach the threshold. Boss tests may initially show only high-level behavior. After the first sincere implementation attempt, the learner may reveal one additional test group at a time.

Every visible boss test file must follow the same clarity and research-hint rules as a public test file.

A boss pass requires:

1. all public and boss/hidden tests passing;
2. no forbidden mutation or side effect;
3. a learner-written test for an uncovered risk;
4. a short explanation of decomposition and tradeoffs.

## 12. Production-Context Progression

Do not jump directly from `number[]` to a large application feature. Use this ladder:

```text
primitive values
→ clean domain records
→ multiple transformations
→ optional/invalid fields
→ explicit business rules
→ state transition or UI
→ async boundary and failures
→ integrated production-shaped feature
```

Example contexts:

- products: availability, price, rating, and stable display order;
- users: active status, duplicate identities, roles, and search;
- notifications: unread grouping, timestamps, and priority;
- orders: status transitions, totals, and incomplete API records;
- autocomplete: filtering, ranking, debounce, cancellation, and stale results.

Production-shaped does not mean needlessly large. Prefer 20–60 lines of focused learner implementation with realistic types and rules.

## 13. React-Specific Exercise Progression

React exercises must test behavior through Vitest and Testing Library.

### Stage A: Render derived data

- render a sorted or filtered list;
- preserve the input array;
- use stable keys;
- display an empty state.

### Stage B: Local interaction

- search and filter;
- toggle sort direction;
- select/deselect unique values;
- derive visible data instead of duplicating it in state.

### Stage C: Reusable hooks and state transitions

- extract `useSortedItems` or `useFilteredUsers`;
- implement reducer-like updates immutably;
- preserve behavior across rerenders;
- avoid stale closures.

### Stage D: Async UI

- loading, success, empty, and error states;
- retry behavior;
- abort an obsolete request;
- ignore stale responses;
- combine fetched data with client-side filtering and sorting.

### Stage E: Production-shaped feature

- accessible product/user table;
- search + filter + dedupe + stable sort;
- URL or controlled state when specified;
- server failure and retry;
- tests for user-visible behavior and race conditions.

Avoid exercises whose main difficulty is remembering a React API. The target is reasoning about data, state, effects, and observable behavior.

## 14. Daily Workflow

### Start of day

1. Review yesterday's reflection for five minutes.
2. Solve one short spaced-review exercise without notes.
3. Open only `exercises/current-batch.md`, starter files, and public tests.

### Per exercise

1. Read the requirement and tests.
2. Predict outputs and list edge cases.
3. Start the exercise timer.
4. Implement without AI-generated solution code.
5. Run the narrowest relevant test set.
6. Diagnose failures before requesting a hint.
7. Add a test when required.
8. Explain aloud or record:
   - what the input becomes;
   - why the chosen structure fits;
   - edge cases;
   - time/space complexity when useful;
   - whether anything mutates.
9. Commit the completed exercise.

### End of batch

1. Run the full batch tests.
2. Record attempts, hint level, active time, and reflection.
3. Generate a history summary.
4. Ask AI to assess the batch without solving it.
5. Generate the next batch using the contract below.

### End of day

- run all completed tests;
- fix regressions before new exercises;
- write three lines: what became automatic, what remained slow, what should return tomorrow;
- make one reflection/cleanup commit.

## 15. AI Tutor Contract

The following rules apply to every AI agent working in this repository.

### Before an exercise is complete, AI may

- clarify the written requirement without adding a solution;
- ask the learner to predict behavior;
- point to a relevant concept or documentation topic;
- suggest Google search phrases or useful API names;
- identify which test failure or invariant to inspect;
- provide a smaller analogous example using different data;
- review learner-written code and ask diagnostic questions;
- generate or repair test infrastructure if the failure is clearly in the harness;
- provide hints according to the ladder below.

### Before completion, AI must not

- write, autocomplete, or paste the implementation;
- provide solution pseudocode matching the required control flow;
- reveal hidden test inputs;
- replace the learner's function with a working version;
- make a commit containing the solution;
- weaken or delete a valid test to create a pass;
- introduce an abstraction that performs the core exercise for the learner;
- claim mastery from passing tests alone.

### Hint ladder

- **Hint 0:** restate the goal as input → transformation → output.
- **Hint 1:** name the failing concept or invariant and ask one focused question.
- **Hint 2:** show a smaller, different example and suggest an observation to test.
- **Hint 3:** outline conceptual steps in natural language, without code or line-level pseudocode.

After Hint 3, mark the exercise `supported`. It may pass, but it must return later as an independent near-transfer exercise before mastery increases.

### After completion, AI may

- show alternative implementations;
- compare complexity and readability;
- suggest an idiomatic refactor;
- review test quality;
- connect the primitive to React or production code;
- generate the next adaptive batch.

Completion means tests pass, the learner has committed the implementation, and the explanation is recorded. If the learner explicitly abandons an exercise, AI may teach it, but it must mark the exercise as taught rather than independently completed and schedule a fresh variant.

## 16. Batch Generation Rules

When creating the next batch:

1. Read this file, `learner-state.json`, `concepts.json`, the last batch results, reflections, and the safe git history summary.
2. Ignore implementation details that would cause the next exercise to mirror a memorized solution.
3. Identify:
   - weakest current concept;
   - strongest concept ready for transfer;
   - one concept due for spaced review;
   - evidence of rushed or AI-assisted work;
   - current React and async readiness.
4. Select 2–5 exercises. Keep the daily total at 10.
5. Reuse earlier concepts in at least 60% of exercises.
6. Add at most one new primary concept per batch.
7. Change only one major difficulty dimension per exercise.
8. Generate starter files, public tests, metadata, and hidden-test contracts, but no solutions.
9. Ensure every test follows Section 11.
10. Explain the adaptation in learner-facing terms without exposing hidden cases.

## 17. Prompt for Generating the Next Batch

Copy this prompt into the AI agent after a batch is committed:

```text
You are the Dev Cardio exercise generator and tutor.

Read README.md and docs/PROGRAM_SPEC.md, then obey the AI Tutor Contract exactly.
Do not write, reveal, or commit solutions. Do not include solution-shaped
pseudocode or comments.

Inputs:
- progress/learner-state.json
- progress/concepts.json
- progress/reflections.md
- exercises/manifest.json
- the completed batch's test results
- the safe output of scripts/summarize-history.ts
- git diff/status only to confirm the completed batch is committed

Task:
Generate the next batch of 2–5 exercises, keeping today's total at 10 and
the full program at 50. Adapt difficulty from correctness, independence,
retention, explanations, and comparable commit-time trends. Never increase
difficulty from speed alone.

Selection requirements:
1. At least 60% of exercises reuse prior concepts.
2. Include one confidence builder and one spaced-review exercise.
3. Include at most one stretch exercise and at most one new primary concept.
4. If a concept regressed or used Hint 3, create an independent near-transfer
   version before advancing it.
5. Increase only one major difficulty dimension at a time.
6. Move toward production context through the documented progression ladder.
7. Introduce React only after its underlying data/state primitive is ready.

For every exercise, create:
- manifest metadata matching the Exercise schema;
- a concise requirement with explicit observable behavior;
- typed starter code with no implementation clues;
- deterministic public Vitest tests;
- an explicit exercise contract at the top of every public test file;
- a research hint at the bottom of every public test file with concepts, useful
  Google search phrases, and relevant API names;
- a hidden-test contract listing invariants but not exact cases;
- one required learner prediction or explanation question;
- concept and prerequisite tags.

Before writing files, output a short adaptation note containing:
- evidence used;
- concepts being reinforced;
- the single difficulty change, if any;
- why each exercise belongs in this batch.

Then create only the exercise, test, manifest, and current-batch files.
Do not modify completed learner implementations.
Do not run or commit a solution.
```

## 18. Batch Output Template

Use this template in `exercises/current-batch.md`:

```markdown
# Day {day}, Batch {batch}

## Why this batch

{Short explanation based on learning evidence, not hidden test details.}

## Exercise {id}: {title}

- Level: {1–5}
- Context: {isolated|combined|production|react|boss}
- Concepts: {primary plus reused concepts}
- Target active time: {range, used only for reflection}

### Objective

{One observable outcome.}

### Requirements

1. {Requirement}
2. {Requirement}

### Constraints

- {Mutation, ordering, API, accessibility, or complexity constraint}

### Before coding

- Predict: {specific output or behavior question}
- List: {one edge-case prompt}

### Completion

- [ ] Public tests pass
- [ ] Required learner test added
- [ ] Explanation recorded
- [ ] Exercise committed
```

## 19. Sorting: One Concept Across Levels

### Level 1: Sort numbers

```ts
sortAscending(values: number[]): number[]
```

Requirements:

- return numbers from smallest to largest;
- do not mutate the input;
- handle empty arrays and duplicates.

The learner focuses on ordering and mutation.

### Level 2: Filter, dedupe, then sort

```ts
normalizeScores(values: number[]): number[]
```

Requirements:

- discard negative scores;
- remove duplicate values;
- return ascending order;
- preserve the input.

The same sort concept now composes with filtering and uniqueness.

### Level 3: Sort domain records with ties

```ts
rankUsers(users: User[]): User[]
```

Requirements:

- include active users only;
- deduplicate by `id`, keeping the most recently updated record;
- order by score descending;
- break equal scores by display name ascending;
- preserve the source array and objects.

The learner must decompose a pipeline and define deterministic ordering.

### Level 4: Production-shaped transformation

```ts
prepareProductRows(products: ApiProduct[]): ProductRow[]
```

Requirements:

- ignore malformed records that lack an ID or displayable name;
- merge duplicate IDs using the newest valid record;
- include in-stock products matching a query and selected categories;
- sort featured products first, then price ascending, then name;
- return UI-ready rows without mutating API data;
- produce the same order for equal inputs on every run.

Sorting is now one rule inside validation, normalization, filtering, deduplication, mapping, and stable business ordering.

### Level 5: React product explorer boss

Build an accessible `ProductExplorer` that:

- loads product records asynchronously;
- displays loading, error, empty, and success states;
- lets the user search, filter categories, and change sort direction;
- deduplicates and normalizes records before rendering;
- cancels or ignores stale requests;
- never mutates props or fetched records;
- exposes retry behavior;
- remains deterministic across rerenders.

Tests interact as a user would. Boss tests probe tie-breaking, stale responses, rerenders, accessibility, and immutability. The original `sortAscending` idea still exists, but inside a realistic UI boundary.

## 20. Example React Exercises

### Derived list

Render users ordered by name without sorting the prop array in place. Add an empty state and a test proving the source array is unchanged.

### Search and sort controls

Add a search input and direction toggle. The visible list should be derived from props and control state. The learner explains why the visible list is not stored as separate state.

### Async autocomplete

Fetch suggestions after input changes, show request states, and prevent an older response from replacing a newer one. Reuse filtering, deduplication, ordering, effects, cleanup, and error handling.

### Reducer-shaped cart update

Implement immutable add, remove, and quantity changes; render totals derived from cart state; reject invalid quantities; test behavior through user actions.

## 21. Completion and Graduation

The program is complete when:

- all 50 exercises are attempted;
- all foundational concepts have at least two independent successful appearances;
- each core concept appears once in a combined or production context;
- regressions are resolved;
- at least one React async boss exercise passes;
- the learner can explain one solution without opening the code;
- the final full test run passes.

The final review should produce:

- concepts now automatic;
- concepts still fragile;
- evidence from tests, explanations, and delayed reuse;
- three recommended maintenance exercises for the next month;
- no new giant roadmap.

## 22. Definition of Success

Success is not “I finished 50 questions quickly.”

Success is:

> I can recognize a familiar primitive inside an unfamiliar production problem, decompose the problem, implement it deliberately, test its behavior, and explain why it works, even when AI does not write it for me.
