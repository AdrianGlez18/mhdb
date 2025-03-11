import {z} from "zod";
import { Following } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { FollowingZodSchema } from "./schema";

export type InputType = z.infer<typeof FollowingZodSchema>;
export type OutputType = ActionState<InputType, Following>;
