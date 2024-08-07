import { create } from "zustand";

interface AppdataStore {
  helpCenterUrl: string;
  faqQuestions: any[];
}

const initialData = [
  {
    question: "How to use the app?",
    answer: "Here is how you can use the app, Here is how you can use the app, Here is how you can use the app, Here is how you can use the appHere is how you can use the app,Here is how you can use the app s...",
  },
  {
    question: "How to reset my password?",
    answer: "To reset your password, follow these steps...",
  },
  {
    question: "Where can I find the settings?",
    answer: "The settings can be found in...",
  },
];

export const useAppdataStore = create<AppdataStore>((set) => ({
  helpCenterUrl: "https://www.google.com/",
  faqQuestions: initialData,
}));
