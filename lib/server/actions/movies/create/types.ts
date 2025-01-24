import {z} from "zod";
import { Movie } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { MovieZodSchema } from "./schema";

export type InputType = z.infer<typeof MovieZodSchema>;
export type OutputType = ActionState<InputType, Movie>;
