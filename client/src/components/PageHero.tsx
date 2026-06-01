interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ image, eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-[var(--header-h,124px)] h-[calc(var(--header-h,124px)+13rem)] sm:h-[calc(var(--header-h,124px)+14.5rem)] lg:h-[calc(var(--header-h,124px)+16rem)] overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/92 via-[#1a2332]/72 to-[#1a2332]/35" />
      <div className="relative h-full flex items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50 font-semibold mb-2">
            {eyebrow}
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-white/70 max-w-xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
