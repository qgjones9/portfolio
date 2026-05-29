export type ProjectCategoryFilter =
  | 'All'
  | 'B2B SaaS'
  | 'Desktop & Migrations'
  | 'Cloud & Automation'

const PROJECT_CATEGORY_FILTERS: ProjectCategoryFilter[] = [
  'All',
  'B2B SaaS',
  'Desktop & Migrations',
  'Cloud & Automation',
]

interface FilterTabsProps {
  activeCategory: ProjectCategoryFilter
  onCategoryChange: (category: ProjectCategoryFilter) => void
}

export default function FilterTabs({
  activeCategory,
  onCategoryChange,
}: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {PROJECT_CATEGORY_FILTERS.map((category) => {
        const isActive = category === activeCategory

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-violet-500/40 bg-violet-500/10 text-zinc-50'
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-zinc-100'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
