import {z} from "zod";
import { Profile } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { ProfileZodSchema } from "./schema";

export type InputType = z.infer<typeof ProfileZodSchema>;
export type OutputType = ActionState<InputType, Profile>;
