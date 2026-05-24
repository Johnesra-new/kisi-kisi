import { defineType, defineField } from 'sanity'

export const certificateSchema = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'issuer', type: 'string' }),
    defineField({ name: 'issuedAt', type: 'date' }),
    defineField({ name: 'credentialId', type: 'string' }),
    defineField({ name: 'credentialUrl', type: 'url' }),
    defineField({ name: 'thumbnail', type: 'image' }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['frontend', 'backend', 'cloud', 'other'] }
    }),
  ]
})
