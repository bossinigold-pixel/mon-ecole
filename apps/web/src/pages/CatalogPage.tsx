import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient";
import type { EducationCycle, Level } from "@mon-ecole/shared-types";

type CycleWithLevels = EducationCycle & { levels: Level[] };

export default function CatalogPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cycles"],
    queryFn: async () => {
      const res = await apiClient.get<CycleWithLevels[]>("/education/cycles");
      return res.data;
    },
  });

  if (isLoading) return <p className="p-8 text-center">Chargement du catalogue...</p>;
  if (error) return <p className="p-8 text-center text-red-600">Impossible de charger le catalogue.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-brand-700 mb-8">Choisis ton niveau</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {data?.map((cycle) => (
          <div key={cycle.id} className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">{cycle.name}</h2>
            <div className="flex flex-wrap gap-2">
              {cycle.levels.map((level) => (
                <span
                  key={level.id}
                  className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm"
                >
                  {level.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
