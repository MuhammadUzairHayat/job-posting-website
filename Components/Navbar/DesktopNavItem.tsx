import Link from "next/link"

type DesktopNavItemProps = {
  href: string;
  label: string;
  variant?: 'default' | 'primary' | 'outline';
}

// Desktop Nav Item Component
const DesktopNavItem = ({ href, label, variant = 'default' }: DesktopNavItemProps) => {
  if (variant === 'primary') {
    return (
      <Link 
        href={href}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        {label}
      </Link>
    )
  }

  if (variant === 'outline') {
    return (
      <Link 
        href={href}
        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
      >
        {label}
      </Link>
    )
  }

  return (
    <Link 
      href={href}
      prefetch={true}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
    >
      {label}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}

export default DesktopNavItem;