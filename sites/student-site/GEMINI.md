# Student Portal: AI Guidelines & Environment Contract

## Project Configuration

- **Workspace Path**: `sites/student-site`
- **Framework**: SvelteKit 2 / Svelte 5 (Runes)
- **Language**: TypeScript
- **Package Manager**: `pnpm` (Monorepo standard `pnpm@12.3.4`)
- **Add-ons / Stack**: prettier, eslint, vitest, sveltekit-adapter, drizzle, better-auth, mcp

### Monorepo Command Execution

When running commands from workspace root for this site, always use the filter:

```bash
# Start development server
pnpm --filter student-site dev

# Run unit tests
pnpm --filter student-site test

# Run build
pnpm --filter student-site build
```

---

## Svelte 5 & MCP Tool Integration

When the Svelte MCP server is active, leverage its tools for authoritative documentation and validation:

### 1. `list-sections`

Use to discover available documentation sections. Returns a structured list with titles, use cases, and paths. When addressing unfamiliar Svelte 5 / SvelteKit topics, query this first.

### 2. `get-documentation`

Retrieves the full documentation content for specific sections identified via `list-sections`.

### 3. `svelte-autofixer`

Analyzes Svelte component code and returns diagnostics and suggested improvements. Use this tool when generating or refactoring Svelte 5 runes and components before concluding work.

### 4. `playground-link`

Generates a Svelte Playground link. Only offer or invoke if explicitly requested by the user, and never in place of editing local project files.
