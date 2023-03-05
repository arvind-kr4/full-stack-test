import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Tree } from "../model/tree";

export const hierarchyRouter = createTRPCRouter({
  insert: publicProcedure.query(async ({ ctx }) => {
    try {
      let newTree: Tree | null = null;
      const employeeData = await ctx.prisma.employee.findMany();
      for (const employee of employeeData) {
        if (!newTree) {
          newTree = new Tree(employee.id, employee.name);
        } else {
          newTree.insert(employee.managerId, employee.id, employee.name);
        }
      }
      if (newTree) {
        return {
          success: true,
          data: newTree.customPreOrderTraversal(),
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // passing the original error to retain stack trace
        cause: error,
      });
    }
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return {
        success: true,
        results: await ctx.prisma.employee.findMany(),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
        // passing the original error to retain stack trace
        cause: error,
      });
    }
  }),
});
