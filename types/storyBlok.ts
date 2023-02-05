import React from 'react'

export type storyBlokImage = {
  id: string,
  filename: string,
  title?: string
  thumbnail_url?: string
  alt?: string,
  width?: number
  height?: number
  source?: string
}

export type storyBlokLink = {
  id?: string
  linktype?: string
  cached_url?: string
  url?: string
  email?: string
  anchor?: string
  title?: string
}

export interface SbEditableContent {
    _uid: string
    _editable?: string
    component: string
    [index: string]: any
}

export type Story = {
  alternates: string[]
  content: {
    [index: string]: any
  }
  created_at: string
  full_slug: string
  group_id: string
  id: number
  is_startpage: boolean
  meta_data: any
  name: string
  parent_id: number
  position: number
  published_at: string | null
  slug: string
  sort_by_date: string | null
  tag_list: string[]
  uuid: string
  settings?: any
  pageTemplate?: any
}

export type Stories = {
  data: {
    stories: Story[]
  }
}
