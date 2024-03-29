"use client";

import { Budget } from "@prisma/client";
import { UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { BarChart3, LayoutDashboard, PlusSquare } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import BudgetOptionsModal from "@/components/ui/my_components/budget-options-modal";

export default function NavBar({ budgets }: { budgets: Budget[] }) {
  const pathname = usePathname();
  const { budgetId } = useParams();

  return (
    <>
      <section className="hidden md:block border-b">
        <div className="flex h-16 items-center px-4 font-semibold text-sm">
          <div className="flex justify-center items-center gap-2">
            <BudgetOptionsModal items={budgets} />
            <Link
              href={`/${budgetId}`}
              className={cn(
                "transition-colors dark:hover:text-white hover:text-black px-4 py-1 rounded-full",
                pathname === `/${budgetId}`
                  ? "text-black dark:text-white bg-gray-100 dark:bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              <p>Dashboard</p>
            </Link>
            <Link
              href={`/${budgetId}/new-entry`}
              className={cn(
                "transition-colors dark:hover:text-white hover:text-black px-4 py-1 rounded-full",
                pathname === `/${budgetId}/new-entry`
                  ? "text-black dark:text-white bg-gray-100 dark:bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              <p>New Entry</p>
            </Link>
            <Link
              href={`/${budgetId}/details`}
              className={cn(
                "transition-colors dark:hover:text-white hover:text-black px-4 py-1 rounded-full",
                pathname === `/${budgetId}/details`
                  ? "text-black dark:text-white bg-gray-100 dark:bg-secondary"
                  : "text-muted-foreground"
              )}
            >
              <p>Details</p>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </section>
      <section className="fixed block w-full top-0 z-10 md:hidden border-b bg-white dark:bg-secondary">
        <div className="flex items-center justify-between h-14 px-4">
          <BudgetOptionsModal items={budgets} />
          <div className="flex items-center justify-center gap-2">
            <ModeToggle />
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </section>
      <section className="fixed block md:hidden bottom-0 w-full h-12 border-t z-10 bg-white dark:bg-secondary">
        <ul className="flex justify-between h-full items-center mx-6">
          <Link href={`/${budgetId}`}>
            <LayoutDashboard
              className={cn(
                "h-8 w-8",
                pathname === `/${budgetId}`
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <Link href={`/${budgetId}/new-entry`}>
            <PlusSquare
              className={cn(
                "h-8 w-8",
                pathname === `/${budgetId}/new-entry`
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
          <Link href={`/${budgetId}/details`}>
            <BarChart3
              className={cn(
                "h-8 w-8",
                pathname === `/${budgetId}/details`
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            />
          </Link>
        </ul>
      </section>
    </>
  );
}
