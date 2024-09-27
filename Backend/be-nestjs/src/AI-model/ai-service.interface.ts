export interface AIService {
  askAI(messages: any[], model?: string): Promise<string>;
}
