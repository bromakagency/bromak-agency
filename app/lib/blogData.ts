export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "heart-rate-variability",
    title: "The Basics: Heart Rate Variability",
    summary: "Heart rate variability (HRV) offers valuable insights into your overall health and fitness.",
    date: "Apr 24, 2024",
    category: "The Basics",
    content: "Heart rate variability (HRV) is the physiological phenomenon of variation in the time interval between heartbeats. It is measured by the variation in the beat-to-beat interval.\n\nHRV is widely used in health and fitness to monitor recovery. By understanding your HRV trends, you can adjust your training intensity, manage stress, and optimize your sleep schedule.\n\nAt Bevel, we use advanced algorithms to track your HRV overnight and give you a comprehensive recovery score every morning."
  },
  {
    slug: "we-raised-10m",
    title: "We Raised $10M to Accelerate the Future of Personalized Health",
    summary: "Announcing our Series A funding.",
    date: "Mar 12, 2024",
    category: "Company News",
    content: "We are thrilled to announce our $10M Series A funding round. This new capital will accelerate our mission to bring personalized, AI-driven health insights to everyone.\n\nThank you to our amazing community for the continued support. We plan to use these funds to expand our engineering team, improve our AI models, and launch exciting new features."
  },
  {
    slug: "food-quality-contributors",
    title: "Food Quality Contributors",
    summary: "Understand the building blocks that raise or lower your daily Nutrition Score.",
    date: "Feb 18, 2024",
    category: "Nutrition",
    content: "Not all calories are created equal. Food quality is just as important as macronutrients when it comes to overall health and recovery.\n\nIn this post, we explore how different ingredients impact your body. Whole foods, rich in micronutrients, positively contribute to your Bevel Nutrition Score, while highly processed foods and added sugars will lower it."
  },
  {
    slug: "nutrition-score-basics",
    title: "The Basics: Nutrition Score",
    summary: "A simple, science-backed way to understand how your daily food choices support long-term health.",
    date: "Jan 05, 2024",
    category: "The Basics",
    content: "Tracking nutrition can be overwhelming. That's why we created the Nutrition Score, a unified metric that evaluates the quality, balance, and timing of your meals.\n\nHere is how to optimize your score: prioritize lean proteins, incorporate plenty of fiber, and avoid late-night snacking to ensure your digestive system rests during sleep."
  },
  {
    slug: "cycle-recovery-deviations",
    title: "Cycle Recovery Deviations",
    summary: "How recovery signals like temperature, resting heart rate and HRV shift throughout your cycle.",
    date: "Dec 10, 2023",
    category: "Health Insights",
    content: "Menstrual cycles have a profound impact on physiological baselines. During the luteal phase, core temperature rises while HRV naturally decreases.\n\nUnderstanding these natural deviations helps you train smarter. Bevel's algorithm automatically adjusts your baselines based on your cycle, ensuring your daily recommendations are always accurate and personalized."
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
