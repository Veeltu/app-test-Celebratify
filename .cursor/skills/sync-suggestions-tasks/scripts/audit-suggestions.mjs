#!/usr/bin/env node
/**
 * Audyt doc/sugestions.md ↔ doc/tasks/<slug>.md
 * Exit 0 = OK, exit 1 = brakujące taski lub niespójności
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../../../../');
const SUGESTIONS = join(ROOT, 'doc/sugestions.md');
const TASKS_DIR = join(ROOT, 'doc/tasks');

const META = new Set([
  'proponowana kolejność wdrożenia (sprinty)',
  'uwagi techniczne (dla agenta / dev)',
  'linki',
]);

function parseSections(content) {
  const lines = content.split('\n');
  const sections = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const num = line.match(/^## (\d+)\. (.+)$/);
    if (num) {
      if (current) sections.push(current);
      current = {
        num: num[1],
        title: num[2].trim(),
        line: i + 1,
        taskLink: null,
        priority: null,
        body: [],
      };
      continue;
    }
    if (!current) continue;

    const other = line.match(/^## (.+)$/);
    if (other) {
      const key = other[1].trim().toLowerCase();
      if (META.has(key)) {
        sections.push(current);
        current = null;
      }
      continue;
    }

    const link = line.match(
      />\s*\*\*Task:\*\*\s*\[([^\]]+)\]\(\.\/tasks\/([^)]+)\)/
    );
    if (link) current.taskLink = { label: link[1], file: link[2] };

    const pri = line.match(/^\*\*Priorytet:\*\*\s*(P\d)/);
    if (pri) current.priority = pri[1];

    current.body.push(line);
  }
  if (current) sections.push(current);
  return sections;
}

function parseTask(path, filename) {
  const raw = readFileSync(path, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return { filename, error: 'brak frontmatter' };
  const get = (k) => {
    const m = fm[1].match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
  };
  return {
    filename,
    id: get('id'),
    source_section: get('source_section'),
    status: get('status'),
  };
}

function slugify(title) {
  const map = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
  return title
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => map[c] || c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function main() {
  const sug = readFileSync(SUGESTIONS, 'utf8');
  const sections = parseSections(sug);
  const files = readdirSync(TASKS_DIR).filter(
    (f) => f.endsWith('.md') && f !== '_template.md' && !f.startsWith('_')
  );
  const tasks = files.map((f) => parseTask(join(TASKS_DIR, f), f));
  const bySection = new Map(
    tasks.filter((t) => t.source_section).map((t) => [t.source_section, t])
  );

  const missing = [];
  const missingLinks = [];
  const mismatches = [];

  for (const s of sections) {
    const task = bySection.get(s.num);
    if (!task) {
      const slug = slugify(s.title);
      missing.push({
        section: s.num,
        title: s.title,
        line: s.line,
        suggestedId: `feature-${slug}`,
        suggestedFile: `feature-${slug}.md`,
      });
      continue;
    }
    if (!s.taskLink) {
      missingLinks.push({ section: s.num, taskFile: task.filename });
    } else if (s.taskLink.file !== task.filename) {
      mismatches.push({ section: s.num, link: s.taskLink.file, actual: task.filename });
    }
  }

  const sectionNums = new Set(sections.map((s) => s.num));
  const orphaned = tasks.filter((t) => {
    if (!t.source_section || t.source_section === 'null' || t.source_section === '—') {
      return false; // bugi / taski ad-hoc bez sekcji sugestii
    }
    return !sectionNums.has(t.source_section);
  });

  const ok =
    !missing.length && !missingLinks.length && !mismatches.length && !orphaned.length;
  const report = {
    ok,
    sectionsCount: sections.length,
    tasksCount: tasks.length,
    missing,
    missingLinks,
    mismatches,
    orphaned,
  };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(ok ? 0 : 1);
  }

  console.log(`Sekcje: ${sections.length} | taski: ${tasks.length}\n`);
  for (const s of sections) {
    const t = bySection.get(s.num);
    console.log(`${t ? '✓' : '✗'} [${s.num}] ${s.title} → ${t?.filename ?? 'BRAK'}`);
  }
  if (missing.length) {
    console.log('\nDo utworzenia:');
    for (const m of missing) {
      console.log(`  [${m.section}] doc/tasks/${m.suggestedFile}`);
    }
  }
  if (missingLinks.length) {
    console.log('\nBrak linku Task w sugestions:');
    for (const m of missingLinks) console.log(`  sekcja ${m.section} → ${m.taskFile}`);
  }
  if (mismatches.length) {
    console.log('\nNiespójne linki:');
    for (const m of mismatches) console.log(`  sekcja ${m.section}: ${m.link} ≠ ${m.actual}`);
  }
  if (orphaned.length) {
    console.log('\nTaski bez sekcji:');
    for (const t of orphaned) {
      console.log(`  ${t.filename} (source_section: ${t.source_section})`);
    }
  }
  console.log(ok ? '\nOK' : '\nWymaga sync — użyj skill sync-suggestions-tasks');
  process.exit(ok ? 0 : 1);
}

main();
