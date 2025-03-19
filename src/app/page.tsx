import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-purple-200 p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          Relationship Questionnaire
        </h1>
        <p className="text-gray-700 mb-8">
          Take our questionnaire to discover insights about your relationship
          preferences and receive personalized recommendations.
        </p>

        <div className="flex justify-center">
          <Link
            href="/questionnaire/"
            className="py-3 px-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
          >
            Start Questionnaire
          </Link>
        </div>
      </div>
    </main>
  );
}
