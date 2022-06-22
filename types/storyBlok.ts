import React from 'react'

export type storyBlokImage = {
  id: string,
  filename: string,
  thumbnail_url?: string
  alt?: string,
  width?: number
  height?: number
}

export type storyBlokLink = {
  linktype?: string
  cached_url?: string
  url?: string
  email?: string
  anchor?: string
}

export interface SbEditableContent {
    _uid: string
    _editable?: string
    component: string
    [index: string]: any
}

interface SbEditableProps {
    content: SbEditableContent
}

// declare class SbEditable extends React.PureComponent<SbEditableProps, {}> {
//     constructor(props: SbEditableProps)
//     componentDidMount(): void
//     componentDidUpdate(): void
//     addPropsOnChildren(): void
//     addClass(el: HTMLElement, className: string): void
//     render(): React.ReactNode
// }

// export default SbEditable

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
}

export type Stories = {
  data: {
    stories: Story[]
  }
}

// export type SBParams = {
//     token: string
//     with_tag?: string
//     is_startpage?: 0 | 1
//     starts_with?: string
//     by_uuids?: string
//     excluding_ids?: string
//     excluding_fields?: string
//     version?: 'draft' | 'published'
//     cv?: number
//     sort_by?: string
//     search_term?: string
//     filter_query?: string
//     per_page?: number
//     page?: string
// }