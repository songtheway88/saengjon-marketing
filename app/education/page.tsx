import { createServerClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import LiveBanner from "@/components/LiveBanner";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import CourseGrid from "@/components/CourseGrid";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

async function getLiveBanner() {
  try {
    const supabase = createServerClient();
    if (!supabase) return null;
    const { data } = await supabase
      .from("live_banner")
      .select("*")
      .eq("is_active", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

export default async function EducationPage() {
  const liveBanner = await getLiveBanner();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 라이브 배너 (있을 때만) */}
      {liveBanner && (
        <LiveBanner
          title={liveBanner.title}
          date={liveBanner.date}
          link={liveBanner.link}
        />
      )}

      {/* 네비게이션 */}
      <Navbar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        <Hero />
        <Reviews />
        <CourseGrid />
        <SignupForm />
      </main>

      <Footer />
    </div>
  );
}
