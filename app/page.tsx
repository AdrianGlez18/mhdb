import Link from "next/link"
import { Film, Tv, BookOpen, Gamepad2, User, List, Star, Share2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/landing/feature-card"
import ContentSlider from "@/components/landing/content-slider"
import Header from "@/components/landing/header"

export default function LandingPage() {
  const features = [
    {
      icon: Film,
      title: "Extensive Movie Collection",
      description: "Access thousands of movies from classic masterpieces to the latest releases.",
    },
    {
      icon: Tv,
      title: "TV Series",
      description: "Keep track of your favorite shows and never miss an episode.",
    },
    {
      icon: BookOpen,
      title: "Books & Comics",
      description: "Expand your literary horizons with our comprehensive book tracking system.",
    },
    {
      icon: Gamepad2,
      title: "Video Games",
      description: "Track your gaming adventures and discover new titles to play.",
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Share your thoughts and see what others think about your favorite content.",
    },
    {
      icon: Share2,
      title: "Social Features",
      description: "Connect with friends and discover something new through their collections.",
    },
  ]

  return (
    <div className="min-h-screen w-full">
      <Header />

      <section className="h-[95vh] flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-12 xl:gap-16 overflow-hidden bg-background px-4  sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl pt-2 lg:pt-8 xl:pt-16">
            Your Ultimate Entertainment Tracker
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Track, discover, and share your favorite movies, TV shows, books, and games. Join our community of
            entertainment enthusiasts today! Always free!
          </p>
          <div className="mt-2 sm:mt-4 lg:mt-6 xl:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
            <Link href="/sign-up">
              Get Started!
              <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <ContentSlider />
      </section>

      <section className="bg-background/50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything You Need in One Place</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our platform offers a comprehensive suite of features to enhance your entertainment experience.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-primary/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Games available", value: "300K+" },
              { label: "Movies Tracked", value: "500K+" },
              { label: "TV Episodes", value: "500K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),transparent)]" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Journey?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Join MHDB to keep all your entertainment in one place. Sign up today and get access
            to all features. MHDB is free to use and free of ads, and always will be!
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

