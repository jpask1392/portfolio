import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol className="breadcrumb flex">
        {breadcrumbs.map((breadcrumb, i: number) => {
          return (
            <li key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
                <a className="text-xs text-fadedText font-medium tracking-wider">
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </a>
              </Link>
              {
                (i < (breadcrumbs.length - 1)) ? (
                  <span className="mx-3 text-xs text-fadedText">/</span>
                ) : null
              }
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;