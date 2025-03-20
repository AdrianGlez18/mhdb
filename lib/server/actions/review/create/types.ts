import {z} from "zod";
import { Review } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { ReviewZodSchema } from "./schema";

export type InputType = z.infer<typeof ReviewZodSchema>;
export type OutputType = ActionState<InputType, Review>;
