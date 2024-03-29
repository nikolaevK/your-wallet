import getMonthlyExpenses from "@/actions/getMonthlyExpenses";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency } from "@prisma/client";
import Overview from "./overview";

interface OverviewCardInterface {
  budgetId: string;
  currency: Currency;
}

export default async function OverviewCard({
  budgetId,
  currency,
}: OverviewCardInterface) {
  const monthlyExpenses = await getMonthlyExpenses(budgetId);

  return (
    <Card className="col-span-3 max-h-[430px]">
      <CardHeader>
        <CardTitle className="text-sm">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-0 md:p-4">
        <div className="w-full">
          <Overview data={monthlyExpenses || []} currency={currency!.symbol} />
        </div>
      </CardContent>
    </Card>
  );
}
