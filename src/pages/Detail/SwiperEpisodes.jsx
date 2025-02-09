import { Swiper, SwiperSlide } from "swiper/react";
import EpisodeCard from "./EpisodeCard";

export default function SwiperEpisodes({ episodes, name }) {
  return (
    <Swiper slidesPerView="5" spaceBetween={20}>
      {episodes && episodes.map((episode, index) => (
        <SwiperSlide key={index}>
          <EpisodeCard name={name} episode={episode}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
