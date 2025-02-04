import {z} from "zod";
import { WishlistItem } from "@prisma/client";
import { ActionState } from "@/lib/server/createSafeAction";

import { WishlistItemZodSchema } from "./schema";

export type InputType = z.infer<typeof WishlistItemZodSchema>;
export type OutputType = ActionState<InputType, WishlistItem>;
