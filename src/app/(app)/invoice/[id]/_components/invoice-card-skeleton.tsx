import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function InvoiceCardSkeleton() {
  return (
    <Card className="shadow-lg p-0">
      <CardHeader className="bg-gray-100 border-b py-4 px-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Badge variant="outline" className="font-mono">
              <Skeleton className="h-4 w-10" />
            </Badge>
          </CardTitle>
          <Badge className="bg-gray-300">
            <Skeleton className="h-4 w-16" />
          </Badge>
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

        <div className="mb-6">
          <Skeleton className="h-4 w-40 mb-2" />
          <div className="bg-gray-100 p-4 rounded-md border">
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={
                  i === 2
                    ? "bg-green-50 p-3 rounded-md border border-green-200"
                    : ""
                }
              >
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="mt-6">
          <Skeleton className="h-20 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
