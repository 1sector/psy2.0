import { CollectionConfig } from 'payload/types';

export const Tests: CollectionConfig = {
  slug: 'tests',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Personality Assessment', value: 'personality' },
        { label: 'Cognitive Test', value: 'cognitive' },
        { label: 'Emotional Intelligence', value: 'emotional' },
        { label: 'Mental Health Screening', value: 'mental_health' },
      ],
    },
    {
      name: 'timeLimit',
      type: 'number',
      label: 'Time Limit (minutes)',
    },
    {
      name: 'questions',
      type: 'relationship',
      relationTo: 'questions',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
};