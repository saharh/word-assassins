import { customAlphabet } from "nanoid";

const CUSTOM_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Letters + Numbers
export const generateGameCode = customAlphabet(CUSTOM_ALPHABET, 4);
