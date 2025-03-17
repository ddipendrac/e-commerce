// components/AdminMenu.tsx
import Link from 'next/link';

const AdminMenu = () => {
  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Orders', href: 'admin/orders' },
    { label: 'Add product', href: '/dashboard/add-product' },
    // Add more menu items as needed 
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex">
        {menuItems.map((item) => (
          <li key={item.href} className="mr-4">
            <Link href={item.href} className="hover:text-gray-200">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminMenu;