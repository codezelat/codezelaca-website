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

export const graduationStoryGallery: EventPhoto[] = [
  {
    src: `${imageRoot}/women-graduates.webp`,
    alt: "Five graduates celebrating together with their graduation scrolls",
    caption: "A milestone shared together",
    width: 1800,
    height: 1200,
    layout: "feature",
  },
  {
    src: `${imageRoot}/keynote-address.webp`,
    alt: "A speaker addressing the convocation from the flower-lined podium",
    caption: "Words for the graduating class",
    width: 1200,
    height: 1800,
    layout: "portrait",
  },
  {
    src: `${imageRoot}/celebration-cake.webp`,
    alt: "A graduate receiving flowers, a keepsake and a celebration cake",
    caption: "Celebration beyond the stage",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/graduation-keepsakes.webp`,
    alt: "Graduation scrolls and a celebration cake prepared for a graduate",
    caption: "The details that made it personal",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/pre-ceremony-conversation.webp`,
    alt: "Graduates and guests gathering in conversation before the ceremony",
    caption: "Anticipation before the ceremony",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/ceremony-leadership.webp`,
    alt: "Academic representatives seated together during the convocation",
    caption: "The ceremony in session",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/graduate-recognition-group.webp`,
    alt: "A graduate receiving recognition with academic representatives on stage",
    caption: "Recognition with the academic community",
    width: 1800,
    height: 1200,
    layout: "feature",
  },
  {
    src: `${imageRoot}/graduate-recognition-moment.webp`,
    alt: "A graduate and academic representatives marking a presentation moment",
    caption: "Achievement formally recognised",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/cca-graduate-pride.webp`,
    alt: "A CCA graduate holding his convocation scroll inside the auditorium",
    caption: "Proud of the journey",
    width: 1200,
    height: 1800,
    layout: "portrait",
  },
  {
    src: `${imageRoot}/graduate-profile-woman.webp`,
    alt: "A graduate photographed against the convocation stage",
    caption: "Ready for the next chapter",
    width: 1200,
    height: 1800,
    layout: "portrait",
  },
  {
    src: `${imageRoot}/graduate-portrait-wall.webp`,
    alt: "A graduate holding a scroll at the convocation portrait wall",
    caption: "A portrait of achievement",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
  {
    src: `${imageRoot}/graduate-portrait-wall-woman.webp`,
    alt: "A graduate standing with her scroll at the convocation portrait wall",
    caption: "The moment made lasting",
    width: 1800,
    height: 1200,
    layout: "landscape",
  },
];

const graduationStoryEditorialImages = [
  {
    url: `${imageRoot}/graduate-friends.webp`,
    name: "Graduates celebrating together",
    description: "A group of graduates celebrating together with their graduation scrolls",
  },
  {
    url: `${imageRoot}/ceremony-procession-line.webp`,
    name: "Graduates gathering for the procession",
    description: "Graduates gathering in procession before entering the convocation ceremony",
  },
  {
    url: `${imageRoot}/graduate-ready-portrait.webp`,
    name: "Ready for the graduation moment",
    description: "A graduate in academic dress holding flowers and her graduation scroll",
  },
  {
    url: `${imageRoot}/ceremony-hosts.webp`,
    name: "Convocation hosts",
    description: "The convocation hosts speaking from the flower-lined podium",
  },
  {
    url: `${imageRoot}/auditorium-community.webp`,
    name: "The graduating community",
    description: "Graduates and guests seated together inside the auditorium",
  },
  {
    url: `${imageRoot}/convocation-identity.webp`,
    name: "SITC General Convocation 2026",
    description: "The SITC General Convocation 2026 stage during a graduate presentation",
  },
] as const;

export const graduationStoryStructuredImages = [
  ...graduationStoryEditorialImages,
  ...graduationStoryGallery.map((photo) => ({
    url: photo.src,
    name: photo.caption,
    description: photo.alt,
  })),
];
