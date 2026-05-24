import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'longDescription', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'techStack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'isFeatured', type: 'boolean', initialValue: false }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: ['completed', 'in-progress', 'archived']
      }
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail' }
  }
})
