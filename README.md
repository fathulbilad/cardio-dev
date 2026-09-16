# Dev Cardio

Dev Cardio is my five-day, 50-exercise practice program for rebuilding programming fundamentals through TypeScript, React, Vitest, and Testing Library.

## Why I Created It

Working heavily with AI can make coding faster, but I do not want my programming fundamentals or independent problem-solving skills to weaken.

I do not know where AI is headed. I do not know what the race around AI is really about, and I do not know why we are racing against it. I do know that AI can be genuinely helpful. Instead of thinking about it negatively, I want to build something that strengthens my fundamentals while also helping me learn how to work with AI deliberately. When AI helps, why not use it?

Dev Cardio is how I practice both sides. I solve the implementation myself, but I can use tests, documentation, Google searches, focused hints, and AI feedback to understand the problem and learn the underlying concepts.

## The Goal

The goal is not to memorize 50 answers or finish them as quickly as possible. The goal is to make important programming decisions feel familiar again.

By the end of the program, I want to be able to:

- translate requirements into concrete data transformations;
- choose suitable arrays, objects, maps, and sets;
- reason about mutation, references, state, and pure functions;
- handle asynchronous work, failures, cancellation, and stale requests;
- build and test React components and hooks;
- recognize simple fundamentals inside production-shaped problems;
- explain why a solution works and which edge cases matter;
- use AI as a learning partner without giving away the implementation.

## The Five-Day Program

The program contains exactly 50 exercises, with 10 exercises per day. Each day builds on the previous one.

| Day | Focus | Progression |
|---|---|---|
| 1 | Loops, conditions, indexing, and accumulation | Small functions using primitive values and arrays |
| 2 | Arrays, objects, maps, sets, sorting, filtering, grouping, and deduplication | Multiple transformations over domain records |
| 3 | Functions, scope, references, mutation, immutability, and state transitions | Reducer-like logic and nested domain data |
| 4 | Promises, async/await, errors, concurrency, cancellation, and stale responses | Service functions and request coordination |
| 5 | React components, hooks, derived state, effects, and integrated workflows | Production-shaped features and a final boss exercise |

The exercises become progressively harder, but difficulty should come from deeper reasoning and composition. It should not come from missing information or confusing wording.

## How an Exercise Works

For each exercise:

1. Read the exercise requirements and visible tests.
2. Identify the input, transformation rules, and expected output.
3. Predict important examples and edge cases.
4. Implement the solution without asking AI to write it.
5. Run the narrowest relevant test.
6. Diagnose failures before opening the research hint.
7. Add a learner-written test when required.
8. Explain the solution, including mutation, ordering, tie rules, and edge cases when relevant.
9. Commit the completed exercise.

The visible tests describe observable behavior. Requirements such as filtering, ordering, tie-breaking, case handling, mutation, async failures, and accessibility should be explicit. A learner should not need to reverse-engineer an undocumented rule from an expected result.

## Research Is Part of the Practice

Searching Google or reading documentation is allowed and encouraged. Remembering every API name is not the goal. Learning how to find the right concept, understand it, and apply it independently is part of the skill.

Every visible public and boss test file ends with a research hint. The hint contains:

- the concepts involved in the exercise;
- useful Google search phrases;
- relevant API names when knowing the API is part of the lesson.

The hint does not contain implementation code or a disguised complete solution. I should first search for the concept, read an explanation or documentation, then return and write the code myself.

Example:

```ts
/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: array accumulation, immutable transformations
 * Search keywords:
 * - "JavaScript sum array values"
 * - "JavaScript reduce accumulator"
 * - "TypeScript Array.reduce"
 */
```

## How AI Fits In

Before an exercise is complete, AI may:

- clarify a requirement;
- identify a relevant concept or invariant;
- suggest documentation topics or search keywords;
- ask a focused diagnostic question;
- show a smaller example using different data;
- review my attempt without replacing it.

Before an exercise is complete, AI should not write the implementation, provide answer-shaped pseudocode, reveal hidden cases, weaken a valid test, or claim that passing tests alone proves mastery.

After I complete and explain an exercise, AI may review alternatives, complexity, readability, and test quality.

## Why GitHub Stores the State

I do not want to spend this project managing a hosted backend, database schema, authentication, migrations, and synchronization. The AI agent can already read repository files and Git history, so each branch can represent one complete Dev Cardio iteration.

The working tree holds my current work. Commits record checkpoints. The active branch holds the current iteration, and GitHub keeps its durable remote copy. This lets the code, tests, progress, reflections, and history remain together as one source of truth.

This approach is designed for my current single-person workflow. The full architecture and tradeoffs are documented in [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md).

## Running the Project

Install dependencies:

```bash
npm install
```

Open the current batch:

```text
exercises/current-batch.md
```

Run the current batch:

```bash
npm run test:current
```

Run all tests:

```bash
npm run test:run
```

Verify and record the current batch:

```bash
npm run cardio:verify
```

Generate the next adaptive batch:

```bash
npm run cardio:next
```

## Repository Guide

```text
src/exercises/          TypeScript exercise implementations
src/components/         React component exercises
src/hooks/              React hook exercises
tests/public/           Visible behavior tests and research hints
tests/boss/             Additional final-exercise behavior tests
exercises/manifest.json Complete exercise definitions and progress metadata
exercises/current-batch.md
                        Requirements for the active batch
progress/               Mastery estimates, learner state, and reflections
scripts/                Verification, history, and batch-generation tools
docs/PROGRAM_SPEC.md    Curriculum and AI tutor specification
docs/SYSTEM_DESIGN.md   Architecture and GitHub-backed persistence design
```

## Definition of Success

Success is not simply finishing 50 questions.

Success means I can recognize a familiar primitive inside an unfamiliar production problem, break the problem into smaller rules, implement it deliberately, test its behavior, and explain why it works. I should be able to do that while using AI thoughtfully, without depending on AI to do the reasoning for me.

The detailed curriculum, adaptation rules, exercise schema, test contract, and generator instructions are in [docs/PROGRAM_SPEC.md](docs/PROGRAM_SPEC.md). The architecture is in [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md).
