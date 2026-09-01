export const englishAdmissionsUrl =
  "https://wa.me/94766772923?text=Hello%20CCA%20School%20of%20English%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20Diploma%20in%20English.";

export const englishOutcomes = [
  {
    title: "Speak with confidence",
    description: "Express your ideas clearly in conversations, discussions and interviews.",
    icon: "message",
  },
  {
    title: "Write with clarity",
    description: "Create emails, reports and study writing that are accurate and purpose-driven.",
    icon: "write",
  },
  {
    title: "Present your ideas",
    description: "Plan and deliver presentations that inform, engage and leave a strong impression.",
    icon: "present",
  },
  {
    title: "Communicate at work",
    description: "Use professional English to collaborate, contribute and build strong relationships.",
    icon: "work",
  },
] as const;

export const englishJourneyStages = [
  {
    id: "build",
    label: "Build",
    title: "Build strong foundations",
    description: "Develop the language control and vocabulary you need for clear everyday communication.",
    modules: [
      ["Grammar and sentence control", "Use accurate structures to express complete ideas with confidence."],
      ["Vocabulary and pronunciation", "Grow your practical vocabulary and speak with greater clarity."],
    ],
  },
  {
    id: "communicate",
    label: "Communicate",
    title: "Communicate with purpose",
    description: "Strengthen the listening, speaking and comprehension skills used in study, work and life.",
    modules: [
      ["Speaking and listening", "Take part in conversations, discussions and collaborative tasks."],
      ["Reading and comprehension", "Understand key ideas, detail, tone and purpose across useful texts."],
    ],
  },
  {
    id: "apply",
    label: "Apply",
    title: "Apply English in real situations",
    description: "Bring your skills together through writing, presentations and professional communication.",
    modules: [
      ["Writing for study and work", "Plan and produce clear emails, reports, summaries and structured responses."],
      ["Presentations and interviews", "Organise your ideas, speak persuasively and respond with confidence."],
    ],
  },
] as const;

export const englishFaqs = [
  {
    question: "Who is this diploma for?",
    answer: "It is designed for school leavers, university students, early-career professionals and adults who want stronger English for study, work and everyday communication.",
  },
  {
    question: "Do I need advanced English to begin?",
    answer: "No. The programme develops practical English from a clear starting point. Our admissions team can help you decide whether the learning pathway suits your current confidence and goals.",
  },
  {
    question: "How will I be assessed?",
    answer: "You will apply your learning through speaking tasks, writing activities, comprehension work and presentations. Successful completion of the programme requirements leads to the CCA Diploma in English.",
  },
  {
    question: "How do I speak with admissions?",
    answer: "Use any Talk to Admissions button on this page to message the CCA team on WhatsApp and receive the current schedule and enrolment information.",
  },
] as const;
