"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { fakeCards } from "@/utils/carouselUtils";
import CarouselItem from "./CarouselItem";

export function CoverflowCarousel() {
  return (
    <div
      className="w-full max-w-[1600px] mx-auto py-10"
      aria-label="Atalhos da home"
    >
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect="coverflow"
        initialSlide={0}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={30} // espaço entre os slides
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2 }, // mobile
          640: { slidesPerView: 3 }, // tablets
          1024: { slidesPerView: 5 }, // desktop
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full"
      >
        {fakeCards.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="flex items-center justify-center rounded-[var(--radius-md)]
                       text-[var(--color-text)] transition-transform duration-300"
            style={{ width: "200px", height: "250px" }}
            aria-label={`${item.title}: ${item.description}`}
          >
            <CarouselItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
