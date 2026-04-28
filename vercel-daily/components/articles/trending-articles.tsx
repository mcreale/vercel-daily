'use client';
import ArticleCard from "@/components/articles/article-card";
import { Article } from "@/lib/types/return-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function TrendingArticles({ trendingArticles }: { trendingArticles: Article[] }) {
  return (
    <section className="text-gray-800 dark:text-gray-100 py-8 rounded-lg mt-12 border border-gray-200 dark:border-gray-700 container mb-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Trending Articles</h2>
        <p className="mb-8">Check out the most popular articles among our readers this week.</p>
          
            <Swiper slidesPerView={3} spaceBetween={20} loop={true}pagination={{ clickable: true }} className="mySwiper pb-20" navigation={true} modules={[Navigation, Pagination  ]}>
              {trendingArticles.map((article) => (
                <SwiperSlide key={article.id}>
                  <ArticleCard article={article} />
                </SwiperSlide>
              ))}
            </Swiper>
      </div>
    </section>
  );
}