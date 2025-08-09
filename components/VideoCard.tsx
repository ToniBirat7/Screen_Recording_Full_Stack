import Link from "next/link";
import Image from "next/image";
import React from "react";

const VideoCard = ({
  id,
  title,
  thumbnail,
  userImg,
  username,
  createdAt,
  views,
  visibility,
  duration,
}) => {
  return (
    <Link href={`/video${id}`} className="video-card">
      <Image
        src={thumbnail}
        alt="Thumbnail"
        width={290}
        height={160}
        className="thumbnail"
      ></Image>
      <article>
        <div className="">
          <figure>
            <Image
              src={userImg}
              alt="avatar"
              width={34}
              height={34}
              className="rounded-full aspect-square"
            ></Image>
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>
          <aside>
            <Image
              src="assets/icons/eye.svg"
              alt="views"
              width={16}
              height={16}
            ></Image>
            <span>{views}</span>
          </aside>
        </div>
        <h2>
          {title} -{" "}
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </article>
    </Link>
  );
};

export default VideoCard;
