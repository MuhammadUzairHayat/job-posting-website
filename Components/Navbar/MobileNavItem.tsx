import Link from "next/link"

// Mobile Nav Item Component
type MobileNavItemProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'outline' | string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, label, variant, onClick }) => {
  if (variant === 'primary') {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="block px-3 py-3 text-base font-medium text-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-sm"
      >
        {label}
      </Link>
    )
  }

  if (variant === 'outline') {
    return (
      <Link 
        href={href}
        onClick={onClick}
        className="block px-3 py-3 text-base text-center font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-slate-100"
      >
        {label}
      </Link>
    )
  }

  return (
    <Link 
      href={href}
      onClick={onClick}
      className="block px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
    >
      {label}
    </Link>
  )
}

export default MobileNavItem;
