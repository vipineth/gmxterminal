export default function A({ className, href, target, children }) {
  return (
    <a
      className={
        'underline text-blue-600 hover:text-blue-800 visited:text-purple-600' +
        className
      }
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
    >
      {children}
    </a>
  );
}
