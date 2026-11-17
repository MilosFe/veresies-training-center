import type { Product, Step } from "./types";

// Stress Reset, converted from the STRESS RESET Word document.
// Activity 1 is fully converted. Activities 2 to 15 carry their title and
// summary; their blocks are added as the document is converted.

const outline = (
  number: number,
  title: string,
  tagline: string,
  summary: string,
): Step => ({ number, title, tagline, summary, blocks: [] });

const activity1: Step = {
  number: 1,
  title: "Body Scan",
  tagline: "Notice your body's signals.",
  summary:
    "Observe what is happening in your body and become more familiar with your bodily sensations.",
  blocks: [
    {
      type: "video",
      title: "How my nervous system responds to stress",
      ready: false,
      transcript:
        "We are going to look at what happens with the body when stress appears, and what the nervous system has to do with it.\n\nWhen we experience stress, the brain automatically activates systems that prepare the body to respond. This reaction happens automatically; it is not something we consciously choose.\n\nThe autonomic nervous system regulates the body's immediate response to stress. Its sympathetic branch mobilizes the body for action by activating a biological response called fight or flight, a response designed to protect us and support our survival. The parasympathetic branch supports recovery and the return to a calmer state after the activation. Then we are able to relax.\n\nBut stress doesn't stop with the nervous system. It activates other systems throughout the body.",
    },
    {
      type: "text",
      heading: "Endocrine system",
      body: "The endocrine system releases hormones involved in the stress response, such as adrenaline and cortisol. These help mobilize energy and prepare the body to respond to increased demands.",
    },
    {
      type: "list",
      items: [
        "Insulin and glucose regulation: higher blood sugar levels",
        "Growth hormone: fewer resources for growth and recovery",
        "Reproductive hormones: reduced libido and reproductive function",
        "Thyroid axis: chronic stress may alter thyroid hormone regulation",
        "Melatonin and sleep regulation: disrupted sleep",
      ],
    },
    {
      type: "text",
      heading: "Immune system",
      body: "When stress continues over time, it can change the way the immune system functions, making the body less effective at responding to infections and recovering from illness.\n\nLong-lasting stress may also influence inflammation and immune regulation, which can affect existing health conditions. For some people, periods of increased stress may coincide with worsening symptoms of conditions such as asthma, eczema, allergies, and certain autoimmune disorders.",
    },
    {
      type: "text",
      heading: "Cardiovascular system",
      body: "Chronic stress can place an additional strain on the cardiovascular system. Stress hormones influence heart rate, blood pressure, blood vessels, metabolism, and blood clotting. When this activation continues over time, it may contribute to cardiovascular risk.",
    },
    {
      type: "text",
      heading: "Digestive system",
      body: "Stress can also affect the digestive system, influencing digestion, gut sensitivity, and gastrointestinal symptoms. It may contribute to or worsen symptoms associated with conditions such as irritable bowel syndrome, gastritis, peptic ulcers, and inflammatory bowel conditions.",
    },
    {
      type: "text",
      heading: "Our body has the capacity to recover",
      body: "When stress becomes chronic, its effects can extend far beyond how we feel emotionally; they can be experienced throughout the body.\n\nWhen we create space for rest, sleep, nourishing food, movement, supportive relationships, and time for ourselves, we give the nervous system and the body opportunities to return toward balance. Recovery happens through small moments, repeated over time.",
    },
    {
      type: "audio",
      title: "Body Scan",
      transcript:
        "Close your eyes for a moment. Simply allow yourself to notice what's happening in your body.\n\nNotice your feet on the ground. The ground is holding and supporting you. It is always there beneath you. Just pay attention.\n\nNow notice your head. The jaw. Your throat. Your shoulders. Your arms. Your chest. Your stomach. Your pelvis. The legs.\n\nWhere do you sense something? What exactly does it feel like? Pressure, tightness, warmth, aching, restlessness, numbness, or something else.\n\nTake a moment to connect with these sensations: where and what you are feeling in your body right now. You can gently place your hands on those areas to bring more attention to the sensations and feel them more clearly. Allow yourself to observe them.\n\nWhen you are ready, simply open your eyes.",
    },
    { type: "tool", tool: "body-scan" },
    {
      type: "link",
      label:
        "If the sensations are too strong and unpleasant, try a regulation practice",
      href: "/practices",
    },
    {
      type: "text",
      heading: "Get to know your body's signals",
      body: "This Body Scan is not about finding stress or trying to change how you feel. Its purpose is simply to help you become more aware of the sensations your body is experiencing here and now.",
    },
    {
      type: "homework",
      body: "Over the next three days, use this same awareness in your everyday life. Notice and record it. Make at least 3 to 4 body scans per day. The tool saves each scan you do.",
    },
    {
      type: "download",
      title: "Phone wallpapers to remind you to pause and do a Body Scan",
    },
  ],
};

