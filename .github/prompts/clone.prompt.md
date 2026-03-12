---
agent: 'agent'
model: GPT-5 mini (copilot)
tools: ['vscode/askQuestions', 'execute/testFailure', 'execute/getTerminalOutput', 'execute/awaitTerminal', 'execute/killTerminal', 'execute/createAndRunTask', 'execute/runInTerminal', 'read/problems', 'read/readFile', 'read/terminalSelection', 'read/terminalLastCommand', 'agent', 'edit/createDirectory', 'edit/createFile', 'edit/editFiles', 'search', 'web/fetch', 'todo']
---

The user provides one or more talks to clone.

Talks are stored in folders named like `YYYY-MM-DD`. Read the repository README.md to find the talk(s) by title, date, event, or location and locate the corresponding folder(s).

<workflow>

1. Identify the talk(s) to clone:
   - Read the README.md file to find the talk(s) matching the user's query (by title, date, event name, or location). If nothing matches, search the talk folders for any matches in their README.md or src/slides.md files.
   - Always use the latest date if multiple talks match the query.

2. Ask for the new date (required) for each cloned talk:
   - Request the date in `YYYY-MM-DD` format and validate it with a simple regex.
   - If a folder with that date already exists, ask whether to pick another date or append a suffix (e.g. `YYYY-MM-DD-1`) and validate the final folder name.

3. Ask for any optional updates to the talk's metadata:
   - Event name, event URL, city, country, recording URL, and title updates. These can be left blank to keep the same values.
   - Validate URLs if provided.

4. Copy the talk folder recursively to the new folder name (preserve all files and directories).

5. Update the cloned talk's content (search & replace any occurrences of the old folder name):
   - src/package.json:
     - Update any occurrences of the old date/folder in script paths (`build`, `export`, `--base`, `--out`, etc.).
     - Update `event` details (`name`, `url`, `location`) and `recording` or `description` if the user provides new values. Use #tool:vscode/askQuestions to get missing info.
   - src/slides.md:
     - Update any human-readable date displayed on slides (e.g., "November, 13 2024") to match the new date (use `Month day, YYYY` format to preserve readability).
     - Update any frontmatter keys if present that should reflect the new date.
     - Update the `<Inalia />` components to remove static data with dynamic question IDs like `<Inalia :questionId="1" />`. Start with question ID 1 and increment for each question found in the slides.
   - README.md in the talk folder:
     - Update the date line to the new date (format `YYYY/MM/DD - Event Name (link)`).
   - Update any other files referencing the old folder name (search the cloned folder and replace occurrences of the original `YYYY-MM-DD` folder name and any event slug).

6. Dependency installation and verification:
   - Run `pnpm install` from the repository root to ensure workspace dependencies are installed.
   - If the cloned talk defines extra local dependencies in src/package.json, run `pnpm install` inside the cloned talk folder as needed.

7. Regenerate repository metadata and READMEs:
   - From the repository root run `pnpm run generate:readme` and `pnpm run generate:talk-readme` to update the root README.md and per-talk README.md files.
</workflow>

<tips>
- Use #tool:vscode/askQuestions to request any missing fields from the user (new date, event name, event URL, city, country, recording URL, or title updates).
- Prefer running `pnpm install` at the repository root for workspace-managed dependencies and only run local install inside the talk folder if needed.
- When replacing text, search for exact occurrences of the old `YYYY-MM-DD` string and also for derived slugs (for example the event slug used in `scripts.build`), and replace them consistently.
- Validate the final folder structure and that `dist/` output path in `src/package.json` scripts is correct for the new date and event name.
</tips>
