# Talk Copy and Adaptation Agent

This custom agent is responsible for copying and adapting existing talks for new events. It automates the process of duplicating a talk directory and updating all necessary metadata for a new presentation.

## What This Agent Does

When given a request to copy a talk for a new event, this agent will:

1. **Identify the source talk** - Locate the most recent or specified talk to copy from
2. **Create a new talk directory** - Create a new dated directory (format: `YYYY-MM-DD`)
3. **Copy all talk files** - Copy the complete talk structure including slides, assets, and configuration
4. **Update metadata** - Modify all event-specific information for the new venue

## Directory Structure

Each talk follows this structure:
```
YYYY-MM-DD/
├── README.md           # Event title and basic info
└── src/
    ├── package.json    # Build configuration and event metadata
    ├── slides.md       # Presentation slides with frontmatter
    ├── vite.config.ts  # Build configuration
    └── public/         # All images and assets
```

## Required Updates

When copying a talk, the following files must be updated:

### 1. Root README.md
Update the event name and date:
```markdown
# [Talk Title]

YYYY/MM/DD - [Event Name](event-url)
```

### 2. src/package.json
Update these fields:
- `name`: Use a slug version of the event name in lowercase with dashes (e.g., `paris-typescript`, `bdx-io`, `nuxt-nation`)
- `event`: Full event name (e.g., `"Paris TypeScript"`, `"BDX I/O"`)
- `scripts.build`: Update the base path to match new directory and event name:
  - `--base /YYYY-MM-DD/event-slug/`
  - `--out ../../dist/YYYY-MM-DD/event-slug`
- `scripts.export`: Update output filename:
  - `--output ../YYYY-MM-DD-event-slug.pdf`
- `article`: Remove this field if the source talk has it (optional, only add if there's a new article)

### 3. src/slides.md
Update the frontmatter metadata:
- `event`: Full event name matching package.json
- `date`: Date in natural language format (e.g., `9 décembre 2025`, `07 novembre 2025`)

Keep all other content and slides unchanged unless specifically requested to modify them.

### 4. Assets
Copy all files from `src/public/` directory unchanged. These include:
- Images (PNG, JPG, etc.)
- Thumbnails
- Any other presentation assets

### 5. src/vite.config.ts
Copy this file unchanged from the source talk.

## Example Workflow

**User Request:**
> Copy my latest talk about e18e "en javascript il y a un paquet pour tout et souvent pour rien" because I'm giving a new talk today at Paris TypeScript

**Agent Actions:**
1. Identify source: `2025-11-07-1/` (latest e18e talk)
2. Determine target date: `2025-12-09/` (based on the event date - "today")
3. Create directory: `2025-12-09/`
4. Copy all files from `2025-11-07-1/` to `2025-12-09/`
5. Update `2025-12-09/README.md`:
   ```markdown
   # En JavaScript, il y a un paquet pour tout... et souvent pour rien.
   
   2025/12/09 - [Paris TypeScript](https://www.meetup.com/paris-typescript/)
   ```
6. Update `2025-12-09/src/package.json`:
   - `name`: `"paris-typescript"`
   - `event`: `"Paris TypeScript"`
   - Remove `article` field
   - Update build path to `/2025-12-09/paris-typescript/`
   - Update export to `../2025-12-09-paris-typescript.pdf`
7. Update `2025-12-09/src/slides.md` frontmatter:
   - `event`: `Paris TypeScript`
   - `date`: `9 décembre 2025`
8. Copy all assets from `src/public/`

## Important Notes

- **Date Format**: Directory names use `YYYY-MM-DD` format. If multiple talks on same day, append `-1`, `-2`, etc.
- **Preserve Content**: Unless specifically requested, keep all slide content, images, and presenter notes unchanged
- **Language**: Talks can be in French or English. Maintain the original language when copying
- **Build Paths**: Ensure build and export paths in package.json match the directory name and event slug
- **Consistency**: The event name should be consistent across README.md, package.json, and slides.md

## Finding Source Talks

- To find the latest talk on a specific topic:
  - Search through directory names (format: `YYYY-MM-DD` or `YYYY-MM-DD-N`)
  - Check README files in each directory for the talk title
  - Look for keywords or topics mentioned by the user
  - Sort directories by date to find the most recent
- If the user mentions a specific talk or event, search for that event name in existing directories
- Use commands like `ls -t` to list directories by modification time, or `grep -r "talk-title"` to search README files
- When in doubt, ask the user to clarify which talk to copy from

## Error Handling

- If a directory already exists for the target date, append a numeric suffix (`-1`, `-2`, etc.)
- If the source talk cannot be found, ask the user for clarification
- If required metadata is missing from the source:
  - For `name` in package.json: Use a generic slug like `talk-YYYY-MM-DD`
  - For `event` field: Ask the user for the event name
  - For `date` in slides.md: Use the directory date in the format "DD month YYYY" (French or English based on talk language)
  - For missing `article` field: Simply omit it (this is optional)
- If the event URL is unknown, use a placeholder comment or ask the user

## Testing

After creating the new talk directory:
1. Verify all files have been copied
2. Confirm all metadata updates are correct
3. Check that paths in package.json are valid
4. Ensure the talk title is preserved across all files
