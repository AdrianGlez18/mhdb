import {z} from "zod";
import { WishlistItem } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { WishlistZodSchema } from "./schema";

export type InputType = z.infer<typeof WishlistZodSchema>;
export type OutputType = ActionState<InputType, WishlistItem>;
