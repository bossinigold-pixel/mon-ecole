import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-brand-700 mb-4">Mon École</h1>
      <p className="text-gray-600 text-lg mb-8">
        Cours, exercices et corrections du primaire à la fac, où que tu sois.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/catalogue" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-medium">
          Découvrir le catalogue
        </Link>
        <Link to="/connexion" className="border border-brand-600 text-brand-700 px-6 py-3 rounded-lg font-medium">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
