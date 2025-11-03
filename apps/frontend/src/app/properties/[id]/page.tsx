'use client';

import { useProperties } from '@/features/properties/hooks/use-properties';

export default function PropertyDetailPage() {
  const { data: properties, isLoading } = useProperties();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Property Detail</h1>
      <p className="text-muted-foreground mb-6">Detailed view of a specific property including reviews and rating.</p>
      
      <div className="grid gap-4">
        {properties?.map((property: any) => (
          <div key={property.id} className="border rounded p-4">
            <pre>{JSON.stringify(property, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
