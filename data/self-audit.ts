import type { AuditCategory } from "@/types/self-audit";

export const careerContexts = [
  "Exploring careers",
  "Preparing for an internship",
  "Applying for a first job",
  "Changing career direction",
  "Progressing in my career",
] as const;

export const ratingOptions = [
  { value: 1, short: "Need support", label: "I need support to do this" },
  { value: 2, short: "Know the basics", label: "I know the basics" },
  { value: 3, short: "With guidance", label: "I can do this with guidance" },
  { value: 4, short: "Independently", label: "I can do this independently" },
  { value: 5, short: "Confidently", label: "I can demonstrate this confidently" },
] as const;

export const auditCategories: readonly AuditCategory[] = [
  {
    id: "communication-teamwork",
    title: "Communication and Teamwork",
    shortTitle: "Communication",
    description: "How you share ideas, listen, collaborate and handle conversations at work.",
    questions: [
      {
        id: "clear-communication",
        skill: "Clear communication",
        prompt: "I can explain an idea clearly and adjust my message for the person listening.",
        actionPlan: {
          outcome: "Explain one idea clearly to a chosen audience.",
          weeks: [
            "Choose a project or topic and write its main point in one sentence.",
            "Explain it aloud in under two minutes, without jargon.",
            "Share it with someone and ask what was unclear.",
            "Repeat the explanation using their feedback.",
          ],
          evidence: "A short written explanation and one note showing what improved.",
        },
      },
      {
        id: "active-listening",
        skill: "Active listening",
        prompt: "I listen carefully, ask useful questions and confirm what another person means.",
        actionPlan: {
          outcome: "Use active listening in three real conversations.",
          weeks: [
            "Practise waiting until the other person finishes before responding.",
            "Ask one clarifying question in two conversations.",
            "Summarise the key point back to the speaker.",
            "Write down which listening habit helped most.",
          ],
          evidence: "Three brief conversation notes with the question or summary you used.",
        },
      },
      {
        id: "team-contribution",
        skill: "Team contribution",
        prompt: "I contribute reliably to a team and help the group move towards a shared result.",
        actionPlan: {
          outcome: "Make one visible, reliable contribution to a team outcome.",
          weeks: [
            "Choose a small team task and agree on what done means.",
            "Share a simple deadline and progress update.",
            "Ask where another team member needs support.",
            "Complete the task and record the team result.",
          ],
          evidence: "The completed task plus one progress or handover message.",
        },
      },
      {
        id: "constructive-disagreement",
        skill: "Constructive disagreement",
        prompt: "I can disagree respectfully, explain my reasoning and help find a practical way forward.",
        actionPlan: {
          outcome: "Handle a different opinion calmly and constructively.",
          weeks: [
            "Learn one neutral phrase for expressing a different view.",
            "Practise separating facts, assumptions and preferences.",
            "Use the phrase in a low-risk discussion.",
            "Reflect on what helped the conversation move forward.",
          ],
          evidence: "A short reflection describing the issue, your response and the outcome.",
        },
      },
      {
        id: "project-storytelling",
        skill: "Project storytelling",
        prompt: "I can explain a project by describing the problem, my contribution and the result.",
        actionPlan: {
          outcome: "Tell one concise and credible project story.",
          weeks: [
            "Choose a real project and note its problem, action and result.",
            "Add one detail that proves your contribution.",
            "Record a 90-second version on your phone.",
            "Improve it after listening back or receiving feedback.",
          ],
          evidence: "A final 90-second recording or a written project story.",
        },
      },
    ],
  },
  {
    id: "problem-solving-delivery",
    title: "Problem-Solving and Delivery",
    shortTitle: "Problem-Solving",
    description: "How you understand problems, make decisions and turn work into reliable outcomes.",
    questions: [
      {
        id: "problem-framing",
        skill: "Problem framing",
        prompt: "I can break an unclear problem into smaller questions before choosing a solution.",
        actionPlan: {
          outcome: "Turn one unclear challenge into a workable problem statement.",
          weeks: [
            "Choose a current challenge and write what is known and unknown.",
            "Ask why the problem matters and who it affects.",
            "Break it into three smaller questions.",
            "Write a clear problem statement and first next step.",
          ],
          evidence: "A one-page problem map with the final problem statement.",
        },
      },
      {
        id: "evidence-options",
        skill: "Evaluating options",
        prompt: "I compare realistic options using evidence instead of choosing the first idea.",
        actionPlan: {
          outcome: "Compare at least three options for one real decision.",
          weeks: [
            "Choose a decision and list three possible options.",
            "Set three useful criteria, such as time, quality and risk.",
            "Find one piece of evidence for each option.",
            "Choose an option and explain why it fits the criteria.",
          ],
          evidence: "A small comparison table and a written decision.",
        },
      },
      {
        id: "tradeoff-decisions",
        skill: "Decision-making",
        prompt: "I can make a timely decision and explain the tradeoffs involved.",
        actionPlan: {
          outcome: "Make and communicate one reasoned decision.",
          weeks: [
            "Identify a decision you have been delaying.",
            "Set a deadline and the two most important tradeoffs.",
            "Make the decision using the information available.",
            "Review the result and what you would change next time.",
          ],
          evidence: "A decision note with the deadline, tradeoffs and outcome.",
        },
      },
      {
        id: "quality-detail",
        skill: "Quality and attention to detail",
        prompt: "I check important details and test my work before I consider it complete.",
        actionPlan: {
          outcome: "Use a repeatable quality check on one piece of work.",
          weeks: [
            "List the five errors most likely in your work.",
            "Turn the list into a short completion checklist.",
            "Use the checklist on a real task.",
            "Improve the checklist using the errors you found.",
          ],
          evidence: "The completed checklist and the corrected final work.",
        },
      },
      {
        id: "planning-risks",
        skill: "Planning and risk awareness",
        prompt: "I can plan a piece of work, set priorities and raise risks before they become blockers.",
        actionPlan: {
          outcome: "Plan and deliver one small outcome with visible risks.",
          weeks: [
            "Define the outcome, deadline and three main tasks.",
            "Identify one dependency and one possible risk.",
            "Share a brief progress update before the deadline.",
            "Review what changed and what you would plan differently.",
          ],
          evidence: "A simple plan, one progress update and a short review.",
        },
      },
    ],
  },
  {
    id: "professional-habits",
    title: "Professional Habits",
    shortTitle: "Professional Habits",
    description: "The reliable behaviours that help other people trust your work and judgement.",
    questions: [
      {
        id: "reliability",
        skill: "Reliability",
        prompt: "I meet commitments or communicate early when timing or scope needs to change.",
        actionPlan: {
          outcome: "Build a consistent habit for managing commitments.",
          weeks: [
            "Record every commitment and its due date in one place.",
            "Check the list at the start and end of each day.",
            "Send one early update when a commitment is at risk.",
            "Review which habit improved your reliability most.",
          ],
          evidence: "A four-week commitment list with completion or update notes.",
        },
      },
      {
        id: "adaptability",
        skill: "Adaptability",
        prompt: "I can adjust my approach when priorities, information or tools change.",
        actionPlan: {
          outcome: "Respond constructively to one meaningful change.",
          weeks: [
            "Notice one change and write what it affects.",
            "List what must stay fixed and what can adapt.",
            "Try one adjusted approach and ask for feedback.",
            "Record what the change taught you.",
          ],
          evidence: "A before-and-after note showing the change and your response.",
        },
      },
      {
        id: "feedback-growth",
        skill: "Using feedback",
        prompt: "I seek specific feedback and turn it into a visible improvement.",
        actionPlan: {
          outcome: "Use one piece of feedback to improve real work.",
          weeks: [
            "Choose a recent piece of work and the person best placed to review it.",
            "Ask one specific question instead of asking for general feedback.",
            "Apply one useful suggestion.",
            "Show the revised work and note what improved.",
          ],
          evidence: "The before-and-after work plus the feedback you applied.",
        },
      },
      {
        id: "ownership-initiative",
        skill: "Ownership and initiative",
        prompt: "I take responsibility for progress and act on useful next steps without waiting to be reminded.",
        actionPlan: {
          outcome: "Take ownership of one useful improvement.",
          weeks: [
            "Notice one small recurring problem you can influence.",
            "Suggest a practical improvement and confirm the boundary.",
            "Complete the first useful step without a reminder.",
            "Share the outcome and the next recommendation.",
          ],
          evidence: "The improvement, a short outcome note and any feedback received.",
        },
      },
      {
        id: "professional-conduct",
        skill: "Professional conduct",
        prompt: "I communicate and behave respectfully, including when work is pressured or difficult.",
        actionPlan: {
          outcome: "Strengthen one professional behaviour under pressure.",
          weeks: [
            "Choose one behaviour to practise, such as calm updates or punctuality.",
            "Identify the situation where it is hardest to maintain.",
            "Use a short pause or preparation routine in that situation.",
            "Reflect on the impact on other people and your work.",
          ],
          evidence: "Four short weekly notes showing when you used the behaviour.",
        },
      },
    ],
  },
  {
    id: "career-readiness",
    title: "Career Readiness",
    shortTitle: "Career Readiness",
    description: "How clearly you present your value and prepare for real opportunities.",
    questions: [
      {
        id: "professional-cv",
        skill: "Professional CV",
        prompt: "I have a clear CV that is tailored to the role and supported by evidence.",
        actionPlan: {
          outcome: "Create a focused CV for one target role.",
          weeks: [
            "Choose a real role and highlight its key requirements.",
            "Match your strongest experience or projects to those requirements.",
            "Rewrite bullets using action, task and result.",
            "Proofread the final CV and ask one person to review it.",
          ],
          evidence: "A tailored CV and the job description it was prepared for.",
        },
      },
      {
        id: "credible-profile",
        skill: "Professional online profile",
        prompt: "My professional profile clearly shows my direction, relevant skills and recent work.",
        actionPlan: {
          outcome: "Make your online profile clear and credible.",
          weeks: [
            "Write a headline that names your direction and value.",
            "Update the summary with skills, evidence and goals.",
            "Add one project or experience with a clear result.",
            "Review the public profile on desktop and mobile.",
          ],
          evidence: "A link or screenshot of the updated public profile.",
        },
      },
      {
        id: "portfolio-evidence",
        skill: "Portfolio evidence",
        prompt: "I can show examples of my work and explain what each one proves about my ability.",
        actionPlan: {
          outcome: "Turn one project into strong portfolio evidence.",
          weeks: [
            "Choose the project most relevant to your target role.",
            "Describe the problem, your process and your contribution.",
            "Add a result, demonstration or useful visual evidence.",
            "Publish or present it and ask whether your role is clear.",
          ],
          evidence: "One complete project case study or portfolio entry.",
        },
      },
      {
        id: "professional-introduction",
        skill: "Professional introduction",
        prompt: "I can introduce myself professionally and explain what opportunity I am seeking.",
        actionPlan: {
          outcome: "Deliver a natural 60-second professional introduction.",
          weeks: [
            "Write your direction, strongest evidence and current goal.",
            "Turn those points into a 60-second introduction.",
            "Practise it aloud until it sounds natural.",
            "Use it with one real person and refine it.",
          ],
          evidence: "A final script or recording of your professional introduction.",
        },
      },
      {
        id: "interview-research",
        skill: "Interview preparation",
        prompt: "I research organisations and prepare specific examples before an interview.",
        actionPlan: {
          outcome: "Prepare confidently for one realistic interview.",
          weeks: [
            "Choose a real organisation and role to research.",
            "Note its work, needs and three role requirements.",
            "Prepare three examples using situation, action and result.",
            "Complete a practice interview and improve one answer.",
          ],
          evidence: "A one-page company brief and three prepared interview examples.",
        },
      },
    ],
  },
  {
    id: "technical-role-skills",
    title: "Technical and Role Skills",
    shortTitle: "Role Skills",
    description: "How you apply, explain and continue building the skills used in your target role.",
    questions: [
      {
        id: "role-tools",
        skill: "Using role tools",
        prompt: "I can use the core tools expected in my target role to complete practical work.",
        actionPlan: {
          outcome: "Use one important role tool to complete a practical task.",
          weeks: [
            "Identify one tool repeatedly requested in target roles.",
            "Complete a focused tutorial or guided exercise.",
            "Use the tool on a small task without following the tutorial.",
            "Document what you created and what you can now do.",
          ],
          evidence: "The completed task plus a short note on the tool and process.",
        },
      },
      {
        id: "relevant-projects",
        skill: "Relevant project practice",
        prompt: "I have completed practical work that is relevant to the role I want.",
        actionPlan: {
          outcome: "Complete one small role-relevant project.",
          weeks: [
            "Choose a project that demonstrates one hiring requirement.",
            "Define a small scope that can be completed in two weeks.",
            "Build, test and improve the project.",
            "Publish the result with a concise explanation.",
          ],
          evidence: "A working project, case study or documented deliverable.",
        },
      },
      {
        id: "technical-explanation",
        skill: "Explaining technical choices",
        prompt: "I can explain a technical or role-specific decision in clear, non-technical language.",
        actionPlan: {
          outcome: "Explain one role-specific decision to a non-specialist.",
          weeks: [
            "Choose a real decision from a project or task.",
            "Write the goal, options and reason for your choice.",
            "Remove jargon and add one simple example.",
            "Explain it to someone outside the field and refine it.",
          ],
          evidence: "A short written or recorded explanation understood by a non-specialist.",
        },
      },
      {
        id: "independent-learning",
        skill: "Independent learning",
        prompt: "I can learn an unfamiliar tool or concept by finding, testing and evaluating useful resources.",
        actionPlan: {
          outcome: "Learn and apply one unfamiliar concept independently.",
          weeks: [
            "Define one small learning outcome and how you will test it.",
            "Compare two reliable learning resources.",
            "Apply the concept in a small practical exercise.",
            "Explain what worked, what did not and what comes next.",
          ],
          evidence: "The exercise plus a short learning log with the resources used.",
        },
      },
      {
        id: "skill-direction",
        skill: "Skill direction",
        prompt: "I know which role-specific skill to build next and why it matters for my career direction.",
        actionPlan: {
          outcome: "Choose a clear next skill using real career evidence.",
          weeks: [
            "Review five current role descriptions that interest you.",
            "List the skills that appear most often.",
            "Compare the list with your current projects and confidence.",
            "Choose one next skill and define a practical first outcome.",
          ],
          evidence: "A five-role skills comparison and one chosen learning outcome.",
        },
      },
    ],
  },
] as const;

export const auditQuestions = auditCategories.flatMap((category) =>
  category.questions.map((question) => ({ ...question, categoryId: category.id })),
);
