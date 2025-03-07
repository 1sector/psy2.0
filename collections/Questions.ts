import { CollectionConfig } from 'payload/types';

export const Questions: CollectionConfig = {
  slug: 'questions',
  admin: {
    useAsTitle: 'question',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Multiple Choice', value: 'multiple_choice' },
        { label: 'Scale', value: 'scale' },
        { label: 'Open Ended', value: 'open_ended' },
      ],
    },
    {
      name: 'options',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
        },
      ],
      admin: {
        condition: (data) => data?.type === 'multiple_choice',
      },
    },
    {
      name: 'scaleRange',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'max',
          type: 'number',
          required: true,
          defaultValue: 5,
        },
        {
          name: 'step',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
      ],
      admin: {
        condition: (data) => data?.type === 'scale',
      },
    },
  ],
};