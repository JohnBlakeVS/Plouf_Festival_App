import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          À faire: gestion bénévoles / shifts
        </CardContent>
      </Card>
    </main>
  );
}