export const stressReset: Product = {
  slug: "stress-reset",
  kind: "training",
  title: "Stress Reset",
  level: 1,
  mandatory: true,
  available: true,
  durationLabel: "6 weeks",
  freeSteps: 1,
  unlockEveryDays: 3,
  accessMonths: 6,
  intro:
    "In this Stress Reset Training, we explore how stress affects your body, mind, and everyday life, and what you can do about it. You will work with practical stress-management techniques, body awareness, breathing, movement, relaxation practices and visualizations. Our goal is to help you recognize the triggers, regulate your response, recover more effectively, and build greater resilience over time.",
  steps: [
    activity1,
    outline(
      2,
      "Body Map",
      "Map your stress in the body.",
      "Explore where sensations appear, repeat, or accumulate over time.",
    ),
    outline(
      3,
      "Context Map",
      "Connect your body with your everyday life.",
      "Explore what is happening around you when particular bodily responses appear.",
    ),
    outline(
      4,
      "Me and My Stress",
      "Explore your relationship with stress.",
      "Use drawing and creative reflection to explore how you experience and relate to stress.",
    ),
    outline(
      5,
      "The Root Map",
      "Break your stress down.",
      "Take a stressful situation apart and identify the specific elements contributing to it.",
    ),
    outline(
      6,
      "When You Cannot Change the Situation",
      "Work with your response.",
      "Practice ways to regulate yourself and respond to situations that are outside your influence.",
    ),
    outline(
      7,
      "When You Can Influence the Situation",
      "Turn awareness into action.",
      "Identify what is within your influence, decide what matters most, and take practical steps.",
    ),
    outline(
      8,
      "Response Map",
      "Discover how you respond to stress.",
      "Track the path from fact and interpretation to body, emotion, impulse, action, and what happens next.",
    ),
    outline(
      9,
      "Recognize Your Thinking Patterns",
      "Notice how you interpret situations.",
      "Recognize recurring thinking patterns and explore different ways of seeing the same situation.",
    ),
    outline(
      10,
      "Change the Meaning, Change the Response",
      "Check your interpretation against reality.",
      "Separate what you know from what you interpret and explore how meaning influences your response.",
    ),
    outline(
      11,
      "Emotions & Body Response",
      "Understand how emotions serve us.",
      "Explore what your emotions are telling you and how your body responds.",
    ),
    outline(
      12,
      "From Impulse to Action",
      "Explore what your body wants to do.",
      "Use movement to notice the difference between your impulse and the action you actually take.",
    ),
    outline(
      13,
      "External Distractions",
      "Look at what around you takes your attention.",
      "Identify elements in your environment that repeatedly distract or drain you and adjust what you can.",
    ),
    outline(
      14,
      "Internal Distractions",
      "Look at what takes your attention from within.",
      "Notice internal demands that occupy your attention and identify what you can address or manage.",
    ),
    outline(
      15,
      "Anti-Stress Tips",
      "Build your personal anti-stress toolkit.",
      "Explore practical ways to support your body, attention, daily rhythm, recovery, and everyday life.",
    ),
  ],
};
