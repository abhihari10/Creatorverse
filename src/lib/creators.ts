import { supabase } from '../client.js'
import type { Creator, CreatorInput } from '../types'

const TABLE = 'creators'

function cleanCreator(input: CreatorInput) {
  return {
    name: input.name.trim(),
    url: input.url.trim(),
    description: input.description.trim(),
    imageURL: input.imageURL.trim() || null,
  }
}

export async function fetchCreators() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
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
    throw error
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
    throw error
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
    throw error
  }

  return data as Creator
}

export async function deleteCreator(id: number) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) {
    throw error
  }
}
