//app/page.tsx

import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { closeSync } from "fs";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} closed={closed} inProgress={inProgress} />
          <IssueChart open={open} closed={closed} inProgress={inProgress} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  // add also open graph and twitter properties
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
