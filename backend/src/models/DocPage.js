class DocPage {
  constructor(data) {
    this.id = data.id
    this.category_id = data.category_id
    this.title = data.title
    this.slug = data.slug
    this.content = data.content
    this.sort_order = data.sort_order
    this.is_published = data.is_published
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  toJSON() {
    return {
      id: this.id,
      category_id: this.category_id,
      title: this.title,
      slug: this.slug,
      content: this.content,
      sort_order: this.sort_order,
      is_published: this.is_published,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}

export default DocPage
