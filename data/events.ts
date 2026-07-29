export interface EventPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout: "feature" | "landscape" | "portrait";
}

const imageRoot = "/images/events/convocation-2026";

export const graduationGallery: EventPhoto[] = [
  {
    src: `${imageRoot}/procession.webp`,
    alt: "Graduates and academic representatives arriving for the convocation ceremony",
    caption: "The ceremony begins",
    width: 1800,
    height: 1200,
    layout: "feature",
  },
  {
    src: `${imageRoot}/convocation-stage.webp`,
    alt: "A graduate receiving recognition on the 2026 convocation stage",
    caption: "Recognition on stage",
    width: 1200,
    height: 1500,
    layout: "portrait",
  },
  {
    src: `${imageRoot}/graduates-seated.webp`,
    alt: "Graduates seated together inside the convocation auditorium",
    caption: "Ready for the milestone",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/podium-address.webp`,
    alt: "A speaker addressing graduates and guests from the convocation podium",
    caption: "Words for the next chapter",
    width: 1200,
    height: 1500,
    layout: "portrait",
  },
  {
    src: `${imageRoot}/certificate-moment.webp`,
    alt: "A graduate receiving a certificate during the ceremony",
    caption: "Achievement recognised",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/audience-moment.webp`,
    alt: "Guests and graduates sharing a moment during the convocation",
    caption: "A community celebrating together",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/presentation-handshake.webp`,
    alt: "A graduate and academic representative during a stage presentation",
    caption: "A proud presentation",
    width: 1800,
    height: 1200,
    layout: "feature",
  },
  {
    src: `${imageRoot}/graduates-standing.webp`,
    alt: "Graduates standing together during the convocation programme",
    caption: "Together at the ceremony",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/graduates-together.webp`,
    alt: "CCA graduates celebrating together after the ceremony",
    caption: "Shared success",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/celebration-group.webp`,
    alt: "A group of graduates smiling together with their certificates",
    caption: "Made to be remembered",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/formal-graduate-group.webp`,
    alt: "Graduates gathered for a formal group photograph",
    caption: "The graduating community",
    width: 1800,
    height: 1200,
    layout: "feature",
  },
  {
    src: `${imageRoot}/graduate-portrait.webp`,
    alt: "A graduate in ceremonial attire holding a certificate",
    caption: "A milestone earned",
    width: 1200,
    height: 1500,
    layout: "portrait",
  },
];

export const eventStructuredImages = graduationGallery.slice(0, 8).map((photo) => ({
  url: photo.src,
  name: photo.caption,
  description: photo.alt,
}));
