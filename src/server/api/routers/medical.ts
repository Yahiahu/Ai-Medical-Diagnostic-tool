import { z } from "zod";
import {Configuration, OpenAIApi} from "openai"
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

const configuration = new Configuration({
    organization: env.OPEN_AI_ORGANIZATION,
    apiKey: env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const medicalRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  prompt: protectedProcedure
    .input(z.object({ symptoms: z.string().min(5),painThreashold: z.number().min(1).max(10) }))
    .mutation(async ({ input, ctx }) => {
      console.log(JSON.stringify(input))

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Using the following information make a pretend diagnosis: ${JSON.stringify(input)}`,
        max_tokens: 100,
        temperature: 0.5,
 });
    const diagnosis = response.data.choices[0]?.text ?? ""
    return {diagnosis}
    }),
});
