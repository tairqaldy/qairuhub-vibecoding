import { getCollection, getEntry, render } from 'astro:content';
import type { Lang } from '@/data/curriculum';
import { labFile, labs, lessonFile, modules } from '@/data/curriculum';

type Kind = 'lessons' | 'labs';

/**
 * Get a localised entry, falling back to English when the translation is missing.
 * Returns the entry plus a flag so the page can tell the reader it is a fallback.
 */
export async function getLocalised(kind: Kind, lang: Lang, file: string) {
  const wanted = await getEntry(kind, `${lang}/${file}`);
  if (wanted) return { entry: wanted, isFallback: false };
  const fallback = await getEntry(kind, `en/${file}`);
  if (!fallback) throw new Error(`Missing content: ${kind}/en/${file}`);
  return { entry: fallback, isFallback: true };
}

export async function renderEntry(entry: Awaited<ReturnType<typeof getEntry>>) {
  if (!entry) throw new Error('renderEntry: no entry');
  return render(entry);
}

/** Which module/lab files actually exist, so routes never 404 on a missing MDX file. */
export async function existingFiles(kind: Kind) {
  const all = await getCollection(kind);
  return new Set(all.map((e) => e.id.split('/').slice(1).join('/')));
}

export async function moduleRoutes() {
  const files = await existingFiles('lessons');
  return modules.filter((m) => files.has(lessonFile(m)));
}

export async function labRoutes() {
  const files = await existingFiles('labs');
  return labs.filter((l) => files.has(labFile(l)));
}
