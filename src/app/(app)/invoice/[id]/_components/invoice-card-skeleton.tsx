import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function InvoiceCardSkeleton() {
  return (
    <Card className="shadow-lg p-0">
      <CardHeader className="bg-gray-100 border-b py-4 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="w-24 h-6 bg-gray-300" />
            <Skeleton className="w-10 h-4 bg-gray-300" />
          </CardTitle>

          <Skeleton className="w-24 h-6 bg-gray-300" />
        </div>

        <CardDescription />
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                  {i === 2 && <Skeleton className="h-4 w-36" />}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                  {i === 0 && <Skeleton className="h-4 w-36" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="w-40 h-6" />

            <Skeleton className="w-full h-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-40 h-6" />

            <Skeleton className="w-full h-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="w-40 h-6" />

            <Skeleton className="w-full h-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
