"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

const routes = [
  {
    name: "Media",
    route: "/",
  },
  {
    name: "Advertisement",
    route: "/advertisement",
  },
  {
    name: "Routes",
    route: "/routes",
  },
  {
    name: "Configuration",
    route: "/configuration",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex w-60 shrink-0 flex-col items-stretch gap-2 p-4">
      {routes.map((route) =>
        pathname === route.route ? (
          <Button
            key={route.name + route.route}
            variant="ghost"
            className="justify-start bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
            onClick={() => {
              router.refresh();
            }}
          >
            {route.name}
          </Button>
        ) : (
          <Button
            key={route.name + route.route}
            variant="ghost"
            className="justify-start"
            onClick={() => {
              router.push(route.route);
            }}
          >
            {route.name}
          </Button>
        ),
      )}
    </div>
  );
}
