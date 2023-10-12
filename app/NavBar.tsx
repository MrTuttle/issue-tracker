// app/NavBar.tsx

import Link from "next/link";
import { HiMiniCpuChip } from "react-icons/hi2";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <HiMiniCpuChip />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label} className="ml-10">
            <Link
              href={link.href}
              className=" text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
