import { useRouter } from 'next/router';
import { classNames } from 'utils/config';
import Link from 'next/link';

export default function NavLink({ href, children, className }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={classNames(
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
