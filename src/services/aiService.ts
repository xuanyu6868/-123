export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: string;
  createdAt: number;
}

export async function generateAiImage(prompt: string, aspectRatio: string = "1:1"): Promise<string> {
  // Mock API implementation, as requested by user to remove Gemini API dependency.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800'); // placeholder image
    }, 2000);
  });
}
