import CategoriesTable from "./_components/CategoriesTable";
import Header from "./_components/Header";
import { HeroSection } from "./_components/HeroSection";
export default function Home() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen p-8 gap-8">
      <Header />
      <HeroSection />
    </div>
  );
}
