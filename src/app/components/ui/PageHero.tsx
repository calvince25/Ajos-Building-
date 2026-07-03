import React from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function PageHero({ title, subtitle, imageUrl }: PageHeroProps) {
  return (
    <section
      className="relative flex flex-col justify-center min-h-[300px] md:min-h-[400px] bg-primary"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-primary/70" />
      
      {/* Yellow accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-accent" />
            <p 
              className="text-accent text-xs md:text-sm font-bold tracking-widest uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {subtitle}
            </p>
          </div>
          <h1 
            className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
