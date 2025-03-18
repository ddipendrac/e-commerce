"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenuItems } from "@/config/menuConfig";

const AdminMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex">
        {adminMenuItems.map((item) => (
          <li key={item.href} className="mr-4">
            <Link
              href={item.href}
              className={`hover:text-gray-200 ${
                pathname === item.href ? "text-yellow-400 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminMenu;
