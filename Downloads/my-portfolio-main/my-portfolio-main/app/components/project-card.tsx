'use client'

import { motion } from 'framer-motion'

type ProjectCardProps = {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group block rounded-xl bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-zinc-800"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}
