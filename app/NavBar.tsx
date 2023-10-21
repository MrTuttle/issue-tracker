// app/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniCpuChip } from "react-icons/hi2";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  DropdownMenu,
  DropdownMenuTrigger,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  // console.log(currentPath);

  const { status, data: session } = useSession();

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
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          // <Link href="/api/auth/signout">Log out</Link>
          <DropdownMenu.Root>
            <DropdownMenuTrigger>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
