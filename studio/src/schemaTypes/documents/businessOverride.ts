import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import ColorHexInput from '../../lib/ColorHexInput'

export const businessOverride = defineType({
  name: 'businessOverride',
  title: 'Business Override',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      components: {
        input: ColorHexInput,
      },
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      components: {
        input: ColorHexInput,
      },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutParagraph1',
      title: 'About Paragraph 1',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutParagraph2',
      title: 'About Paragraph 2',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Title',
      type: 'string',
    }),
    defineField({
      name: 'servicesSubtitle',
      title: 'Services Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'portfolioTitle',
      title: 'Portfolio Title',
      type: 'string',
    }),
    defineField({
      name: 'portfolioSubtitle',
      title: 'Portfolio Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Testimonials Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'aboutImages',
      title: 'About Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            }),
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'portfolioItems',
      title: 'Portfolio Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
