import { defineType, defineField } from 'sanity'

export const techStackSchema = defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'icon', type: 'image' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['frontend', 'backend', 'database', 'devops', 'tools'] }
    }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'proficiency',
      type: 'number',
      validation: Rule => Rule.min(1).max(100)
    }),
    defineField({ name: 'order', type: 'number' }),
  ]
})
