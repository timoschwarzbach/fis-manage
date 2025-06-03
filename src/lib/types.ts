export type Slide = {
  backgroundMediaId: string;
  highlight?: boolean;
  title?: string;
  description?: string;
  duration: number | null;
  content?: string;
}