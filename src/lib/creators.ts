import { supabase } from '../client'
import type { Creator, CreatorInput } from '../types'

const TABLE = 'creators'
const LOCAL_KEY = 'creatorverse.creators'

const starterCreators: Creator[] = [
  {
    id: 1,
    created_at: '2026-01-05T12:00:00.000Z',
    name: 'MKBHD',
    url: 'https://www.youtube.com/@mkbhd',
    description:
      'Sharp, beautifully produced reviews and explainers about phones, cars, and the future of consumer technology.',
    imageURL:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 2,
    created_at: '2026-01-04T12:00:00.000Z',
    name: 'Kurzgesagt',
    url: 'https://www.youtube.com/@kurzgesagt',
    description:
      'Animated science stories that turn cosmic scale, biology, and philosophy into clear visual essays.',
    imageURL:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 3,
    created_at: '2026-01-03T12:00:00.000Z',
    name: 'Simone Giertz',
    url: 'https://www.youtube.com/@simonegiertz',
    description:
      'Inventive builds, practical design experiments, and delightfully honest engineering projects.',
    imageURL:
      'https://images.unsplash.com/photo-1581091215367-59ab6b6f8400?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 4,
    created_at: '2026-01-02T12:00:00.000Z',
    name: 'NPR Tiny Desk',
    url: 'https://www.youtube.com/@nprmusic',
    description:
      'Intimate live performances that make established and emerging artists feel close enough to hear the room.',
    imageURL:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 5,
    created_at: '2026-01-01T12:00:00.000Z',
    name: 'The Icing Artist',
    url: 'https://www.youtube.com/@TheIcingArtist',
    description:
      'Colorful cake transformations, decorating challenges, and dessert builds with a playful studio feel.',
    imageURL:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=80',
  },
]

function cleanCreator(input: CreatorInput) {
  return {
    name: input.name.trim(),
    url: input.url.trim(),
    description: input.description.trim(),
    imageURL: input.imageURL.trim() || null,
  }
}

function readLocalCreators() {
  const saved = window.localStorage.getItem(LOCAL_KEY)

  if (!saved) {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(starterCreators))
    return starterCreators
  }

  return JSON.parse(saved) as Creator[]
}

function writeLocalCreators(creators: Creator[]) {
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(creators))
}

export async function fetchCreators() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return readLocalCreators().sort((a, b) => b.id - a.id)
  }

  return data as Creator[]
}

export async function fetchCreator(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    const creator = readLocalCreators().find((item) => item.id === Number(id))

    if (!creator) {
      throw error
    }

    return creator
  }

  return data as Creator
}

export async function addCreator(input: CreatorInput) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(cleanCreator(input))
    .select()
    .single()

  if (error) {
    const creators = readLocalCreators()
    const nextId = creators.reduce((largest, creator) => Math.max(largest, creator.id), 0) + 1
    const creator = {
      id: nextId,
      created_at: new Date().toISOString(),
      ...cleanCreator(input),
    }

    writeLocalCreators([creator, ...creators])
    return creator
  }

  return data as Creator
}

export async function updateCreator(id: number, input: CreatorInput) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(cleanCreator(input))
    .eq('id', id)
    .select()
    .single()

  if (error) {
    const updated = {
      id,
      created_at: new Date().toISOString(),
      ...cleanCreator(input),
    }
    const creators = readLocalCreators().map((creator) =>
      creator.id === id ? updated : creator,
    )

    writeLocalCreators(creators)
    return updated
  }

  return data as Creator
}

export async function deleteCreator(id: number) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) {
    const creators = readLocalCreators().filter((creator) => creator.id !== id)
    writeLocalCreators(creators)
  }
}
