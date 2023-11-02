//app/page.tsx

import Image from "next/image";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import { closeSync } from "fs";
import IssueChart from "./IssueChart";

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
      <div>Home page</div>
      <LatestIssues />
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </>
  );
}
