import Navigation from "@/components/navigation";
import VisitScheduler from "@/components/visit-scheduler";
import Footer from "@/components/footer";

export default function VisitSchedulePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <VisitScheduler />
        </div>
      </main>
      <Footer />
    </div>
  );
}