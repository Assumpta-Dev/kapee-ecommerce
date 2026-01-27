import { Link } from "react-router-dom";

type BreadcrumbProps = {
  items: string[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index === 0 ? (
            <Link to="/" className="hover:text-blue-600 transition-colors">
              {item}
            </Link>
          ) : index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item}</span>
          ) : (
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              {item}
            </span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
