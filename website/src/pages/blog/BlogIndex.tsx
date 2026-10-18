import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import {
  BLOG_PAGE_SIZE,
  blogTrackLabels,
  getPublishedBlogPageCount,
  publishedArticles,
  type PublishedBlogArticle,
} from "@/content/blog/articles";
import { getBlogIndexMeta, SITE_URL, usePageMeta } from "@/lib/seo";
import Footer from "@/pages/home/Footer";

const trackAccent = {
  retailer: "bg-[#2457d6]",
  consumer: "bg-[#52525b]",
} satisfies Record<PublishedBlogArticle["contentTrack"], string>;

const blogCollectionSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/th/blog#collection`,
      name: "บทความมือถือ ธุรกิจ และเทคโนโลยีจาก PK HUB",
      description:
        "คู่มือและบทวิเคราะห์สำหรับร้านมือถือ เรื่องการเลือกแหล่งสินค้า สต็อก เอกสาร และการเริ่มขาย",
      url: `${SITE_URL}/th/blog`,
      inLanguage: "th-TH",
    },
    {
      "@type": "ItemList",
      itemListElement: publishedArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${SITE_URL}/th/blog/${article.slug}`,
      })),
    },
  ],
};

function articleHref(article: PublishedBlogArticle) {
  return `/th/blog/${article.slug}`;
}

function ArticleMeta({ article }: { article: PublishedBlogArticle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#71717a]">
      <span className="inline-flex items-center gap-2">
        <span
          className={`h-2 w-2 ${trackAccent[article.contentTrack]}`}
          aria-hidden="true"
        />
        {blogTrackLabels[article.contentTrack]}
      </span>
      <span aria-hidden="true">·</span>
      <span>อ่าน {article.estimatedReadMinutes} นาที</span>
    </div>
  );
}

function LeadStory({ article }: { article: PublishedBlogArticle }) {
  return (
    <article className="group grid gap-0 pt-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(23rem,0.8fr)] lg:gap-10 lg:pt-7">
      <a
        href={articleHref(article)}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#ededf0] lg:aspect-auto lg:min-h-[29rem]"
        aria-label={`อ่าน ${article.title}`}
      >
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:brightness-[0.94] motion-safe:group-hover:scale-[1.015]"
        />
      </a>
      <div className="grid content-center gap-5 py-7 sm:py-9 lg:py-11">
        <ArticleMeta article={article} />
        <h2 className="font-display text-[2.15rem] font-normal leading-[1.14] tracking-[-0.01em] sm:text-5xl lg:text-[3rem]">
          <a
            href={articleHref(article)}
            className="transition-colors hover:text-[#1946b8]"
          >
            {article.title}
          </a>
        </h2>
        <p className="max-w-2xl text-base leading-7 text-[#52525b] sm:text-lg sm:leading-8">
          {article.summary}
        </p>
        <a
          href={articleHref(article)}
          className="inline-flex min-h-11 w-fit items-center gap-2 border-b-2 border-[#2457d6] pb-1 font-bold transition-colors hover:border-[#1946b8] hover:text-[#1946b8]"
        >
          อ่านบทความ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function PriorityStory({
  article,
  number,
}: {
  article: PublishedBlogArticle;
  number: number;
}) {
  return (
    <article className="group grid content-start">
      <a
        href={articleHref(article)}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#ededf0]"
        aria-label={`อ่าน ${article.title}`}
      >
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]"
        />
        <span
          className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#2457d6] font-display text-lg font-normal text-white"
          aria-hidden="true"
        >
          {String(number).padStart(2, "0")}
        </span>
      </a>
      <div className="grid content-start gap-4 pt-5 sm:pt-6">
        <ArticleMeta article={article} />
        <h2 className="font-display text-[1.65rem] font-normal leading-[1.24] tracking-[-0.01em] sm:text-3xl">
          <a
            href={articleHref(article)}
            className="transition-colors hover:text-[#1946b8]"
          >
            {article.title}
          </a>
        </h2>
        <p className="line-clamp-3 text-sm leading-6 text-[#52525b] sm:text-base sm:leading-7">
          {article.summary}
        </p>
      </div>
    </article>
  );
}

function LibraryCard({ article }: { article: PublishedBlogArticle }) {
  return (
    <article className="group grid content-start">
      <a
        href={articleHref(article)}
        className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#ededf0]"
        aria-label={`อ่าน ${article.title}`}
      >
        <img
          src={article.recommendedImage}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:brightness-[0.93] motion-safe:group-hover:scale-[1.02]"
        />
      </a>
      <div className="grid gap-3 pt-5">
        <ArticleMeta article={article} />
        <h3 className="font-display text-[1.55rem] font-normal leading-[1.25] tracking-[-0.01em]">
          <a
            href={articleHref(article)}
            className="transition-colors hover:text-[#1946b8]"
          >
            {article.title}
          </a>
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-[#52525b]">
          {article.summary}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs font-semibold text-[#52525b]">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag}>#{tag.replace(/\s/g, "")}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function BlogIndex() {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusSearchAfterClearRef = useRef(false);
  const { page } = useParams();
  const [searchParams] = useSearchParams();
  const validPage = page === undefined || /^[1-9]\d*$/.test(page);
  const routePage = validPage ? Number(page ?? 1) : 1;
  const pageMeta = useMemo(() => getBlogIndexMeta(routePage), [routePage]);
  usePageMeta(pageMeta);
  const query = searchParams.get("q")?.trim() ?? "";
  const selectedTrack = searchParams.get("track") as
    PublishedBlogArticle["contentTrack"] | null;
  const selectedTag = searchParams.get("tag") ?? "";
  const hasFilters = Boolean(query || selectedTrack || selectedTag);

  useEffect(() => {
    if (hasFilters || !focusSearchAfterClearRef.current) return;
    focusSearchAfterClearRef.current = false;
    searchInputRef.current?.focus();
  }, [hasFilters]);

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    publishedArticles.forEach((article) =>
      article.tags.forEach((tag) =>
        counts.set(tag, (counts.get(tag) ?? 0) + 1),
      ),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "th"))
      .slice(0, 7)
      .map(([tag]) => tag);
  }, []);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase("th");
    return publishedArticles.filter((article) => {
      const matchesTrack =
        !selectedTrack || article.contentTrack === selectedTrack;
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      const searchable = [
        article.title,
        article.summary,
        article.category,
        article.primaryKeyword,
        ...article.tags,
      ]
        .join(" ")
        .toLocaleLowerCase("th");
      return (
        matchesTrack &&
        matchesTag &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [query, selectedTag, selectedTrack]);

  if (publishedArticles.length === 0) return <Navigate to="/th" replace />;

  const pageCount = hasFilters
    ? Math.max(1, Math.ceil(filteredArticles.length / BLOG_PAGE_SIZE))
    : getPublishedBlogPageCount();
  if (!validPage || !Number.isSafeInteger(routePage) || (page !== undefined && routePage === 1) || (!hasFilters && routePage > pageCount))
    return <Navigate to="/th/blog" replace />;

  const showHighlights = !hasFilters && routePage === 1;
  const libraryArticles = hasFilters
    ? filteredArticles.slice(0, BLOG_PAGE_SIZE)
    : routePage === 1
      ? publishedArticles.slice(3, BLOG_PAGE_SIZE)
      : publishedArticles.slice(
          (routePage - 1) * BLOG_PAGE_SIZE,
          routePage * BLOG_PAGE_SIZE,
        );

  function updateFilters(name: "q" | "track" | "tag", value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    navigate(`/th/blog${next.size ? `?${next.toString()}` : ""}`, {
      replace: name === "q",
    });
  }

  function clearFilters() {
    focusSearchAfterClearRef.current = true;
    navigate("/th/blog");
  }

  return (
    <div id="top" className="v1 min-h-dvh bg-white text-[#0a0a0a]">
      <a href="#main-content" className="v1-skip">
        Skip to content / ข้ามไปเนื้อหา
      </a>
      <script
        id="blog-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogCollectionSchema),
        }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <header className="bg-white pb-12 pt-[clamp(48px,6.6vw,96px)]">
          <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
            <div className="grid gap-4">
              <p className="v1-eyebrow">บทความ</p>
              <h1 className="v1-h1">
                ความรู้จากมุม
                <br />
                ร้านมือถือ
              </h1>
            </div>
            <p className="v1-lede pb-3">
              เลือกแหล่งสินค้า จัดสต็อก เอกสาร และการเริ่มขาย
              เพื่อช่วยให้ตัดสินใจได้ชัดขึ้น
            </p>
          </Container>
        </header>

        {showHighlights && (
          <section
            aria-labelledby="highlight-heading"
            className="pb-[clamp(56px,6.6vw,96px)]"
          >
            <Container>
              <div className="mb-6">
                <h2
                  id="highlight-heading"
                  className="font-display text-3xl font-normal tracking-[-0.01em] sm:text-4xl"
                >
                  บทความแนะนำ
                </h2>
              </div>
              <div className="grid gap-5">
                <LeadStory article={publishedArticles[0]} />
                <div className="grid gap-5 lg:grid-cols-2">
                  {publishedArticles.slice(1, 3).map((article, index) => (
                    <PriorityStory
                      key={article.slug}
                      article={article}
                      number={index + 2}
                    />
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        <section
          className="v1-mist py-[clamp(56px,6.6vw,96px)]"
          aria-labelledby="library-heading"
        >
          <Container>
            <div className="grid gap-8 border-b border-[#d4d4d8] pb-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(22rem,0.3fr)] lg:items-end">
              <div>
                <p className="text-sm font-bold text-[#52525b]">
                  คลังความรู้ PK HUB
                </p>
                <h2
                  id="library-heading"
                  aria-live="polite"
                  className="mt-1 font-display text-3xl font-normal tracking-[-0.01em] sm:text-4xl"
                >
                  {hasFilters
                    ? `พบ ${filteredArticles.length} บทความ`
                    : routePage > 1
                      ? `บทความทั้งหมด — หน้า ${routePage}`
                      : "บทความทั้งหมด"}
                </h2>
                <div
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label="เลือกกลุ่มเนื้อหา"
                >
                  <button
                    type="button"
                    onClick={() => updateFilters("track", "")}
                    aria-pressed={!selectedTrack}
                    className={`min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${!selectedTrack ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-[#d4d4d8] bg-white text-[#52525b] hover:border-[#2457d6]"}`}
                  >
                    ทั้งหมด
                  </button>
                  {(
                    Object.entries(blogTrackLabels) as Array<
                      [PublishedBlogArticle["contentTrack"], string]
                    >
                  ).map(([track, label]) => (
                    <button
                      key={track}
                      type="button"
                      onClick={() =>
                        updateFilters(
                          "track",
                          selectedTrack === track ? "" : track,
                        )
                      }
                      aria-pressed={selectedTrack === track}
                      className={`min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${selectedTrack === track ? "border-[#0a0a0a] bg-[#0a0a0a] text-white" : "border-[#d4d4d8] bg-white text-[#52525b] hover:border-[#2457d6]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="relative block">
                <span className="sr-only">ค้นหาบทความ</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#71717a]"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => updateFilters("q", event.target.value)}
                  placeholder="ค้นหา เช่น สต็อก, VAT, IMEI"
                  className="h-11 w-full rounded-full border border-[#cfcfcf] bg-white py-3 pl-12 pr-4 text-sm outline-none transition-colors placeholder:text-[#71717a] focus:border-[#2457d6] focus:ring-2 focus:ring-[#2457d6]/15"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-[#e4e4e7] py-5 text-sm">
              <span className="font-bold text-[#3f3f46]">หัวข้อยอดนิยม</span>
              {topTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    updateFilters("tag", selectedTag === tag ? "" : tag)
                  }
                  aria-pressed={selectedTag === tag}
                  className={`inline-flex min-h-11 items-center border-b font-semibold transition-colors ${selectedTag === tag ? "border-[#2457d6] text-[#1946b8]" : "border-transparent text-[#71717a] hover:border-[#a1a1aa] hover:text-[#18181b]"}`}
                >
                  #{tag.replace(/\s/g, "")}
                </button>
              ))}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto inline-flex min-h-11 items-center gap-1.5 font-bold text-[#9a312a] hover:text-[#6f211d]"
                >
                  <X className="h-4 w-4" aria-hidden="true" /> ล้างตัวกรอง
                </button>
              )}
            </div>

            {libraryArticles.length ? (
              <div className="grid gap-x-6 gap-y-12 pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {libraryArticles.map((article) => (
                  <LibraryCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="border-b border-[#d4d4d8] py-16 text-center">
                <h3 className="font-display text-2xl font-normal">
                  ยังไม่พบบทความที่ตรงกับคำนี้
                </h3>
                <p className="mt-2 text-[#71717a]">
                  ลองใช้คำสั้นลง หรือเลือกหัวข้ออื่น
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex min-h-11 items-center border-b-2 border-[#2457d6] pb-1 font-bold"
                >
                  ดูบทความทั้งหมด
                </button>
              </div>
            )}

            {!hasFilters && pageCount > 1 && (
              <nav
                className="mt-14 flex items-center justify-center gap-2 border-t border-[#d4d4d8] pt-8"
                aria-label="หน้าบทความ"
              >
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <a
                      key={pageNumber}
                      href={
                        pageNumber === 1
                          ? "/th/blog"
                          : `/th/blog/page/${pageNumber}`
                      }
                      aria-current={
                        routePage === pageNumber ? "page" : undefined
                      }
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-bold transition-colors ${routePage === pageNumber ? "border-[#18181b] bg-[#18181b] text-white" : "border-[#d4d4d8] hover:border-[#2457d6]"}`}
                    >
                      {pageNumber}
                    </a>
                  ),
                )}
              </nav>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
