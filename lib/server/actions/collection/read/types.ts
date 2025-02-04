import {z} from "zod";
import { CollectionItem } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { CollectionItemZodSchema } from "./schema";

export type InputType = z.infer<typeof CollectionItemZodSchema>;
export type OutputType = ActionState<InputType, InputType>;
