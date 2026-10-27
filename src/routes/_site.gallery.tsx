import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { useSite } from "@/context/SiteContext";

export const Route = createFileRoute("/_site/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Stadium Gallery | XYZ Stadium Pune" },
      {
        name: "description",
        content:
          "Explore XYZ Stadium, Pune through photos — packed match nights, cricket under lights, VIP lounges and the electric crowd.",
      },
      { property: "og:title", content: "Stadium Gallery | XYZ Stadium" },
      {
        property: "og:description",
        content: "Photos from match nights at XYZ Stadium, Pune — crowds, players, night views and the VIP lounge.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function GalleryPage() {
  const { data } = useSite();

  return (
    <>
      <PageHeader
        title="Stadium Gallery"
        subtitle="Moments that make match nights at XYZ Stadium unforgettable."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
          {data.gallery.map((item, i) => (
            <figure
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium ${
                i % 3 === 1 ? "sm:break-inside-avoid" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width={1280}
                height={i % 2 === 0 ? 900 : 720}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  i % 2 === 0 ? "h-80" : "h-64"
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-stadium-dark/85 to-transparent p-4 pt-10 text-white">
                <Camera className="h-4 w-4 shrink-0 text-accent" />
                <span className="font-semibold">{item.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Want your matchday photo featured? Tag <span className="font-semibold text-primary">@xyzstadium</span> on
          social media.
        </p>
      </section>
    </>
  );
}
