import NextAuth from "next-auth";
import { authOptions } from "@get-bibtex/server/auth";

export default NextAuth(authOptions);
